import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
          name: 'home',
          component: () => import('./views/Index/Index.vue'),
          children: [
            {
              path: '',
              name: 'home',
              component: () => import('./views/Home/Home.vue')
            },
            {
              path: '/accountmanage',
              name: 'accountmanage',
              component: () => import('./views/AccountManage/AccountManage.vue')
            },
            {
              path: '/accountadd',
              name: 'accountadd',
              component: () => import('./views/Accountadd/Accountadd.vue')
            },
            {
              path: '/passwordmodify',
              name: 'passwordmodify',
              component: () => import('./views/PasswordModify/PasswordModify.vue')
            },
            {
              path: '/goodsmanage',
              name: 'goodsmanage',
              component: () => import('./views/GoodsManage/GoodsManage.vue')
            },
            {
              path: '/goodsadd',
              name: 'goodsadd',
              component: () => import('./views/GoodsAdd/GoodsAdd.vue')
            },
            {
              path: '/salestatistics',
              name: 'salestatistics',
              component: () => import('./views/saleStatistics/saleStatistics.vue')
            },
          ]
          
    },
    {
      path: '/login',  // 路径
      name: 'login', // 名字
      component: () => import('./views/Login/Login.vue')  // 引入登录组件
    }
  ]
})
