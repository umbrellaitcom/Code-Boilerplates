import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';

const { apiFetch } = wp;

class Fetch extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			isLoading: true,
			error: null,
			response: null,
		};

		this.refetchData = this.refetchData.bind( this );
	}

	componentDidUpdate( prevProps ) {
		if ( ! isEqual( prevProps.apiParams, this.props.apiParams ) ) {
			this.refetchData();
		}
	}

	refetchData() {
		this.fetchData();
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const { api, onCompleted, onError, isWPFetch, apiParams, isUniq, requestName } = this.props;

		this.setState( {
			isLoading: true,
			error: null,
		} );

		let fetch;

		if ( isWPFetch ) {
			fetch = apiFetch( { path: api } );
		} else if ( apiParams ) {
			fetch = Promise.resolve( api( apiParams, isUniq, requestName ) );
		} else {
			fetch = Promise.resolve( api( isUniq, requestName ) );
		}

		fetch
			.then( data => {
				if ( Array.isArray( data ) && ! data.length ) {
					throw new Error( 'Not found' );
				}

				if ( onCompleted ) {
					onCompleted( data );
				}

				this.setState( {
					isLoading: false,
					response: data,
				} );
			} )
			.catch( error => {
				if ( onError ) {
					onError( error );
				}

				this.setState( {
					isLoading: false,
					error,
				} );
			} );
	}

	render() {
		const { isLoading, error, response } = this.state;
		const {
			children,
			isLoaderShown = true,
		} = this.props;

		return (
			<React.Fragment>
				{ isLoading && isLoaderShown && (
					<div>
						Loading...
					</div>
				) }
				{ ! isLoading &&
				error && ( <div> Something went wrong </div> ) }
				{ ! isLoading &&
				! error &&
				children( { response, refetchData: this.refetchData } ) }
			</React.Fragment>
		);
	}
}

Fetch.propTypes = {
	api: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	notFoundText: PropTypes.string,
	onCompleted: PropTypes.func,
	onError: PropTypes.func,
	apiParams: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	] ),
	children: PropTypes.func.isRequired,
	isLoaderShown: PropTypes.bool,
	isWPFetch: PropTypes.bool,
	onChangeTriggers: PropTypes.object,
	isUniq: PropTypes.bool,
	requestName: PropTypes.string,
};

export default Fetch;
