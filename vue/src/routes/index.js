import Vue from 'vue'
import VueRouter from 'vue-router';
import OrderComponent from '../components/OrderComponent';

Vue.use(VueRouter);

let routes = [
	{ path: '/', component: OrderComponent },
];

export const router  = new VueRouter({
	mode: 'history',
	routes
})