import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false; //生成生产提示
import Navbar from './components/common/navbar';
import sidebar from './components/common/sidebar';
import VueCookie from "vue-cookie";

Vue.component("Navbar", Navbar);
Vue.component("sidebar", sidebar);
Vue.use(VueCookie)

Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.filter('dateFormatTable', function(originVal) {
    if(!originVal) return '';
    const dt = new Date(originVal1.time)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
