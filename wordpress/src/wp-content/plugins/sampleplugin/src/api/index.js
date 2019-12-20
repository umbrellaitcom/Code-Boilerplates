import axios from 'axios';
import qs from 'qs';
import { UIT_REST_URL, UIT_NONCE } from '../constants';

const reviewsCall = [];

export const getReviews = ( data, isUniq = false, requestName ) => {
	if ( requestName ) {
		if ( reviewsCall[ requestName ] && isUniq ) {
			reviewsCall[ requestName ].cancel();
		}

		reviewsCall[ requestName ] = axios.CancelToken.source();
	}

	return Promise
		.resolve(
			axios.get(
				`${ UIT_REST_URL }uit/v1/reviews/?${ qs.stringify( data ) }`,
				{ cancelToken: reviewsCall[ requestName ] ? reviewsCall[ requestName ].token : null }
			).catch( () => {
				return null;
			} )
		);
};

export const setReviews = ( data, isUniq = false, requestName ) => {
	if ( requestName ) {
		if ( reviewsCall[ requestName ] && isUniq ) {
			reviewsCall[ requestName ].cancel();
		}

		reviewsCall[ requestName ] = axios.CancelToken.source();
	}

	return Promise
		.resolve(
			axios.post(
				`${ UIT_REST_URL }uit/v1/reviews/`,
				{ ...data, _wpnonce: UIT_NONCE },
				{
					cancelToken: reviewsCall[ requestName ] ? reviewsCall[ requestName ].token : null,
					headers: {
						'X-WP-Nonce': UIT_NONCE,
					},
				}
			).catch( () => {
				return null;
			} )
		);
};
