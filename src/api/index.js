import http from './public'
// 手机号获取用户ID
export const userLogin = (params) => {
    return http.fetchPost('/user/user/login', params)
}

export const baseCode = (params) => {
    return http.fetchGet('/base/code', params)
}

