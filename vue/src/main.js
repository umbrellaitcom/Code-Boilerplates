import Vue from 'vue';
import store from './store';
import { router } from './routes';
import App from './App.vue';
import VModal from 'vue-js-modal';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;

Vue.use(VModal);
Vue.use(Toasted);

new Vue({
  store,
	router,
  render: h => h(App),
}).$mount('#app');
