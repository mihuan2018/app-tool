<template>
    <div class="authorizer-wrapper">
        <div class="authorizer-loading">
            <i class="el-icon-loading"></i>
            <div style="margin-top: 1rem;">正在授权</div>
        </div>
    </div>
</template>

<script>
    import {authCode} from "../api/index.js"
    export default {
        created(options) {

        },
        mounted(options) {
            let self = this;
            let query = this.$route.query;
            console.log(query)
            if(query.code && query.code != "") {
                let params = new FormData();
                params.append("code", query.code);
                params.append("state", query.state || "");
                authCode(params).then(res => {
                    if(res.status != 200) {
                        self.$message.error(res.message);
                    }
                    else {
                        //设置数据到缓存
                        self.$cookie.set("token", res.data.token);
                        self.$cookie.set("shopName", res.data.user.dydShopName);
                        self.$cookie.set("shopId", res.data.user.dydShopId);
                        //跳转到首页
                        self.$router.push({
                            path: "/"
                        })
                    }
                })
            }
            else {
                self.$message.error("授权码为空");
            }
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped="scoped">
    .authorizer-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .authorizer-wrapper .authorizer-loading {
        text-align: center;
    }
    .el-icon-loading {
        font-size: 1.5rem;
    }
</style>
