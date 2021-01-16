<template>
    <div class="edit-list">
        <template>
            <el-table
                :data="dataList"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="orderNo"
                    label="订单号"
                    >
                </el-table-column>
                <el-table-column
                    prop="logisticsNo"
                    label="物流单号"
                    >
                </el-table-column>
                <el-table-column
                    prop="expressName"
                    label="物流公司">
                </el-table-column>
                <el-table-column
                    prop="isAccept"
                    label="是否揽收">
                </el-table-column>
                <el-table-column
                    prop="isPlatform"
                    label="抖音发货状态">
                </el-table-column>
                <el-table-column
                    prop="deliverTime"
                    label="发货时间">
                    <template slot-scope="scope">{{ scope.row.deliverTime | dateFormatTable }}</template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="280">
                    <template slot-scope="scope">
                        <!-- 已揽收状态下的不能编辑和删除  编辑和删除按钮置灰-->
                        <el-button plain size="small" @click="seeWuliu(scope.row.id, scope.row.logisticsNo, scope.row.orderNo)">查看物流</el-button>
                        <el-button plain size="small" :disabled="scope.row.cheack" @click="onEdit(scope.row.id, scope.row.orderNo, scope.row.logisticsNo, scope.row.expressId)">编辑</el-button>
                        <el-button plain size="small" :disabled="scope.row.cheack" @click="orderDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="app-body-pagination">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </template>
        <seeWl
            :dialogVisible="dialogVisible_see_wl"
            :orderID="orderID"
            :id="seeWuliuData.id"
            :logisticsNo="seeWuliuData.logisticsNo"
            :orderNum="seeWuliuData.orderNo"
            @fatherMethod="fatherMethod"></seeWl>
        <orderedit :id="order_edit_id" :orderID="orderID"
                   :orderNum="editData.orderNo"
                   :orderDan="editData.logisticsNo"
                   :edit_select_gs="editData.expressId"
                   :edit_dialogVisible="edit_dialogVisible"
                   :gsObjct="gsObjct"
                   :editData="editData"
                   @editMethod="editMethod"></orderedit>

    </div>
</template>
<script>
import seeWl from './popup/see-wl';
import orderedit from './popup/order-edit'
export default {
    name: 'editList',
    components: {
        seeWl,
        orderedit
    },
    props: {
        dataList: {
            type: Array,
            default: function () {
                return []
            }
        },
        gsObjct: {
            type: Array,
            default: function () {
                return []
            }
        },
        orderID: {
            type: String,
            default: ''
        },
        totalCount: {
            type: Number,
            default: 0
        }

    },
    data() {
        return {
            dialogVisible_see_wl: false,
            edit_dialogVisible: false,
            tableData: [],
            editData:{
                orderNo: '',
                logisticsNo: '',
                expressId: 0
            },
            order_edit_id: '',
            seeWuliuData: {
                logisticsNo: '',
                orderNo: '',
                id:''
            },
            totalCountone: 0
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.$emit('init', val)
        },
        onEdit(id, orderNo, logisticsNo, expressId){
            this.editData = { orderNo: orderNo, logisticsNo: logisticsNo, expressId: parseInt(expressId) };
            this.edit_dialogVisible = true;
            this.order_edit_id = id.toString();
        },
        seeWuliu(id, logisticsNo, orderNo) {
            this.seeWuliuData = { logisticsNo: logisticsNo, orderNo: orderNo, id: id.toString() };
            this.dialogVisible_see_wl = true;
        },
        fatherMethod() {
            this.dialogVisible_see_wl = false;
        },
        editMethod() {
            this.edit_dialogVisible = false;
            this.$emit('init')
        },
        orderDelete(id) {
            this.$confirm('你确认删除该订单吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$emit('onDelete',id)
            }).catch(() => {
                //几点取消的提示
            });

        }
    }
}
</script>
<style scoped>
.edit-list {
    width: 100%;
}
.app-body-pagination{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 20px 0 0;

}
</style>
