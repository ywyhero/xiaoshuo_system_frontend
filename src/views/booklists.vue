<template>
    <div class="book-lists">
        <div class="book-search">
            <div class="book-search-list">
                <span class="book-search-val">小说ID:</span>
                <el-input type="text" v-model.number="bookId" clearable></el-input>
            </div>
            <div class="book-search-list">
                <span class="book-search-val">小说类型:</span>
                <el-select v-model="type" placeholder="请选择" clearable @clear="clearType">
                    <el-option
                    v-for="item in types"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" @click="searchEvent">查询</el-button>
        </div>
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
                label="小说封面"
                width="120">
                    <template slot-scope="scope">
                        <img class="book-list-img" :src="scope.row.imgUrl"/>
                    </template>
                </el-table-column>
                <el-table-column
                label="创建时间"
                width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime}}</span>
                    </template>
                </el-table-column>
                 <el-table-column
                label="操作"
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
    private bookId: number | string = '';
    private total: number = 0;
    private pageSize: number = 20;
    private pageNo: number = 1;
    private currentPage: number = 1;
    private types: object[] = [{}];
    private bookLists: object[] = [{}];
    public async created() {
        await this.getTypes();
        await this.getBooks();
    }
    private async getTypes() {
        const data: any = await Common.types({});
        this.types = data.types;
    }
    private async getBooks() {
        const data: any = await Common.bookLists({
            pageSize: this.pageSize,
            pageNo: this.pageNo,
            bookId: this.bookId,
            type: this.type,
        });
        this.bookLists =  data.lists.map((v: any) => {
            v.createTime = MkTime.format(v.createTime / 1000, 7);
            return v;
        });
        this.total = data.total;
    }
    private clearType() {
        this.type = '';
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
}
.book-search-list{
    display: flex;
    align-items: center;
    margin-right: 20px;
}
.book-search-val{
    margin-right: 10px;
    width: 100px;
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
