<template>
   <div class="common">
        <el-container :style="{height: height + 'px'}" style="border-left: 1px solid #545c64">
            <div class="common-left">
                <div class="sys-name">
                    <!-- <img class="login-logo" src="./../assets/images/title_icon.png" alt /> -->
                    <span>后台管理系统</span>
                </div>
                <el-aside width="200px" style="background-color: #545c64">
                    <el-menu
                        :default-openeds="defaultOpeneds"
                        background-color="#304156"
                        text-color="#fff"
                        active-text-color="#1890FF"
                        :default-active="defaultActive"
                    >
                        <el-submenu v-for="(item, index) in navLists" :key="index" :index="item.id">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                {{item.name}}
                            </template>
                            <div v-for="(itm, idx) in item.list" :key="idx">
                                <el-submenu v-if="itm.list" :index="itm.id">
                                    <template slot="title">{{itm.name}}</template>
                                    <el-menu-item
                                        v-for="(it, ix) in itm.list"
                                        :key="ix"
                                        @click="clickEvent(it)"
                                        :index="it.id"
                                    >{{it.name}}</el-menu-item>
                                </el-submenu>
                                <el-menu-item-group v-else>
                                    <el-menu-item
                                        :index="itm.id"
                                        @click="clickEvent(itm)"
                                    >{{itm.name}}</el-menu-item>
                                </el-menu-item-group>
                            </div>
                        </el-submenu>
                    </el-menu>
                </el-aside>
            </div>
            <el-container>
                <el-header class="header">
                    <el-dropdown @command="logout">
                        <div class="header-personal">
                            <i
                                class="el-icon-setting"
                                style="margin-right: 10px; color: #fff; font-size: 14px;"
                            ></i>
                            <span class="el-icon-val">{{username}}</span>
                        </div>

                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item command="changePassword">修改密码</el-dropdown-item> -->
                            <el-dropdown-item @command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main class="common-main">
                    <div class="common-main-router">
                        <!-- <div class="common-main-breadcrumb" v-show="path !== '/system/index'">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/system/index' }">积分商城系统</el-breadcrumb-item>
                                <el-breadcrumb-item
                                    class="common-main-breadcrumb-item"
                                    v-for="(item, index) in breadcrumbLists"
                                    :key="index"
                                    :to="item.path"
                                >{{item.name}}</el-breadcrumb-item>
                            </el-breadcrumb>
                            <el-button
                                size="small"
                                type="primary"
                                class="back-user-list"
                                @click="backUserList"
                            >查看用户列表</el-button>
                        </div> -->
                        <keep-alive>
                            <router-view
                                class="common-main-view keepAlive"
                                v-if="$route.meta.keepAlive"
                            ></router-view>
                        </keep-alive>
                        <router-view class="common-main-view" v-if="!$route.meta.keepAlive"></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <!-- <div class="change-password" v-show="isShow">
            <div class="change-password-box">
                <span class="change-password-title">修改密码</span>
                <div class="change-password-main">
                    <div class="change-password-list">
                        <span class="change-password-val">
                            <span class="change-password-icon">*</span>旧密码
                        </span>
                        <el-input
                            class="change-password-input"
                            prefix-icon="el-icon-unlock"
                            v-model="oldPwd"
                            placeholder="请输入旧密码"
                        ></el-input>
                    </div>
                    <div class="change-password-list">
                        <span class="change-password-val">
                            <span class="change-password-icon">*</span>新密码
                        </span>
                        <el-input
                            class="change-password-input"
                            prefix-icon="el-icon-unlock"
                            v-model="newPwd"
                            placeholder="请输入新密码"
                        ></el-input>
                    </div>
                </div>
                <div class="change-password-btns">
                    <el-button type="primary" @click="sure">确定</el-button>
                    <el-button @click="cancle">取消</el-button>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Container, Header, Aside, Main, Menu, MenuItemGroup,
        Submenu, MenuItem, Dropdown, DropdownMenu, DropdownItem, Message } from 'element-ui';
