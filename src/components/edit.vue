<template>
    <div class="app-body">
        <sidebar></sidebar>
        <div class="app-main">
            <Navbar></Navbar>
            <div class="app-main-body">
                <div class="edit">
                    <div class="e-main">
                        <div class="e-main-top">
                            <div>
                                <el-input
                                    placeholder="订单号/物流单号"
                                    prefix-icon="el-icon-search"
                                    size="small"
                                    @input="initInput"
                                    v-model="select_number">
                                </el-input>
                            </div>
                            <div>
                                <label style="width: 130px; text-align: center">物流公司: </label>
                                <el-select v-model="select_gs" placeholder="请选择物流公司" size="small" @change="init">
                                    <el-option
                                        v-for="item in gsObjct"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <label style="width: 130px; text-align: center">是否揽收: </label>
                                <el-select v-model="select_is" size="small" @change="init">
                                    <el-option v-for="item in lsObjct" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                <label  style="width: 130px; text-align: center">抖音发货状态: </label>
                                <el-select v-model="select_status"  size="small" @change="init">
                                    <el-option v-for="item in fhStatusObjct" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="e-main-creat">
                            <el-button type="primary" size="small" @click="onCreat" style="width: 100px">创建</el-button>
                            <el-button type="warning" size="small" @click="onClear" style="width: 100px">清空筛选条件</el-button>
                            <orderNote :dialogVisible="order_note_dialogVisible" :orderID="orderID" @fatherMethod="fatherMethod" @confirmReq="confirmReq" :gsObjct="gsObjct"></orderNote>
                        </div>
                        <template>
                            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                                <el-tab-pane :label="'全部('+ orderStausNum.all +')'" name="first">
                                    <editList :dataList="dataList" :totalCount="totalCount" :orderID="orderID" @onDelete="onDelete" :gsObjct="gsObjct" @init="init"></editList>
                                </el-tab-pane>
                                <el-tab-pane :label="'待发货('+ orderStausNum.dai +')'" name="second">
                                    <editList :dataList="dataList" :totalCount="totalCount" :orderID="orderID" @onDelete="onDelete" :gsObjct="gsObjct" @init="init"></editList>
                                </el-tab-pane>
                                <el-tab-pane :label="'已发货('+ orderStausNum.fahuo +')'" name="third">
                                    <editList :dataList="dataList" :totalCount="totalCount" :orderID="orderID" @onDelete="onDelete" :gsObjct="gsObjct" @init="init"></editList>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                        <div class="m-nian-footer">
                            <router-link to='/list'> <el-button style="width: 110px; margin-right: 10px" @click="">返回列表</el-button></router-link>
                            <el-button type="primary" style="width: 110px" @click="onFaHu(1)">发货</el-button>
                            <el-button type="danger" style="width: 110px" @click="onFaHu(0)">停止发货</el-button>
                            <!-- 如果点击了已发货 则该按钮为发货中，不管是否退出  只要没有完成所有订单的发货 ，并且未点击停止发货则一直进行轮询-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {logisticsExpressList, logisticsList} from '../api/order-list.js'
import editList from './edit-list'
import orderNote from './popup/order-note'
import { orderList, orderBaseDetail, orderDelete, orderStatusNum} from '../api/edit.js'
import utils from "../utils/tools.js";
export default {
    name: 'edit',
    components: {
        editList,
        orderNote
    },
    data() {
        return {
            order_note_dialogVisible: false,

            select_number: '',
            select_gs: '',
            select_is: '',
            select_status: '',
            gsObjct: [{
              name: '选项1',
              id: 1
            }],
            lsObjct: [{
                name: '是',
                id: 1
            },{
                name: '否',
                id: 0
            }
            ],
            fhStatusObjct: [{
                name: '发货',
                id: 1
            },{
                name: '未发货',
                id: 0
            }],
            activeName: 'first',
            dataList: [],
            orderID: '',

            status: '',
            orderStausNum: { all: 0, dai: 0, fahuo: 0},
            totalCount: 0,
            page: 1
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if( vm.$cookie.get('id')){
                vm.orderID = vm.$route.query.id.toString();
                vm.onResExpressList();
                vm.init();
                vm.onStatusNum();
            } else {
                vm.$message.warning('用户已失效');
                next('/');
            }
        })
    },
    created() {


    },
    methods: {
        onOrderInputs() {
          console.log(1);
        },
        init() {
            arguments[0] ? this.page = arguments[0] : null;
            let params = new FormData();
            params.append('page', this.page);
            params.append('limit', 10);
            params.append('baseId', this.orderID);
            params.append('no',this.select_number);
            params.append('expressId', this.select_gs);  //快递公司ID
            params.append('isAccept', this.select_is);   //是否揽收 1是 0 否
            params.append('isPlatform', this.select_status); //平台发货状态  1发货 0未发货
            params.append('status', this.status)
            orderList(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    res.list.forEach( (item)=> {
                        item.isPlatform == 0 ? item.isPlatform = '未发货' :  item.isPlatform = '已发货';
                        item.isAccept == 0 ? item.cheack = false : item.cheack = true;
                        item.isAccept == 0 ? item.isAccept = '否' : item.isAccept = '是';
                    })
                    this.dataList = res.list;
                    this.totalCount = res.totalCount;
                }
            })
        },
        initInput: utils.debounce(function() {
                this.init();
        }),
        onClear() {
            this.select_number = '';
            this.select_gs = '';
            this.select_is = '';
            this.select_status = '';
            this.init();
        },
        onCreat() {
            this.order_note_dialogVisible = true;
        },
        handleClick(tab, event) {
            if (tab.index == 0) {
                this.status = '';
                this.init();
            } else if (tab.index == 1) {
                this.status = 0;
                this.init();
            }else{
                this.status = 1;
                this.init();
            }
        },
        fatherMethod() {
            this.order_note_dialogVisible = false;
        },
        confirmReq() {
            this.order_note_dialogVisible = false;
            this.init();
        },
        onResExpressList() {
            logisticsExpressList().then(res => {
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    this.gsObjct = res.list;
                }
            })
        },
        onStatusNum() {
            let params = new FormData();
            params.append('baseId', this.orderID);
            orderStatusNum(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    let allNum = 0;
                    res.list.forEach( (item)=> {
                        allNum += item.num;
                        item.status == 0 ?  this.orderStausNum.dai = item.num : null;
                        item.status == 1 ?  this.orderStausNum.fahuo = item.num : null;

                    })
                    this.orderStausNum.all = allNum;
                }
            })
        },
        onFaHu() {
            let params = new FormData();
            params.append('id', this.orderID);
            params.append('autoLogistics', arguments[0]);
            orderBaseDetail(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    if (arguments[0] == 0) {
                        this.$message.success('取消自动发货成功')
                    }

                    if(arguments[0] == 1) {
                        this.$message.success('自动发货成功')
                    }
                }
            })
        },
        onDelete(id) {
            let params = new FormData();
            params.append('baseId', this.orderID);
            params.append('id', arguments[0]);
            orderDelete(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$message.error(res.message);
                    return false;
                } else {
                    this.$message.success('删除成功');
                    this.init();
                }
            })
        }
    }
}
</script>
<style scoped>

.e-main-top {
  display: flex;

}

.e-main-top>div {display: flex; align-items: center}

.e-main-creat {display: flex; justify-content: flex-start; margin: 30px 0}
.m-nian-footer {display: flex; justify-content: center; align-items: center ; margin-top: 60px}
.edit {
    background-color: #fff;
    width: 99%;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

</style>
