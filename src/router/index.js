import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:resolve => require(['@/components/index'],resolve)
    },
    {
      path: '/list',
      name: 'list',
      component:resolve => require(['@/components/list'],resolve)
    },
    {
      path: '/setting',
      name: 'setting',
      component:resolve => require(['@/components/setting'],resolve)
    },
    {
      path: '/edit',
      name: 'edit',
      component:resolve => require(['@/components/edit'],resolve)
    },
    {
        path: "/authorize",
        name: "authorize",
        component: resolve => require(["@/components/authorize"], resolve)
    },
    {
        path: "/login",
        name: "login",
        component: resolve => require(["@/components/login"], resolve)
    }
  ]
})
