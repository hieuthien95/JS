// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from './rounters.js'

window.axios = require('axios');

Vue.config.productionTip = false

import store from './store/store'



// viet filter cho output
Vue.filter('toUppercaseFilter', function(text) {
	return text.toUpperCase();
});
Vue.filter('toLowercaseFilter', function(text) {
	return text.toLowerCase();
});

// Vue.http.headers.common['Content-Type'] = 'application/json'
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
// Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'
// Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'

// DEMO Rounter
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

/* // DEMO componet
import AMyComponentParent from '@/components/demo-component/a-MyComponentParent'
import BMyComponentParent from '@/components/demo-component/b-MyComponentParent'

new Vue({
  el: '#a-component-list-remove-it',
  template: '<AMyComponentParent/>',
  components: { AMyComponentParent }
})

new Vue({
	el: "#b-component-meta-menu",
	render: h => h( BMyComponentParent ),
	components: { BMyComponentParent }
});
*/			
