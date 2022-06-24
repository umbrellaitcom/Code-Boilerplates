import {get, post} from "../helpers/request";

export const orderApi = {
	getMenu,
	sendOrder,
};

function getMenu () {
	return get('menu/item/list')
		.then(response => {
			return response.data
		})
		.catch(() => {
			// Mock response
			let axiosResponse = {
				// `data` is the response that was provided by the server
				data: {
						firstCourse: ['борщ', 'харчо', 'лапша'],
						secondCourse: ['борщ', 'харчо', 'лапша'],
						garnish: ['борщ', 'харчо', 'лапша'],
						salad: ['борщ', 'харчо', 'лапша'],
				},

				status: 200,

				statusText: 'OK',

				headers: {},

				config: {},

				request: {}

			};

			return axiosResponse.data;
		})
}

function sendOrder (data) {
	return post('order/send', data)
		.then(response => {
			return response.data
		})
		.catch(() => {
			// Mock response
			let axiosResponse = {
				data: {
					items: ['борщ', 'харчо', 'лапша']
				},

				status: 200,

				statusText: 'OK',

				headers: {},

				config: {},

				request: {}

			};

			return axiosResponse.data;
		})
}
