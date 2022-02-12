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
Vue.use(less)
Vue.use(ElementUI)
Vue.use(iView)
Vue.prototype.$moment = moment
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
