<template>
    <div class="add-chapters">
        <div class="add-chapters-li">
            <span class="add-chapters-li-val">小说名称：</span>
            <span class="add-chapters-li-input">{{bookName}}</span>
        </div>
        <div class="add-chapters-li">
            <span class="add-chapters-li-val">上传的网页地址：</span>
            <el-input v-model="url" placeholder="请输入您要上传的网页的地址"/>
        </div>
        <div class="add-chapters-li">
            <span class="add-chapters-li-val">网站目录的class或Id：</span>
            <el-input v-model="chapterClassId" placeholder="网站目录的class或Id"/>
        </div>
        <div class="add-chapters-li">
            <span class="add-chapters-li-val">网站内容的class或Id：</span>
            <el-input v-model="contentClassId" placeholder="网站内容的class或Id"/>
        </div>
        <div class="add-chapters-li">
            <span class="add-chapters-li-val">编码：</span>
            <el-input v-model="htmlCharset" placeholder="编码"/>
        </div>
        <div class="add-chapters-li">
            <span class="add-chapters-li-val">开始上传的章节Id：</span>
            <el-input v-model.number="initCount" placeholder="请填写初始值，默认0"/>
        </div>
        <div class="add-chapters-li">
            <span class="add-chapters-li-val">需要额外添加的章节数：</span>
            <el-input v-model.number="otherCount" placeholder="请填写初始值，默认0"/>
        </div>
        <div class="add-chapters-li">
            <span class="add-chapters-li-val">域名：</span>
            <el-input v-model="host" placeholder="域名"/>
        </div>
        <el-button type="primary" @click="uploadBooks">上传</el-button>
    </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Input, Button, Message } from 'element-ui';
import Common from './../service/common';
@Component({
    components: {
        'el-input': Input,
        'el-button': Button,
    },
})
export default class AddChapters extends Vue {
    private bookId: string | Array<string | null> = '';
    private bookName: string | Array<string | null> = '';
    private url: string = '';
    private host: string = '';
    private initCount: number = 0;
    private otherCount: number = 0;
    private htmlCharset: string = '';
    private chapterClassId: string = '';
    private contentClassId: string = '';

    public created() {
        const query = this.$route.query;
        this.bookId = query.bookId;
        this.bookName = query.name;
    }
    private async uploadBooks() {
        const { data }: any = await Common.addChapters({
            chapterClassId: this.chapterClassId,
            contentClassId: this.contentClassId,
            host: this.host,
            initCount: this.initCount,
            otherCount: this.otherCount,
            htmlCharset: this.htmlCharset,
            url: this.url,
            bookId: this.bookId,
        });
        Message({
            type: 'success',
            message: data.msg,
        });
    }
}
</script>
<style lang="less" scoped>
.add-chapters{
    display: flex;
    flex-direction: column;
    padding-top: 20px; 
}
.add-chapters-li{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.add-chapters-li-val{
    width: 240px;
    text-align: left;
}
</style>
