import { FormIcon } from '../../icons';

const { registerBlockType } = wp.blocks;

import edit from './settings/edit';

registerBlockType( 'uit-components/reviews-form', {
	title: 'Reviews Form',
	icon: FormIcon,
	category: 'uit-components',

	edit: edit,
	save: () => {
		return null;
	},
} );
