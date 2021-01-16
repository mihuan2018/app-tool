<template>
    <div class="home" style="width: 100%;margin-top: 50px; ">
        <div class="home-tool">
            <h5 style="padding-left: 50px;box-sizing: border-box">蜜獾应用工具</h5>
            <div class="home-tool-one">
                <el-row :gutter="12">
                    <el-col :span="8">
                        <el-card shadow="hover">
                            <dl @click="dialong_phone = true">
                                <dt><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607429024002&di=c43ee5f8868ed666d8dea5c33faccaca&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20200402%2Fe57680c1bb574b2fb738c9c218f48cbc.jpeg" alt=""></dt>
                                <dd>抖音发货</dd>
                            </dl>
                        </el-card>
                    </el-col>
<!--                    <el-col :span="8">-->
<!--                        <el-card shadow="never">-->
<!--                            <dl>-->
<!--                                <dt><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607429213392&di=b5485b0a1651a2c0e17f4a46c1c5424c&imgtype=0&src=http%3A%2F%2Fstatic.leiphone.com%2Fuploads%2Fnew%2Fbanner%2F5ba4bd755343c.png" alt=""></dt>-->
<!--                                <dd>快手发货</dd>-->
<!--                            </dl>-->
<!--                        </el-card>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                        <el-card shadow="never">-->
<!--                            <dl>-->
<!--                                <dt><img src="https://sanyetongsj.oss-cn-shanghai.aliyuncs.com/system/app-tool/timg.jpeg"></dt>-->
<!--                                <dd>淘宝发货</dd>-->
<!--                            </dl>-->
<!--                        </el-card>-->
<!--                    </el-col>-->
                </el-row>
            </div>
        </div>

        <el-dialog title="" :visible.sync="dialong_phone" width="40%"  :before-close="closeFn">
            <div class="dialong-phone-header">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="发货人手机号: " prop="phone">
                        <el-input v-model.number="ruleForm.phone"/>
                    </el-form-item>
                    <span>测试账号: 17521700835</span>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onFahuo">立即发货</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { userLogin, baseCode } from '../api/index.js'
import Vue from "vue";
import axios from 'axios'
let urlLib = require('url');


export default {
    name: 'index',
    data () {
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            } else {
                const reg = /^1[3|4|5|7|8｜9][0-9]\d{8}$/
                console.log(reg.test(value));
                if (reg.test(value)) {
                    this.phone_status = true;
                    callback();
                } else {
                    this.phone_status = false;
                    return callback(new Error('请输入正确的手机号'));
                }
            }
        };
        return {
            dialong_phone: false,
            ruleForm: {
                phone: ''
            },
            rules: {
                phone: [
                    {validator: checkPhone, trigger: 'blur'}
                ]
            },
            phone_status: false
        }
    },
    created() {
        console.log('测试账号:17521700835');

        if(!this.$cookie.get('id')) {
            this.$cookie.set('id','', 7);
        }

       if (urlLib.parse(window.location.href).query != null) {
            let urlArr = (urlLib.parse(window.location.href).query).split('&');
            let params = {params:{}};
            for(let i = 0 ; i < urlArr.length; i++) {
                params.params[urlArr[i].split('=')[0]] = urlArr[i].split('=')[1];
            }
            baseCode(params).then(res => {
                console.log(res);
            })
       }

    },
    methods: {
        onFahuo() {
            if (this.phone_status) {
                let params = new FormData();
                params.append('phone', this.ruleForm.phone)
                userLogin(params).then(res => {
                    console.log(res);
                    if (res.status != 200) {
                        this.$message.error(res.message);
                        return false;
                    } else {
                        axios.defaults.headers.common['userId'] = res.user.id;
                        this.$cookie.set('id', res.user.id, 7);
                        this.$cookie.set('name', res.user.name, 7);
                        this.$cookie.set('phone', res.user.phone, 7);
                        this.$router.push({name:'list'})
                    }

                })
            }

        },
        closeFn() {
            this.ruleForm.phone = '';
            this.dialong_phone = false;
            this.$refs.ruleForm.resetFields();
        }
    }
}
</script>
<style scoped>
.home {
    background-color: #fff;
    width: 100%;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.home-tool{
    margin: 0 auto;
}
.home-tool>h5 {
    font-size: 30px;
    margin-bottom: 100px;
}

.home-tool-one{
    width: 80%;
    margin: 0 auto;
}
.home-tool-one dl {
    display: flex;
    justify-content: center;
    align-content: center;
}
.home-tool-one dl dt {
    width: 150px;
    height: 150px;
    margin-right: 10px;
}
.home-tool-one dl dt img {
    width: 100%;
    height: 100%;
    border-radius: 40px;
}

.home-tool-one dl :hover{
    cursor: pointer;
}

.home-tool-one dd {
    font-size: 20px;
    height: 150px;
    line-height: 150px
}

.dialong-phone-header{
    display: flex;
    align-content: center;
}

.dialong-phone-header>span {
    display: block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    margin-right: 10px;
}

.dialog-footer {
    display: flex;
    justify-content: center;
}
</style>
