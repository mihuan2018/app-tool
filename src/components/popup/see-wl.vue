<template>
    <div class="see-wl">
        <el-dialog
            title="物流信息"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="closeFn"
            custom-class="see-dialog"
        >
        <div class="see-wuliu">
            <div class="see-wuliu-h5">{{expressName}}</div>
            <div class="see-wuliu-num">订单号 : {{orderNum}}</div>
            <ul class="see-wl-ul">
                <li v-for="(item, id) of dataList" :key="id">
                    <div>{{item.context}}</div>
                    <div>{{ item.logisticsTime.time | dateFormat}}</div>
                </li>

            </ul>
        </div>

            <div class="dialog-footer">
                <el-button @click="closeFn">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
/**
 * @author jjz
 * @use 查看物流弹窗组建
 */
import {orderInfoList} from "../../api/edit";
export default {
    name: 'order-note',
    props: {
        wlArray: {
            type: Array,
            default: function () {
                return []
            }
        },
        dialogVisible:{
            type: Boolean,
            default: false
        },
        orderNum: {
            type: String,
            default: ''
        },
        logisticsNo: {
            type: String,
            default: ''
        },
        orderID: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: ''
        }
    },
    watch:{
        dialogVisible:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
                if (val) {
                    this.init();
                }
            },
            deep:true //true 深度监听
        }
    },
    data() {
        return {
            dataList: [],
            expressName: ''
        }
    },
    methods: {
        closeFn() {
            this.expressName = '';
            this.dataList = [];
            this.$emit('fatherMethod');
        },
        init() {
            let params = new FormData();
            params.append('baseId', this.id);
            params.append('orderID', this.orderID);
            params.append('orderNo', this.orderNum);
            params.append('logisticsNo', this.logisticsNo);
            orderInfoList(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    this.dataList = res.list;
                    this.expressName = res.express.name;
                    this.dialogVisible_see_wl = true;
                }

            })
        }
    }
}
</script>

<style scoped>
.see-wl-ul {
    padding: 18px 20px 0;
    max-height: 400px;
    overflow-y: auto;
    cursor: pointer;
    margin-bottom: 15px
}
.see-wuliu-h5 {
    color: #606266;
    text-align: center;
    font-size: 14px!important;
    font-weight: 600;
    margin-bottom: 10px;
}
.see-wuliu-num {
    text-align: center;
    margin-bottom: 8px
}
.see-wl-ul li{
    list-style-type: disc;
    margin-bottom: 8px;
    line-height: 1.5rem
}
.dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center
}


</style>
