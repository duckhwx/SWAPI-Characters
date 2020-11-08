import Vue from 'vue';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
