<?php
/**
 * Latest reviews widget.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

namespace SamplePlugin\Widgets\Reviews;

use SamplePlugin\Templates;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Latest_Reviews_Widget
 *
 * @package SamplePlugin\Widgets\Reviews
 */
class Latest_Reviews_Widget extends \WP_Widget {

	/**
	 * Latest_Reviews_Widget constructor.
	 */
	public function __construct() {
		parent::__construct( 'reviews_widget', 'Latest Reviews' );
	}

	/**
	 * Font-end render method.
	 *
	 * @param array $args widget args.
	 * @param array $instance widget saved settings.
	 */
	public function widget( $args, $instance ) {
		$args['widget_title']   = apply_filters( 'widget_title', $instance['title'] );
		$args['posts_per_page'] = $instance['posts_per_page'];

		Templates::get_instance()->render_template( 'review_widget_view', $args );
	}

	/**
	 * Admin render method.
	 *
	 * @param array $instance widget saved settings.
	 */
	public function form( $instance ) {
		$args = array();

		$args['title']          = isset( $instance['title'] ) ? $instance['title'] : '';
		$args['posts_per_page'] = isset( $instance['posts_per_page'] ) ? $instance['posts_per_page'] : '';

		$args['title_field_id']   = $this->get_field_id( 'title' );
		$args['title_field_name'] = $this->get_field_name( 'title' );

		$args['posts_per_page_field_id']   = $this->get_field_id( 'posts_per_page' );
		$args['posts_per_page_field_name'] = $this->get_field_name( 'posts_per_page' );

		Templates::get_instance()->render_template( 'review_widget_form', $args );
	}

	/**
	 * Update widget settings.
	 *
	 * @param array $new_instance new settings.
	 * @param array $old_instance old settings.
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ) {
		$instance                   = array();
		$instance['title']          = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';
		$instance['posts_per_page'] = ( is_numeric( $new_instance['posts_per_page'] ) ) ? (int) $new_instance['posts_per_page'] : '5';
		return $instance;
	}
}
