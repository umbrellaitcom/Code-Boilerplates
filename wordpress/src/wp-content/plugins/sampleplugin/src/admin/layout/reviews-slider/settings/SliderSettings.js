import React from 'react';
import PropTypes from 'prop-types';

const { PanelBody, RangeControl } = wp.components;
const { InspectorControls } = wp.editor;

class SliderSettings extends React.PureComponent {
	render() {
		const { attributes, setAttributes, onChangeSlidesCount } = this.props;
		const {
			slides_per_view,
			slides_count,
		} = attributes;

		return (
			<InspectorControls>
				<PanelBody title="Настройки слайдера">
					<RangeControl
						label="Slides per view"
						value={ slides_per_view }
						onChange={ ( value ) => {
							if ( onChangeSlidesCount ) {
								onChangeSlidesCount( value );
							}
							setAttributes( { slides_per_view: value } );
						} }
						min={ 1 }
						max={ 12 }
					/>
					<RangeControl
						label="Total slides count"
						value={ slides_count }
						onChange={ ( value ) => {
							if ( onChangeSlidesCount ) {
								onChangeSlidesCount( value );
							}
							setAttributes( { slides_count: value } );
						} }
						min={ 1 }
						max={ 100 }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

SliderSettings.propTypes = {
	attributes: PropTypes.object.isRequired,
	setAttributes: PropTypes.func.isRequired,
	onChangeSlidesCount: PropTypes.func,
};

export default SliderSettings;
