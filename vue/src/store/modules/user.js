import { userApi } from '../../api';
import * as ACTIONS from '../../constants/actions';
import * as MUTATIONS from '../../constants/mutations';
import {JWT_TOKEN_LS_KEY} from "../../constants/store";
import {getItem,removeItem} from "../../helpers/store";

const loggedInUser = getItem(JWT_TOKEN_LS_KEY);
const state = loggedInUser
	? {
		status: {
			loggedIn: true
		},
		user: loggedInUser,
		error: null,
	}
	: {status: {}, user: null, error: null};

const getters = {
	isLoggedIn: state => state.status.loggedIn
}

const actions = {
	[ACTIONS.USER.LOGIN]({commit}, {username, password}) {
		commit(MUTATIONS.USER.LOGIN_REQUEST, {username});

		userApi.login(username, password)
			.then(
				data => {
					commit(MUTATIONS.USER.LOGIN_SUCCESS, data);
				})
			.catch((error) => {
					commit(MUTATIONS.USER.LOGIN_FAILURE, error);
				});
	},
	[ACTIONS.USER.LOGOUT]({commit}) {
		removeItem(JWT_TOKEN_LS_KEY);
		commit(MUTATIONS.USER.LOGOUT);
	},
	[ACTIONS.USER.REGISTER]({commit}, user) {
		commit(MUTATIONS.USER.REGISTER_REQUEST);

		userApi.register(user)
			.then(
				user => {
					commit(MUTATIONS.USER.REGISTER_SUCCESS, user);
				},
				error => {
					commit(MUTATIONS.USER.REGISTER_FAILURE, error);
				}
			);
	}
};

const mutations = {
	[MUTATIONS.USER.LOGIN_REQUEST](state, user) {
		state.status = {loggingIn: true};
		state.user = user;
		state.error = null;
	},
	[MUTATIONS.USER.LOGIN_SUCCESS](state, user) {
		state.status = {loggedIn: true};
		state.user = user;
		state.error = null;
	},
	[MUTATIONS.USER.LOGIN_FAILURE](state, error) {
		state.status = {};
		state.user = null;
		state.error = error
	},
	[MUTATIONS.USER.LOGOUT](state) {
		state.status = {};
		state.user = null;
		state.error = null
	},
	[MUTATIONS.USER.REGISTER_REQUEST](state) {
		state.status = {registering: true};
	},
	[MUTATIONS.USER.REGISTER_SUCCESS](state, user) {
		state.status = {};
		state.user = user;
	},
	[MUTATIONS.USER.REGISTER_FAILURE](state, error) {
		state.status = {};
		state.error = error;
	}
};

export const user = {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
};