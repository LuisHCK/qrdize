import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './db'
import { Button, Icon, Checkbox, Modal, Layout, Popconfirm, message, Select} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Button)
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(Modal)
Vue.use(Layout)
Vue.use(Popconfirm)
Vue.use(message)
Vue.use(Select)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
