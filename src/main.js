import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import VueAxios from 'vue-axios';
import moment from 'moment';

Vue.prototype.$moment = moment

Vue.config.productionTip = false

Vue.use(VueAxios, axios); // Utiliza el módulo de Axios

axios.defaults.baseURL = 'http://localhost:5000'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
