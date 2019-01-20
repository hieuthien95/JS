import Vue from 'vue'
import App from './App.vue'

import Chat from 'vue-beautiful-chat'
Vue.use(Chat)

new Vue({
  el: '#app',
  render: h => h(App)
})
