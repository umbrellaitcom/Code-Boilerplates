import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { isEmpty } from 'lodash';

import SliderSettings from './SliderSettings';

import { Fetch } from '../../../components';
import { getReviews } from '../../../../api';

const { Fragment } = wp.element;

class SliderEdit extends React.PureComponent {
	componentDidMount() {
		const { setAttributes, blockId } = this.props;

		setAttributes( { block_id: blockId } );
	}

	renderSlides( posts ) {
		const slides = [];

		posts.map( ( item, index ) => slides.push(
			<div className="reviews-slider__card__wrapper" key={ `slide-${ index }` }>
				<div className="reviews-slider__card">
					<span className="reviews-slider__card__title">{ item[ 'post_title' ] }</span>
					<div className="slide-content">
						{ item[ 'post_content' ] }
					</div>
				</div>
			</div>
		) );

		return slides;
	}

	renderSlider( response ) {
		if ( ! response ) {
			return 'No reviews.';
		}

		const { data: posts } = response;
		const { attributes } = this.props;
		let { slides_per_view } = attributes;

		slides_per_view = slides_per_view < 1 ? 1 : slides_per_view;
		slides_per_view = slides_per_view > 12 ? 12 : slides_per_view;

		const params = {
			slidesToShow: slides_per_view,
			infinite: false,
		};

		if ( ! isEmpty( posts ) ) {
			return (
				<Slider { ...params }>
					{ this.renderSlides( posts ) }
				</Slider>
			);
		}
	}

	render() {
		const { attributes, setAttributes, blockId } = this.props;
		const { slides_count } = attributes;

		return (
			<Fragment>
				<SliderSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<Fetch api={ getReviews } apiParams={ { count: slides_count } } isUniq requestName={ blockId }>
					{ ( { response } ) => this.renderSlider( response ) }
				</Fetch>
			</Fragment>
		);
	}
}

SliderEdit.propTypes = {
	attributes: PropTypes.object.isRequired,
	setAttributes: PropTypes.func.isRequired,
};

export default SliderEdit;
