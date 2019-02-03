import Vue from 'vue'
// 引入elementui的组件 和 样式
import ElementUI from 'element-ui'; // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
// 引入顶级组件 App.vue
import App from './App.vue'
// 引入路由文件
import router from './router'

import axios from 'axios'

//直接把axious挂载到vue原型上
Vue.prototype.axios = axios;

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
