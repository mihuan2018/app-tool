<template>
    <div class="app-body">
        <sidebar></sidebar>
        <div class="app-main">
            <Navbar></Navbar>
            <div class="app-main-body">
                <div class="set">
                    <div class="set-top">
                        <div class="set-info">
                            <h3>预警设置</h3>
                            <p>开启后，到距导入时间已超过预警时间检测到还未发货，系统给管理员发送短息提醒。</p>
                        </div>
                        <div class="set-right">
                            <el-switch
                                v-model="swtich_value"
                                active-color="#13ce66"
                                @change="onSwitchValue"
                                inactive-color="#ff4949">
                            </el-switch>
                        </div>
                    </div>
                    <div class="set-center">
                        <span>揽收发货轮询时间间隔</span>
                        <div><el-input v-model="time_jg"></el-input></div>
                        <span>分钟</span>

                    </div>
                    <div class="set-center">
                        <span>当距导入时间超过</span>
                        <div><el-input v-model="time_tx"></el-input></div>
                        <span>小时，订单还未完成发货，将给手机号{{ this.$cookie.get('phone')}}发送短信提醒</span>
                    </div>
                    <div>
                        <el-button type="primary" size="small" style="width: 80px" @click="onSettingUpdate">保存</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { settingQuery, settingUpdate } from '../api/setting.js'
export default {
    name: 'setting',
    data() {
        return {
            swtich_value: true,
            time_jg: '',
            time_tx: ''
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if( vm.$cookie.get('id')){
                vm.init();
            } else {
                vm.$message.warning('用户已失效');
                next('/');
            }
        })
    },
    created() {

    },
    methods: {
        init() {
            let params = new FormData();
            settingQuery(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    if (res.data.expireTime == 0) {
                        this.swtich_value = false;
                    } else{
                        this.swtich_value = true;
                    }

                    this.time_jg = parseFloat(res.data.pollTime /60) || 0 ;
                    this.time_tx = parseFloat(res.data.expireTime /60) || 0 ;

                }
            })
        },
        onSettingUpdate() {
            let params = new FormData();
            params.append('pollTime', parseFloat(this.time_jg * 60 ));

            if (arguments[0] === 0) {
                params.append('expireTime', arguments[0]);
            } else {
                params.append('expireTime', parseFloat(this.time_tx * 60 ));
            }
            settingUpdate(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    this.$message.success('设置成功');
                    this.init();

                }
            })
        },
        onSwitchValue() {
            console.log(this.swtich_value);
            if (!this.swtich_value){
                this.onSettingUpdate(0);
            } else{
                this.$message.success('开启预警设置成功');
            }

        }
    }
}
</script>
<style scoped>
.set {
    background-color: #fff;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.set-top {
    display: flex;
    font-size: 12px!important;
    padding: 15px;
    background-color: #f4f4f4;
    border-radius: 8px;
    line-height: 5px;
    box-sizing: border-box;
    justify-content: space-between;
    margin-bottom: 30px;
}
.set-info h3 {
    height: 25px;
    line-height: 25px;
}
.set-info p {
    height: 20px;
    line-height: 20px;
}
.set-center {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.set-center>div {
    margin: 0 8px 0 4px;
}
</style>
