import Vue from 'vue'
// 引入elementui的组件 和 样式
import ElementUI from 'element-ui'; // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
// 引入顶级组件 App.vue
import App from './App.vue'
// 引入路由文件
import router from './router'

import axios from 'axios'

import {Message} from 'element-ui';

//直接把axious挂载到vue原型上
Vue.prototype.axios = axios;
//全局路由首位.拦截所有路由
router.beforeEach((to, from ,next) => {
  //获取token
  const token = window.localStorage.getItem('token')
  if (token) {
    next();
  } else {
    if (to.path =='/login'){
      next();
    }else {
      Message.error("请登陆以后再操作!")
      return next("/login")
    }
  }
  next();
})

//引入公用样式
import '@/styles/common.less';

// 注册（使用）elementui
Vue.use(ElementUI);

// Vue.use(iView);
//  阻止生产提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
