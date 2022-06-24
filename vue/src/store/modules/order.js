import {orderApi} from '../../api';
import * as ACTIONS from '../../constants/actions';
import * as MUTATIONS from '../../constants/mutations';

const state = {
	status: null,
	error: null,
	menu: {
		firstCourse: [],
		secondCourse: [],
		garnish: [],
		salad: [],
	}
};

const getters = {
	firstCourse: state => state.menu.firstCourse,
	secondCourse: state => state.menu.secondCourse,
	garnish: state => state.menu.garnish,
	salad: state => state.menu.salad,
};

const actions = {
	[ACTIONS.ORDER.GET_MENU]({commit}) {
		commit(MUTATIONS.ORDER.GET_MENU_REQUEST);

		orderApi.getMenu()
			.then(
				data => {
					commit(MUTATIONS.ORDER.GET_MENU_SUCCESS, data);
				})
			.catch((error) => {
				commit(MUTATIONS.ORDER.GET_MENU_FAILURE, error);
			});
	},
	[ACTIONS.ORDER.ORDER]({commit}, {data}) {
		commit(MUTATIONS.ORDER.ORDER_REQUEST);

		orderApi.sendOrder(data)
			.then(
				data => {
					commit(MUTATIONS.ORDER.ORDER_SUCCESS, data);
				})
			.catch((error) => {
				commit(MUTATIONS.ORDER.ORDER_FAILURE, error);
			});
	}
};

const mutations = {
	[MUTATIONS.ORDER.ORDER_REQUEST](state) {
		state.status = {sendingOrder: true};
	},
	[MUTATIONS.ORDER.ORDER_SUCCESS](state) {
		state.status = {};
		state.error = null;
	},
	[MUTATIONS.ORDER.ORDER_FAILURE](state, error) {
		state.status = {};
		state.error = error;
	},
	[MUTATIONS.ORDER.GET_MENU_REQUEST](state) {
		state.status = {requestingMenu: true};
	},
	[MUTATIONS.ORDER.GET_MENU_SUCCESS](state, data) {
		state.status = {};
		state.menu = data;
		state.error = null;
	},
	[MUTATIONS.ORDER.GET_MENU_FAILURE](state, error) {
		state.status = {};
		state.error = error;
	},
};



export const order = {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
};