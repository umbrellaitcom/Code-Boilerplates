<?php
/**
 * Gutenberg Reviews Slier component registration.
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
 * Class Reviews_Slider
 *
 * @package SamplePlugin\Components
 */
class Reviews_Slider extends Singleton {

	/**
	 * Block name for Gutenberg.
	 *
	 * @const string
	 */
	const BLOCK_NAME = 'reviews-slider';

	/**
	 * Block layout.
	 *
	 * @const string
	 */
	const TEMPLATE_NAME = 'review_slider';

	/**
	 * Init gutenberg component
	 */
	protected function init() {
		register_block_type(
			sprintf( 'uit-components/%s', self::BLOCK_NAME ),
			array(
				'editor_script'   => 'uit_components-js',
				'render_callback' => array( $this, 'callback' ),
				'attributes'      => array(
					'block_id'        => array(
						'type'    => 'string',
						'default' => 'not_set',
					),
					'slides_count'    => array(
						'type'    => 'number',
						'default' => get_option( 'posts_per_page' ),
					),
					'slides_per_view' => array(
						'type'    => 'number',
						'default' => 3,
					),
				),
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
		$attributes['slider_config'] = array(
			'slidesToShow' => $attributes['slides_per_view'],
			'infinite'     => false,
			'responsive'   => array(
				array(
					'breakpoint' => 1024,
					'settings'   => array(
						'slidesToShow' => round( (int) $attributes['slides_per_view'] / 2 ),
					),
				),
				array(
					'breakpoint' => 768,
					'settings'   => array(
						'slidesToShow' => round( (int) $attributes['slides_per_view'] / 3 ),
					),
				),
				array(
					'breakpoint' => 480,
					'settings'   => array(
						'slidesToShow' => 1,
					),
				),
			),
		);

		return Templates::get_instance()->get_template( self::TEMPLATE_NAME, $attributes );
	}
}
