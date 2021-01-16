<template>
    <div class="order-note">
        <el-dialog
            title="请填写订单信息"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="closeFn"
            >
            <div>
                <el-form  ref="ruleForm" label-width="100px">
                    <el-form-item label="订单号: ">
                        <div style="position: relative;width: 300px">
                            <el-input v-model.number="ruleForm.orderNum" size="small"/>
                        </div>
                    </el-form-item>
                    <el-form-item label="物流公司: ">
                        <div style="position: relative;width: 310px ;">
                            <el-select v-model="select_gs" placeholder="请选择物流公司" size="small">
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
                            <el-input v-model.number="ruleForm.orderDan" size="small"/>
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
import {orderAdd} from "../../api/edit";

export default {
    name: 'order-note',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        gsObjct: {
            type: Array,
            default: function () {
                return []
            }
        },
        orderID: {
            type: String,
            defaul: ''
        }
    },
    data() {
        return {
            ruleForm: {
                orderNum: '',
                orderDan: ''
            },
            select_gs: '',

        }
    },
    methods: {
        closeFn() {
            this.$emit('fatherMethod');
        },
        onSumbitOrder(){
            if (!this.ruleForm.orderNum) {
                this.$message.error('订单号不能为空')
                return false
            }

            if (!this.select_gs) {
                this.$message.error('物流公司不能为空')
                return false
            }

            if (!this.ruleForm.orderDan) {
                this.$message.error('物流单号不能为空')
                return false
            }


            let params = new FormData();
            params.append('baseId', this.orderID);
            params.append('orderNo', this.ruleForm.orderNum);
            params.append('logisticsNo', this.ruleForm.orderDan);
            params.append('expressId', this.select_gs);
            params.append('platform', 1);

            orderAdd(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    this.$message.success('填写订单信息成功');
                    this.$emit('confirmReq');
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
