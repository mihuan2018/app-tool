<template>
    <div class="app-body">
        <sidebar></sidebar>
        <div class="app-main">
            <Navbar></Navbar>
            <div class="app-main-body">
                <div class="list">
                    <div class="list-main">
                        <div class="list-main-top">
                            <span>导入时间: </span>
                            <el-date-picker
                                size="small"
                                v-model="time_value"
                                value-format="timestamp"
                                @change="getTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                style="width: 336px !important; margin-left: 10px"
                                end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </div>

                        <div class="l-mian-btn">
                            <input type="file" style="display: none" @change="handleFileChange" ref="upload" accept=".xls, .xlsx" value="导入订单">
                            <el-button type="primary" size="small" @click="onImport">导入订单</el-button>
                            <el-button size="small" @click="onDown">下载模版</el-button>
                            <el-button type="warning" size="small" @click="onClear" style="width: 100px">清空筛选条件</el-button>
                            <a  ref="downloadMoudle" href="https://sanyetongsj.oss-cn-shanghai.aliyuncs.com/system/%E6%89%B9%E9%87%8F%E5%8F%91%E8%B4%A7%E6%A8%A1%E7%89%88.xls" download="模板下载"></a>
                            <progressMoudle :dialogVisible="progress_dialogVisible" :num="progressNum"></progressMoudle>
                        </div>

                        <template >
                            <div class="l-list" v-for="(item, id) of dataList" :key="id">
                                <dl class="l-dl">
                                    <dt>导入时间: {{item.createTime.time | dateFormat}}</dt>
                                    <dd>操作者: {{name}}</dd>
                                </dl>
                                <ul class="l-ul">
                                    <li>
                                        <p>订单数量: {{item.orderNum}}</p>
                                        <span class="lv-span lv1" v-if="item.status==0">待开始</span>
                                        <span class="lv-span lv2" v-else-if="item.statu==1">进行中</span>
                                        <span class="lv-span lv3" v-else-if="item.status== 2">已暂停</span>
                                        <span class="lv-span lv4" v-else>已完成</span>
                                    </li>
                                    <li>
                                        <p><span>已揽收/未揽收</span><span>: </span><span>{{item.receiveNum}} / {{item.unreceiveNum}}</span></p>
                                        <p><span>已发货/未发货</span><span>: </span><span>{{item.deliverNum}} / {{item.undeliverNum}}</span></p>
                                    </li>
                                    <li>
                                        <el-button size="mini" style="width: 80px" @click="onEdit(item.id)">编辑</el-button>
                                    </li>
                                </ul>
                            </div>

                            <div class="app-body-pagination">
                                <el-pagination
                                    @current-change="handleCurrentChange"
                                    :page-size="10"
                                    layout="total, prev, pager, next, jumper"
                                    :total="totalCountone">
                                </el-pagination>
                            </div>
                        </template>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { logisticsImport, logisticsList } from '../api/order-list.js'
import Axios from 'axios';
import progressMoudle from './popup/progress';
import editList from "./edit-list";
import orderNote from "./popup/order-note";
import {userLogin} from "../api";
export default {
    name: "list",
    components: {
        progressMoudle
    },
    data() {
        return {
            time_value: "",
            progress_dialogVisible: false,
            progressNum: 0,
            dataList: [],
            totalCountone: 0,
            page: 1,
            name:''
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if( vm.$cookie.get('id')){
                vm.init();
                vm.name = vm.$cookie.get('name');
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
            params.append('page', this.page);
            params.append('limit', 10);

            if (arguments[0] instanceof Array) {
                params.append('timeStart', arguments[0][0]);
                params.append('timeEnd', arguments[0][1]);
            }

            logisticsList(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    this.dataList = res.list;
                    this.totalCountone = res.totalCount
                }

            })
        },
        onClear() {
            this.time_value = '';
            this.init();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.init();
        },
        getTime() {
            this.init(this.time_value)
        },
        onEdit(id) {
            this.$router.push({name:'edit',query: {id: id}})
        },
        onDown() {
            this.$refs.downloadMoudle.dispatchEvent(new MouseEvent('click'));
        },
        onImport() {
            this.$refs.upload.dispatchEvent(new MouseEvent('click'));
        },
        handleFileChange() {
            let params = new FormData();
            let that = this;
            this.progress_dialogVisible = true;
            let timer = setInterval(() => {
                if (this.progressNum < 98) {
                    this.progressNum++
                } else {
                    clearTimeout(timer);
                }
            }, 100)

            // if(inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/gif'){
            //     alert('不是有效的图片文件！');
            //     return;
            // }


            params.append('files', this.$refs.upload.files[0])
            params.append('platform', 1);
            Axios({
                method: 'post',
                // url: 'http://172.16.1.218:8080/logistics/base/import',
                url: 'http://api.chainfos.com/live/logistics/base/import',
                data: params,
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress(progressEvent) {
                    console.log(progressEvent);
                    if (progressEvent.lengthComputable) {
                        if ( (progressEvent.loaded / progressEvent.total * 100).toFixed(0) == '100' ) {
                            that.progressNum = 100;
                            that.progress_dialogVisible = false
                            clearTimeout(timer);
                        }
                    }
                }
            }).then(function (res) {
                console.log(res);
               if (res.data.status == 200) {
                   that.$message.success('导入订单成功');
                   that.$refs.upload.value ='';
                   that.init();
               } else{
                   that.$message.error(res.data.message);
                   that.$refs.upload.value ='';
                   that.progress_dialogVisible = false
               }
            }).catch(function (error) {
                console.log(error);
                that.$message.error('网络超时...');
                that.$refs.upload.value ='';
                that.progress_dialogVisible = false
            })

        }

    },
};
</script>
<style scoped>
.list {
    background-color: #fff;
    width: 100%;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.list-main {
    padding-left: 40px;
}

.list-main-top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.l-list {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    border-radius: 6px;
    margin-bottom: 20px;
}

.l-dl {
    display: flex;
    padding: 10px;
    background: #fafafa;
    border-bottom: 1px solid #ebeef5;
    font-weight: 700;
}

.l-dl dt {
    margin-right: 30px;
}

.l-ul {
    padding: 10px 20px;
}

.l-ul li {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
    align-items: center;
}

.l-ul li p:nth-child(1) {
    display: block;
    margin-right: 40px;
}

.l-ul li:last-child {
    margin-bottom: 0;
}

.l-mian-btn {
    display: flex;
    justify-content: flex-start;
    margin: 30px 0;
}

.lv-span {
    display: inline-block;
    padding: 4px 8px;
    color: #fff;
    border-radius: 25px;
}

.lv1 {
    background-color: #67C23A;
}

.lv2 {
    background-color: #409EFF;
}

.lv3 {
    background-color: #F56C6C;
}

.lv4 {
    background-color: #909399;
}

.app-body-pagination{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 20px 0 0;

}
</style>
