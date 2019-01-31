import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
          name: 'home',
          component: () => import('./views/Index/Index.vue')
    },
    {
      path: '/login',  // 路径
      name: 'login', // 名字
      component: () => import('./views/Login/Login.vue')  // 引入登录组件
    }
  ]
})