import Common from '@/service/common';
interface MenuObj {
    id: number;
    name: string;
    url: string;
}
@Component({
    components: {
        'el-container': Container,
        'el-header': Header,
        'el-aside': Aside,
        'el-main': Main,
        'el-menu': Menu,
        'el-menu-item-group': MenuItemGroup,
        'el-submenu': Submenu,
        'el-menu-item': MenuItem,
        'el-dropdown': Dropdown,
        'el-dropdown-menu': DropdownMenu,
        'el-dropdown-item': DropdownItem,
    },
})
export default class Index extends Vue {
    private username: string = 'admin';
    private height: number = 0;
    private defaultOpeneds: string[] = ['1'];
    private defaultActive: string = '';
    private navLists: object[] = [{
        id: '1',
        name: '系统配置',
        list: [{
            id: '11',
            name: '小说列表',
            url: '/system/lists',
        }, {
            id: '12',
            name: '上传小说',
            url: '/system/upload',
        }],
    }];
    public created() {
        const height = window.innerHeight;
        this.height = height;
        const path = this.$route.path;
        this.getId(this.navLists, path);
    }
    @Watch('$route')
    private onChangeRouter(newVal: any) {
        this.getId(this.navLists, newVal.path);
    }
    private getId(arr: any[], path: string) {
        arr.forEach((item: any) => {
            if (item.list) {
                this.getId(item.list, path);
            } else {
                if (item.url === path) {
                    this.defaultActive = item.id;
                }
            }
        });
    }
    private clickEvent(item: MenuObj) {
        const path = this.$route.path;
        if (path === item.url) {
            return false;
        }
        this.$router.push(item.url);
    }
    private async logout() {
        const data: any = await Common.logout({});
        Message({
            type: 'success',
            message: data.data.msg,
        });
        window.sessionStorage.removeItem('token');
        this.$router.push('/login');
    }
}
</script>
<style lang="less">
.common {
    .el-header {
        line-height: 60px;
    }
    .el-menu {
        border-right: none;
    }
    .el-menu-item-group__title {
        padding: 0;
    }
    .common-main {
        width: 100%;
        height: 100%;
        background: #f1f1f1;
        padding: 20px;
    }
    .common-main-router {
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
    }
    .common-main-view {
        flex: 1;
        overflow-y: auto;
        padding: 0 20px 20px 20px;
    }
    .sys-name {
        width: 200px;
        height: 60px;
        // line-height: 60px;
        font-size: 20px;
        color: #fff;
        background: #2e384a;
        text-align: center;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .common-left {
        display: flex;
        flex-direction: column;
    }
    .el-aside {
        flex: 1;
        background-color: #304156 !important;
    }
    .login-logo {
        width: 30px;
        height: 30px;
        margin-right: 6px;
    }
    .header {
        text-align: right;
        color: #fff;
        font-size: 14px;
        background: #2e384a;
        .header-personal {
            height: 60px;
            cursor: pointer;
        }
    }
    .el-icon-val {
        color: #fff;
    }
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all 0.5s;
    }
    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }
    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    .el-submenu__title{
        text-align: left;
    }
    .el-menu-item{
        text-align: left;
        padding-left: 50px !important;
    }
}
</style>
<style lang="less" scoped>
.common-main-breadcrumb-item {
    cursor: pointer;
}
.common-main-breadcrumb-name {
    color: #606266;
    font-size: 14px;
}
.common-main-breadcrumb {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    // padding-top: 20px;
    // margin-left: 20px;
    // padding-bottom: 10px;
    .back-user-list {
        margin-top: -8px;
    }
}
.change-password {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    .change-password-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 4px;
        padding: 20px;
        .change-password-title {
            font-weight: 700;
            font-size: 18px;
        }
        .change-password-main {
            margin-top: 15px;
            .change-password-list {
                display: flex;
                margin-bottom: 15px;
                align-items: center;
                .change-password-val {
                    width: 64px;
                    margin-right: 20px;
                }
                .change-password-input {
                    width: 400px;
                }
            }
        }
        .change-password-btns {
            text-align: right;
        }
    }
}
</style>

</style>
