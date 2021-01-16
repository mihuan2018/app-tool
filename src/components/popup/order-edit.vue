<template>
    <div class="order-note">
        <el-dialog
            title="请填写订单信息"
            :visible.sync="edit_dialogVisible"
            width="500px"
            :before-close="closeFn"
        >
            <div>
                <el-form  ref="ruleForm" label-width="100px">
                    <el-form-item label="订单号: ">
                        <div style="position: relative;width: 300px">
                            <el-input v-model.number="orderNum" size="small"/>
                        </div>
                    </el-form-item>
                    <el-form-item label="物流公司: ">
                        <div style="position: relative;width: 310px ;">
                            <el-select v-model="edit_select_gs" placeholder="请选择物流公司" size="small">
                                <el-option
                                    v-for="item in gsObjct"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="物流单号: ">
                        <div style="position: relative;width: 300px">
                            <el-input v-model.number="orderDan" size="small"/>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog-footer">
                <el-button @click="closeFn">取 消</el-button>
                <el-button type="primary" @click="onSumbitOrder">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {orderUpdate} from "../../api/edit";

export default {
    name: 'order-edit',
    props: {
        edit_dialogVisible: {
            type: Boolean,
            default: false
        },
        gsObjct: {
            type: Array,
            default: function () {
                return []
            }
        },
        editData: {
            type: Object,
            default() {
                return {}
            }
        },
        orderID: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default:''
        },
        edit_select_gs: {
            type: Number,
            default:0
        },
        orderNum: {  //订单号
            type: String,
            default: ''
        },
        orderDan: {
            type: String,
            default: ''
        },

    },
    data() {
        return {

        }
    },
    methods: {
        closeFn() {
            this.$emit('editMethod');
        },
        onSumbitOrder(){

            //判断有没有修改
            let { orderNo, logisticsNo, expressId} = this.editData;

            if (orderNo == this.orderNum && logisticsNo == this.orderDan && expressId == this.edit_select_gs) {
                this.$message.warning('你没有提交任何修改内容哦');
                return false
            }

            if (!this.orderNum) {
                this.$message.error('订单号不能为空')
                return false
            }

            if (!this.edit_select_gs) {
                this.$message.error('物流公司不能为空')
                return false
            }

            if (!this.orderDan) {
                this.$message.error('物流单号不能为空')
                return false
            }

            let params = new FormData();
            params.append('baseId', this.orderID);
            params.append('id', this.id);
            params.append('orderNo', this.orderNum);
            params.append('logisticsNo', this.orderDan);
            params.append('expressId', this.edit_select_gs);
            params.append('platform', 1);

            orderUpdate(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    this.$message.success('填写订单信息成功');
                    this.$emit('editMethod');
                }

            })
        }
    }
}
</script>

<style scoped>
.order-note .el-input{
    width: 300px !important;
}
.dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
}
.order-note  .el-select{
    width: 300px !important;
}
</style>
