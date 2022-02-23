import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/elementUI'
import iView from 'iview';
import 'iview/dist/styles/iview.css'; 
import moment from 'moment'
import VueLazyload from 'vue-lazyload'
import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.Clipboard = clipboard;
Vue.use(less)
Vue.use(ElementUI)
Vue.use(iView)

Vue.use(VueLazyload)
// 全局懒加载图片指令
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
Vue.prototype.$moment = moment
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
