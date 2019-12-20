<?php
/**
 * Plugin Core.
 *
 * @package    WordPress
 * @subpackage Sample Plugin [UIT]
 */

namespace SamplePlugin;

use SamplePlugin\Widgets\Reviews\Latest_Reviews_Widget;
use SamplePlugin\Components\Reviews_Form;
use SamplePlugin\Components\Reviews_Slider;
use SamplePlugin\PostType\Reviews;
use SamplePlugin\Vendor\Singleton;
use SamplePlugin\Templates;
use SamplePlugin\Rest_API;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Core
 */
class Core extends Singleton {

	/**
	 * Init core.
	 */
	protected function init() {
		add_action( 'init', array( $this, 'load_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'load_admin_assets' ) );

		add_filter( 'block_categories', array( $this, 'add_blocks_category' ), 10, 2 );

		add_action( 'widgets_init', array( $this, 'widget_registration' ) );
	}

	/**
	 * Load frontend scripts and styles, and load classes.
	 */
	public function load_assets() {
		/**
		 * Init templates class.
		 */
		Templates::get_instance();

		/**
		 * Post types
		 */
		Reviews::get_instance();

		/**
		 * Gutenberg components
		 */
		Reviews_Form::get_instance();
		Reviews_Slider::get_instance();

		/**
		 * Rest api
		 */
		Rest_API::get_instance()->init();

		wp_enqueue_script(
			'sample-plugin-js',
			UIT_PLUGIN_URL . 'dist/front.js',
			array( 'jquery', 'wp-api' ),
			filemtime( UIT_PLUGIN_DIR . '/dist/front.js' ),
			true
		);

		wp_enqueue_style(
			'sample-plugin-css',
			UIT_PLUGIN_URL . 'dist/front.css',
			false,
			filemtime( UIT_PLUGIN_DIR . '/dist/front.css' )
		);

		wp_localize_script(
			'sample-plugin-js',
			'sample_plugin_info',
			array(
				'rest_api_url' => get_rest_url( null, '/' ),
				'nonce'        => wp_create_nonce( 'wp_rest' ),
			)
		);
	}

	/**
	 * Load admin part scripts and styles.
	 */
	public function load_admin_assets() {
		wp_enqueue_script(
			'uit_components-js',
			UIT_PLUGIN_URL . 'dist/admin.js',
			array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-editor', 'wp-api-fetch' ),
			filemtime( UIT_PLUGIN_DIR . '/dist/admin.js' ),
			true
		);

		wp_enqueue_style(
			'uit_components-css',
			UIT_PLUGIN_URL . 'dist/admin.css',
			array( 'wp-edit-blocks' ),
			filemtime( UIT_PLUGIN_DIR . '/dist/admin.css' )
		);

		wp_localize_script(
			'uit_components-js',
			'sample_plugin_info',
			array(
				'rest_api_url' => get_rest_url( null, '/' ),
				'nonce'        => wp_create_nonce( 'wp_rest' ),
			)
		);

		register_block_type(
			'uit/uit-components',
			array(
				'style'         => 'uit_components-css',
				'editor_script' => 'uit_components-js',
				'editor_style'  => 'uit_components-css',
			)
		);
	}

	/**
	 * Register custom gutenberg category
	 *
	 * @param array  $categories list of Gutenberg categories.
	 * @param object $post current post.
	 * @return array
	 */
	public function add_blocks_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'uit-components',
					'title' => 'UIT Components',
				),
			)
		);
	}

	/**
	 * Widget registration.
	 */
	public function widget_registration() {
		register_widget( Latest_Reviews_Widget::class );
	}
}
