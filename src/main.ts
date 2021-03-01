import Vue from 'vue'
import './plugins/axios'
import './plugins/vue-file-pond'
import './plugins/toast'
// import './mock'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './security'

Vue.config.productionTip = false

export const mockEnabled = true

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
