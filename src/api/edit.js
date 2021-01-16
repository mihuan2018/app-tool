import http from './public'
// 订单列表
export const orderList = (params) => {
    return http.fetchPost('/logistics/order/list', params)
}

//订单编辑
export const orderBaseDetail = (params) => {
    return http.fetchPost('/logistics/base/detail', params)
}

//新增订单
export const orderAdd = (params) => {
    return http.fetchPost('/logistics/order/add', params)
}

export const orderDelete = (params) => {
    return http.fetchPost('/logistics/order/delete', params)
}

//修改订单
export const orderUpdate = (params) => {
    return http.fetchPost('/logistics/order/update', params)
}


//查看物流
export const orderInfoList = (params) => {
    return http.fetchPost('/logistics/info/list', params)
}

//订单数量
export const orderStatusNum = (params) => {
    return http.fetchPost('/logistics/order/statusNum', params)
}
