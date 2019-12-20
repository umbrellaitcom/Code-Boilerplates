<?php
/**
 * Gutenberg Reviews Form component registration.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

namespace SamplePlugin\Components;

use SamplePlugin\Templates;
use SamplePlugin\Vendor\Singleton;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Reviews_Form
 *
 * @package SamplePlugin\Components
 */
class Reviews_Form extends Singleton {

	/**
	 * Block name for Gutenberg.
	 *
	 * @const string
	 */
	const BLOCK_NAME = 'reviews-form';

	/**
	 * Block layout.
	 *
	 * @const string
	 */
	const TEMPLATE_NAME = 'review_form';

	/**
	 * Reviews_Form init.
	 */
	protected function init() {
		register_block_type(
			sprintf( 'uit-components/%s', self::BLOCK_NAME ),
			array(
				'editor_script'   => 'uit_components-js',
				'render_callback' => array( $this, 'callback' ),
			)
		);
	}

	/**
	 * Render callback for gutenberg block.
	 *
	 * @param array $attributes block attributes.
	 *
	 * @return string block template.
	 */
	public function callback( $attributes ) {
		return Templates::get_instance()->get_template( self::TEMPLATE_NAME, $attributes );
	}
}
