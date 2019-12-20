import { SliderIcon } from '../../icons';
import { SliderEdit } from './settings';

const { registerBlockType } = wp.blocks;

registerBlockType( 'uit-components/reviews-slider', {
	title: 'Reviews Slider',
	icon: SliderIcon,
	category: 'uit-components',
	edit: ( data ) => {
		const { setAttributes, attributes } = data;

		return (
			<SliderEdit
				attributes={ attributes }
				setAttributes={ setAttributes }
				blockId={ data.clientId }
			/>
		);
	},
	save: () => {
		return null;
	},
} );
