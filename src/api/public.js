import axios from 'axios'
import Vue from 'vue'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// this.$cookie.set('id', res.user.id, 7);
axios.defaults.headers.common['userId'] = Vue.cookie.get('id') || '';
// axios.defaults.baseURL='http://172.16.1.218:8080';

axios.defaults.baseURL='http://api.chainfos.com/live/';
export default {
    fetchGet (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })

    },
    fetchPost (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                this.$message.error('网络异常');
                console.log(error);
                reject(error)
            })
        })
    },




}
