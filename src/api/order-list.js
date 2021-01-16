
import http from './public'
// 查询快递公司列表
export const logisticsExpressList = (params) => {
    return http.fetchPost('/logistics/express/list', params)
}

/**
 * @use 导入订单
 * @param params [fildes] platform = 1  userId
 * @returns {Promise | Promise<unknown>}
 */
export const logisticsImport = (params) => {
    return http.fetchProgress('/logistics/base/import', params)
}

/**
 * @use 导入列表
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const logisticsList = (params) => {
    return http.fetchPost('/logistics/base/list', params)
}
//导入明细  userId/id
export const logisticsDetail = (params) => {
    return http.fetchPost('/logistics/base/detail', params)
}

//导入修改
export const logisticsList1 = (params) => {
    return http.fetchPost('/logistics/base/list', params)
}

export const text = (params) => {
    return http.fetchPost('/logistics/base/list', params)
}
