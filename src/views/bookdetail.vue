<template>
    <div class="book-detail">
        <div class="book-detail-li">
            <span class="book-detail-li-val">小说名称:</span>
            <span>{{name}}</span>
        </div>
        <div class="book-detail-li">
            <span class="book-detail-li-val">章节名称:</span>
            <el-input type="text" v-model="chapterName"></el-input>
        </div>
        <div class="book-detail-textarea">
            <span class="book-detail-li-val">章节内容:</span>
            <el-input type="textarea" rows="40" resize="none" v-model="content"></el-input>
        </div>
        <el-button class="book-detail-btn" type="primary" @click="submitEvent">发布</el-button>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Input, Button, Message } from 'element-ui';
import Common from './../service/common';
@Component({
    components: {
        'el-input': Input,
        'el-button': Button,
    },
})
export default class Bookdetail extends Vue {
    private name: string | Array<string | null> = '';
    private bookId: string | Array<string | null> = '';
    private chapterId: string | Array<string | null> = '';
    private from: string | Array<string | null> = '';
    private chapterName: string = '';
    private content: string = '';
    public created() {
        this.name = this.$route.query.name;
        this.bookId = this.$route.query.bookId;
        this.chapterId = this.$route.query.chapterId;
        this.from = this.$route.query.from;
        if (this.from === 'chapter') {
            this.getChapterDetail();
        }
    }
    private async submitEvent() {
        const res: any = await Common.addChapter({
            bookId: this.bookId,
            name: this.chapterName,
            chapterId: this.chapterId,
            content: this.content,
        });
        Message({
            type: 'success',
            message: res.data.msg,
        });
        this.$router.push(`/system/chapters?bookId=${this.bookId}&name=${this.name}`);
    }
    private async getChapterDetail() {
        const { data }: any = await Common.getChapterDetail({
            bookId: this.bookId,
            chapterId: this.chapterId,
        });
        const chapter = data.chapter;
        this.chapterName = chapter.chapterName;
        this.content = data.content && data.content.content;
    }
}
</script>
<style lang="less" scoped>
.book-detail{
    padding: 20px;
}
.book-detail-li{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.book-detail-li-val{
    width: 100px;
}
.book-detail-textarea{
    display: flex;
}
.book-detail-btn{
    float: right;
    margin-top: 20px;
}
</style>
