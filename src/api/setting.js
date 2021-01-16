
import http from './public'

/**
 * @use 设置
 * @param params { pollTime: 轮询发货时间, expireTIME: 预警通知时间, userId: 用户Id } 时间s为单位 *60
 * @returns {Promise | Promise<unknown>}
 */
export const settingUpdate = (params) => {
    return http.fetchPost('/user/setting/update', params)
}
/**
 * @use 查询设置
 * @param params { userId: 用户Id }  请求头
 * @returns {Promise | Promise<unknown>}
 */
export const settingQuery = (params) => {
    return http.fetchPost('/user/setting/query', params)
}

