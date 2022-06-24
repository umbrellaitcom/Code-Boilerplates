import Vue from 'vue'
import Vuex from 'vuex'
import { user, order } from './modules';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	modules: {
		user: user,
		order: order
	},
	strict: debug,
})