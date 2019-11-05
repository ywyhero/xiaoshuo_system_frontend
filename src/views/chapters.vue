<template>
    <div class="chapters">
        <div class="chapters-search">
            <div class="chapters-search-list">
                <span class="chapters-search-val">目录名称:</span>
                <el-input type="text" placeholder="请输入目录名称" v-model="chapterName"></el-input>
            </div>
            <div class="chapters-search-list">
                <span class="chapters-search-val">目录ID:</span>
                <el-input type="text" placeholder="请输入目录ID" v-model.number="chapterSearchId"></el-input>
            </div>
            <el-button type="primary" @click="searchEvent">查询</el-button>
        </div>
        <div class="chapters-search">
            <el-button type="primary" @click="addChapter">添加新的章节</el-button>
        </div>
       
        <div class="chapters-main">
            <el-table
                :data="chapterLists"
                height="100%"
                border
                style="width: 100%">
                <el-table-column
                prop="name"
                label="目录名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="chapterId"
                label="目录ID"
                width="100">
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
                            <el-button type="text" @click="toDetail(scope.row)">修改章节</el-button>
                            <el-button type="text" @click="deleteChapterEvent(scope.row)">删除章节</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="chapters-pagination">
            <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page="currentPage"
            :total="total"
            @current-change="handlerChange">
            </el-pagination>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Table, TableColumn, Pagination, Button, Message, MessageBox, Input } from 'element-ui';
import Common from './../service/common';
import MkTime from 'mktime';
interface ChapterObj {
    name: string;
    chapterId: number;
    createTime: number;
    content: string;
}
@Component({
    components: {
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-pagination': Pagination,
        'el-button': Button,
        'el-input': Input,
    },
})
export default class Chapters extends Vue {
    private chapterLists: ChapterObj[] = [];
    private bookId: string | Array<string | null> = '';
    private name: string | Array<string | null> = '';
    private total: number = 0;
    private currentPage: number = 1;
    private pageSize: number = 20;
    private pageNo: number = 1;
    private chapterName: string = '';
    private chapterSearchId: number | string = '';
    public created() {
        this.bookId = this.$route.query.bookId;
        this.name = this.$route.query.name;
        this.getChapters();
    }
    private async getChapters() {
        const data: any = await Common.getChapters({
            bookId: this.bookId,
            pageSize: this.pageSize,
            pageNo: this.pageNo,
            chapterName: this.chapterName,
            chapterId: this.chapterSearchId,
        });
        this.chapterLists =  data.chapters.map((v: ChapterObj) => {
            v.createTime = MkTime.format(v.createTime / 1000, 7);
            return v;
        });
        this.total = data.total;
    }
    private searchEvent() {
        this.currentPage = 1;
        this.pageNo = 1;
        this.getChapters();
    }
    private addChapter() {
        this.$router.push(`/system/detail?bookId=${this.bookId}&name=${this.name}`);
    }
    private toDetail(item: any) {
        this.$router.push(`/system/detail?bookId=${this.bookId}&chapterId=${item.chapterId}&name=${this.name}&from=chapter`);
    }
    private deleteChapterEvent(item: any) {
        MessageBox({
            title: '提示',
            message: '是否确认删除本章节？',
            showCancelButton: true,
            callback: (action) => {
                if (action === 'confirm') {
                    this.deleteChapter(item);
                } else {
                    Message({
                        type: 'info',
                        message: '取消删除',
                    });
                }
            },
        });
    }
    private async deleteChapter(item: any) {
        const data: any = await Common.deleteChapter({
            bookId: this.bookId,
            chapterId: item.chapterId,
        });
        this.getChapters();
        Message({
            type: 'success',
            message: data.data.msg,
        });
    }
    private handlerChange(num: number) {
        this.pageNo = num;
        window.localStorage.setItem('currengPage', `${num}`);
        this.getChapters();
    }
}
</script>
<style lang="less" scoped>
.chapters{
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}
.chapters-search{
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}
.chapters-main{
    flex: 1;
}
.chapters-search-list{
    display: flex;
    align-items: center;
    margin-right: 20px;
}
.chapters-search-val{
    width: 100px;
    margin-right: 10px;
}
.chapters-pagination{
    margin-top: 20px;
    text-align: right;
}

</style>
