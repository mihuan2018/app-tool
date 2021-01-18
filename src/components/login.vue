<template>
    <div class="login-wrapper">
        <div class="login-box">
            <div class="login-innerBox">
                <div class="user-type">
                    <div class="user-type-item" :class="userType == 1 ? 'active' : ''" v-on:click="switchUserType(1)">抖店</div>
                    <div class="user-type-item" :class="userType == 2 ? 'active' : ''" v-on:click="switchUserType(2)">供应商</div>
                </div>
                <el-input v-model="account" placeholder="请输入帐号" class="user-content"></el-input>
                <el-input v-model="password" placeholder="请输入密码"  class="user-content" show-password></el-input>
                <div class="login-button">
                    <el-button type="primary" @click="userLogin">登录</el-button>
                </div>
                <!-- 快捷登录 仅限于抖店用户 -->
                <div class="quick-login">
                    <p>快捷登录（仅限于抖店用户）</p>
                    <div class="quick-icon-list">
                        <a href="https://fuwu.jinritemai.com/authorize?service_id=5591&state=dyd" class="quick-icon-item douyin"></a>
                    </div>
                </div>
                <div class="other-function">
                    <router-link to="/">忘记密码</router-link>
                    <router-link to="/">供应商注册</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {supplierLogin} from "../api/index.js"
    export default {
        data() {
            return {
                account: "",
                password: "",
                userType: 1
            }
        },
        methods: {
            switchUserType(type) {
                this.userType = type
            },
            userLogin() {
                let self = this;
                if(self.userType == 1) {
                    //抖店用户登录，目前不管
                    self.$message.error("抖店用户使用授权登录")
                }
                else if(self.userType == 2) {
                    if(self.account == "" || self.password == "") {
                        self.$message.error("账号或密码不能为空");
                        return;
                    }
                    let params = new FormData();
                    params.append("account", self.account);
                    params.append("password", self.password);
                    supplierLogin(params).then(res => {
                        if(res.status != 200) {
                            self.$message.error(res.message);
                        }
                        else {
                            //登录通过，设置cookie
                            self.$cookie.set("token", res.data.token);
                            self.$cookie.set("shopName", res.data.user.dyShopName || res.data.user.nickName);
                            self.$cookie.set("shopId", res.data.user.isBelongDy == 1 ? res.data.user.dyShopId : 0);
                        }
                    })
                }
                else {
                    self.$message.error("用户类型不正确");
                }
            }
        }
    }
</script>

<style scoped="scoped">
    div {
        box-sizing: border-box;
    }
    .login-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url(../assets/login-bg.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .login-wrapper .login-box .login-innerBox {
        background-color: #FFFFFF;
        padding: 1rem;
        border-radius: 0.8rem;
    }
    .login-wrapper .login-box {
        width: 20%;
        background-color: rgba(255, 255, 255, 0.3);
        padding: 1rem;
    }
    .user-type {
        display: flex;
        align-items: center;
    }
    .user-type .user-type-item {
        flex: 0 0 50%;
        width: 50%;
        box-sizing: border-box;
        height: 2rem;
        line-height: 2rem;
        font-size: 1rem;
        text-align: center;
        cursor: pointer;
    }
    .user-type .user-type-item.active {
        border-bottom: 1px solid #409EFF;
    }
    .user-content {
        margin-top: 1.6rem;
    }
    .quick-login {
        margin-top: 1rem;
    }
    .quick-login > p {
        text-align: center;
        padding: 0.5rem 0;
    }
    .quick-login .quick-icon-list {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .quick-login .quick-icon-list .quick-icon-item {
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: block;
    }
    .douyin {
        background-image: url(../assets/douyin-icon.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .other-function {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4rem;
    }
    a {
        color: #aaaaaa;
    }
    .login-button {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
