import {post} from '../helpers/request';
import {decodeJWTToken, saveJWTToken} from "../helpers/jwtToken";
import {AppResponseError} from "../helpers/errors";

export const userApi = {
	login,
	register,
};

function login(username, password) {
	return post('login', {data: JSON.stringify({username, password})})
		.then(response => {
			let decodedToken = decodeJWTToken(response.data);
			if( !decodedToken ) throw new AppResponseError();
			saveJWTToken(response.data);
		})
		.catch(() => {
			// Mock response
			let axiosResponse = {
				data: {
					access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
					refresh_token: 'asdad'
				},

				status: 200,

				statusText: 'OK',

				headers: {},

				config: {},

				request: {}

			};
			let decodedToken = decodeJWTToken(axiosResponse.data);
			if( !decodedToken ) throw new AppResponseError();
			saveJWTToken(axiosResponse.data);
			return decodedToken;
		})
}


function register(user) {
	return post('register', JSON.stringify(user)).then();
}
