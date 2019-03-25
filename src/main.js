import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import './registerServiceWorker'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-design-icons/iconfont/material-icons.css'
import './db'

Vue.use(Vuesax)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
