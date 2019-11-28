<template>
    <div class="book-lists">
        <div class="book-search">
            <div class="book-search-list">
                <span class="book-search-val">小说ID:</span>
                <el-input type="text" class="search-id" v-model.number="bookId" clearable></el-input>
            </div>
            <div class="book-search-list">
                <span class="book-search-val">喜欢人群:</span>
                <el-select v-model="like" placeholder="请选择" @change="likeHandler" clearable @clear="clearLike">
                    <el-option
                    v-for="item in CommonData.like"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="book-search-list">
                <span class="book-search-val">小说类型:</span>
                <el-select v-model="type" placeholder="请选择" :disabled="disabled" clearable @clear="clearType">
                    <el-option
                    v-for="item in types"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            
            <div class="book-search-list">
                <span class="book-search-val">是否完本:</span>
                <el-select v-model="isOver" placeholder="请选择" clearable @clear="clearOver">
                    <el-option
                    v-for="item in CommonData.isOver"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
           
        </div>
        <el-button type="primary" class="search-btn" @click="searchEvent">查询</el-button>
        <div class="book-main">
            <el-table
                :data="bookLists"
                height="100%"
                border
                style="width: 100%">
                <el-table-column
                prop="name"
                label="小说名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="bookId"
                label="小说ID"
                width="100">
                </el-table-column>
                <el-table-column
                prop="author"
                label="小说作者"
                width="120">
                </el-table-column>
                <el-table-column
                prop="typeName"
                label="小说类型"
                width="100">
                </el-table-column>
                <el-table-column
                width="100px"
                label="小说封面">
                    <template slot-scope="scope">
                        <img class="book-list-img" :src="scope.row.imgUrl"/>
                    </template>
                </el-table-column>
                <el-table-column
                label="喜欢人群">
                    <template slot-scope="scope">
                        <span>{{scope.row.like === 1 ? "男生频道" : "女生频道"}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="是否完本">
                    <template slot-scope="scope">
                        <span>{{scope.row.isOver === 1 ? "连载中" : "已完结"}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                width="132px"
                label="创建时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="点击数据"
                prop="readCount">
                </el-table-column>
                 <el-table-column
                label="操作"
                width="240px"
                >
                    <template slot-scope="scope">
                        <div class="book-list-change">
                            <el-button type="text" @click="toDetail(scope.row)">详情</el-button>
                            <el-button type="text" @click="editChapter(scope.row)">编辑</el-button>
                            <el-button type="text" @click="addChapter(scope.row)">添加章节</el-button>
                            <el-button type="text" @click="deleteBookEvent(scope.row)">删除小说</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="book-pagination">
            <el-pagination
            background
            :page-size="pageSize"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="total"
            @current-change="handlerChange">
            </el-pagination>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Option, Select, Table, TableColumn, Pagination, Button, Input, MessageBox, Message } from 'element-ui';
import Common from './../service/common';
import MkTime from 'mktime';
import CommonData from './../utils/commonData';
@Component({
    components: {
        'el-select': Select,
        'el-option': Option,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        'el-button': Button,
        'el-input': Input,
    },
})
export default class BookLists extends Vue {
    private type: number | string = '';
    private like: number | string = '';
    private isOver: number | string = '';
    private bookId: number | string = '';
    private total: number = 0;
    private pageSize: number = 20;
    private pageNo: number = 1;
    private currentPage: number = 1;
    private types: object[] = [{}];
    private disabled: boolean = true;
    private CommonData: object = CommonData;
    private bookLists: object[] = [{}];
    public async created() {
        await this.getBooks();
    }
    private async getTypes() {
        const data: any = await Common.types({
            like: this.like,
        });
        this.types = data.types;
    }
    private async likeHandler(e: any) {
        if (e) {
            this.like = e;
            this.disabled = false;
            await this.getTypes();
        }
    }
    private async getBooks() {
        const data: any = await Common.bookLists({
            pageSize: this.pageSize,
            pageNo: this.pageNo,
            bookId: this.bookId,
            type: this.type,
            like: this.like,
            isOver: this.isOver,
        });
        this.bookLists =  data.lists.map((v: any) => {
            v.createTime = MkTime.format(v.createTime, 7);
            return v;
        });
        this.total = data.total;
    }
    private clearType() {
        this.type = '';
    }
    private clearLike() {
        this.type = '';
        this.like = '';
        this.disabled = true;
    }
    private clearOver() {
        this.isOver = '';
    }
    private searchEvent() {
        this.pageNo = 1;
        this.currentPage = 1;
        this.getBooks();
    }
    private addChapter(item: any) {
        this.$router.push(`/system/detail?bookId=${item.bookId}&name=${item.name}`);
    }
    private editChapter(item: any) {
        this.$router.push(`/system/upload?bookInfo=${JSON.stringify(item)}`);
    }
    private toDetail(item: any) {
        this.$router.push(`/system/chapters?bookId=${item.bookId}&name=${item.name}`);
    }
    private async deleteBook(item: any) {
        const data: any = await Common.deleteBook({
            bookId: item.bookId,
        });
        Message({
            type: 'success',
            message: '删除成功',
        });
        this.getBooks();
    }
    private deleteBookEvent(item: any) {
        MessageBox({
            title: '提示',
            message: '是否确认删除这本小说？',
            showCancelButton: true,
            callback: (action) => {
                if (action === 'confirm') {
                    this.deleteBook(item);
                } else {
                    Message({
                        type: 'info',
                        message: '取消删除',
                    });
                }
            },
        });
    }
    private handlerChange(num: number) {
        this.pageNo = num;
        this.currentPage = num;
        this.getBooks();
    }
}
</script>
<style lang="less" scoped>
.book-lists{
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}
.book-search{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.book-search-list{
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-top: 20px;
}
.book-search-val{
    margin-right: 10px;
    width: 100px;
}
.search-id {
    width: 202.73px;
}
.search-btn{
    width: 100px;
    margin-top: 20px;
}
.book-main{
    margin-top: 20px;
    flex: 1;
}
.book-pagination{
    margin-top: 20px;
    text-align: right;
}
.book-list-img{
    width: 75px;
    height: 100px;
    object-fit: cover;
}
</style>
