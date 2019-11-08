<template>
    <div class="upload">
        <div class="upload-title">
            <span class="upload-title-val">小说名称：</span>
            <el-input class="upload-title-input" v-model="name"></el-input>
        </div>
        <div class="upload-types">
            <span class="upload-title-val">小说作者：</span>
            <el-input class="upload-title-input" v-model="author"></el-input>
        </div>
        <div class="upload-types">
            <span class="upload-title-val">小说类型：</span>
            <el-select v-model="type" placeholder="请选择" @change="selectEvent">
                <el-option
                v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="upload-types">
            <span class="upload-title-val">喜欢人群：</span>
            <el-select v-model="like" placeholder="请选择" @change="selectEvent">
                <el-option
                v-for="item in CommonData.like"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="upload-types">
            <span class="upload-title-val">是否完结：</span>
            <el-select v-model="isOver" placeholder="请选择" @change="selectEvent">
                <el-option
                v-for="item in CommonData.isOver"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="upload-img">
            <span class="upload-img-val">小说书面：</span>
            <el-upload
                class="avatar-uploader"
                :action="actionUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="upload-textarea">
            <span class="upload-textarea-val">小说简介：</span>
            <el-input class="upload-textarea-input" type="textarea" :rows="3" resize="none" v-model="des"></el-input>
        </div>
        <el-button class="upload-btn" type="primary" @click="uploadEvent">{{btnVal}}</el-button>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Input, Button, Upload, Message, Option, Select } from 'element-ui';
import Common from './../../service/common';
import ENV from './../../config/env';
import CommonData from './../../utils/commonData';
interface TypesObj {
    id: number;
    name: string;
}
interface BookInfo {
    bookId: number;
    name: string;
    author: string;
    type: number;
    imgUrl: string;
    like: number;
    isOver: number;
    description: string;
}
@Component({
    components: {
        'el-input': Input,
        'el-button': Button,
        'el-upload': Upload,
        'el-option': Option,
        'el-select': Select,
    },
})

export default class Uploader extends Vue {
    private name: string = '';
    private author: string = '';
    private btnVal: string = '确认上传';
    private imageUrl: string = '';
    private imgUrl: string = '';
    private bookId: number | null = null;
    private type: string | number = '';
    private des: string = '';
    private types: TypesObj[] = [];
    private actionUrl: string = '';
    private like: number | null = null;
    private isOver: number | null = null;
    private CommonData: object = CommonData;
    private bookInfo: BookInfo = {
        bookId: 0,
        name: '',
        author: '',
        type: 0,
        imgUrl: '',
        like: 0,
        isOver: 0,
        description: '',
    };
    public async created() {
        this.actionUrl = `${ENV.api}/upload`;
        const bookInfo: any = this.$route.query.bookInfo;
        if (bookInfo) {
            this.bookInfo = JSON.parse(bookInfo);
            this.bookId = this.bookInfo.bookId;
            this.type = this.bookInfo.type;
            this.name = this.bookInfo.name;
            this.author = this.bookInfo.author;
            this.imageUrl = this.bookInfo.imgUrl;
            this.imgUrl = this.bookInfo.imgUrl;
            this.like = this.bookInfo.like;
            this.isOver = this.bookInfo.isOver;
            this.des = this.bookInfo.description;
            this.btnVal = '确认修改';
        }
        this.getTypes();
    }
    private handleAvatarSuccess(res: any, file: any) {
        if (res.code !== 200) {
            return Message({
                type: 'error',
                message: res.data.msg,
            });
        }
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imgUrl = res.data.imgUrl;
    }
    private async getTypes() {
        const data: any = await Common.types({});
        this.types = data.types;
    }
    private selectEvent(e: number) {
        this.type = e;
    }
    private async uploadEvent() {
        if (!this.name) {
            return Message({
                type: 'error',
                message: '小说名称没有填写',
            });
        }
        if (!this.type) {
            return Message({
                type: 'error',
                message: '小说类型没有选择',
            });
        }
        const typeName: any = this.types.find((v) => v.id === this.type);
        const data: any = await Common.books({
            bookId: this.bookId,
            author: this.author,
            name: this.name,
            type: this.type,
            typeName: typeName.name,
            imgUrl: this.imgUrl,
            like: this.like,
            isOver: this.isOver,
            description: this.des,
        });
        this.$router.push('/system/lists');
        Message({
            type: 'success',
            message: data.data.msg,
        });
    }
}
</script>
<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
</style>

<style lang="less" scoped>
.upload {
    padding: 20px;
}
.upload-title{
    display: flex;
    align-items: center;
}
.upload-title-input{
    width: 200px;
}
.upload-title-textarea{
    width: 100px;
}
.upload-types{
    display: flex;
    align-items: center;
    margin-top: 40px;
}
.upload-img{
    margin-top: 40px;
    display: flex;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: cover;
}
.upload-btn{
    float: left;
    margin: 40px 0 0 0;
}
.upload-textarea{
    display: flex;
    align-items: center;
    margin-top: 40px;
}
.upload-textarea-val{
    width: 80px;
}
.upload-textarea-input{
    width: 400px;
}
</style>
