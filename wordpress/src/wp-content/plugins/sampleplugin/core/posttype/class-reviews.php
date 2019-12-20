<?php
/**
 * Custom post type declaration.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

namespace SamplePlugin\PostType;

use SamplePlugin\Vendor\Singleton;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Reviews
 *
 * @package SamplePlugin\PostType
 */
class Reviews extends Singleton {

	/**
	 * Registered post type name.
	 *
	 * @const string
	 */
	const POST_TYPE_NAME = 'reviews';

	/**
	 * Reviews init.
	 */
	protected function init() {
		add_filter( 'use_block_editor_for_post_type', array( $this, 'disable_gutenberg' ), 10, 2 );

		register_post_type(
			self::POST_TYPE_NAME,
			array(
				'label'               => 'Reviews',
				'labels'              => array(
					'name'               => 'Reviews',
					'singular_name'      => 'Review',
					'add_new'            => 'Add review',
					'add_new_item'       => 'Review adding',
					'edit_item'          => 'Review editing',
					'new_item'           => 'New review',
					'view_item'          => 'View review',
					'search_items'       => 'Look for review',
					'not_found'          => 'Not found',
					'not_found_in_trash' => 'Not found in the basket',
					'parent_item_colon'  => '',
					'menu_name'          => 'Reviews',
				),
				'description'         => '',
				'public'              => true,
				'publicly_queryable'  => false,
				'exclude_from_search' => true,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_admin_bar'   => true,
				'show_in_nav_menus'   => false,
				'show_in_rest'        => true,
				'menu_icon'           => 'dashicons-index-card',
				'hierarchical'        => false,
				'supports'            => array( 'title', 'editor' ),
				'taxonomies'          => array(),
				'has_archive'         => false,
				'query_var'           => true,
			)
		);
	}

	/**
	 * Validate field before adding review.
	 *
	 * @param string $name reviewer name.
	 * @param string $text review content.
	 *
	 * @return array with status ( success|error ) and array of messages.
	 */
	public function validate( $name, $text ) {
		$response = array(
			'status'   => 'success',
			'messages' => array(),
		);

		if ( empty( $name ) ) {
			$response['status']     = 'error';
			$response['messages'][] = 'Name field can\'t be empty.';
		} else {
			preg_match( '/[^<^>]*/', $name, $name_matches );

			if ( $name_matches[0] !== $name ) {
				$response['status']     = 'error';
				$response['messages'][] = 'Name should contains only letters, numbers and spaces.';
			}

			if ( strlen( $name ) > 100 ) {
				$response['status']     = 'error';
				$response['messages'][] = 'Name should be less then 100 symbols.';
			}
		}

		if ( empty( $text ) ) {
			$response['status']     = 'error';
			$response['messages'][] = 'Text field can\'t be empty.';
		} else {
			preg_match( '/[^<^>]*/', $text, $text_matches );

			if ( $text_matches[0] !== $text ) {
				$response['status']     = 'error';
				$response['messages'][] = 'Text shouldn\'t contains symbols < and >.';
			}

			if ( strlen( $name ) > 5000 ) {
				$response['status']     = 'error';
				$response['messages'][] = 'Text should be less then 5000 symbols.';
			}
		}

		return $response;
	}

	/**
	 * Get reviews.
	 *
	 * @param int $post_count count of posts.
	 * @param int $offset offset of posts.
	 *
	 * @return array list of reviews.
	 */
	public function get( $post_count, $offset = 0 ) {
		$query = new \WP_Query(
			array(
				'post_type'           => self::POST_TYPE_NAME,
				'post_status'         => 'publish',
				'offset'              => (int) $offset,
				'posts_per_page'      => (int) $post_count,
				'suppress_filters'    => false,
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
				'order_by'            => 'post_date',
				'order'               => 'DESC',
			)
		);

		return $query->posts;
	}

	/**
	 * Added new review.
	 *
	 * @param string $post_title name of reviewer.
	 * @param string $post_content review content.
	 */
	public function set( $post_title, $post_content ) {

		/**
		 * It's unsafe set posts with status publish
		 * without any moderation. But for example it's ok :)
		 */
		wp_insert_post(
			array(
				'post_title'   => sanitize_text_field( $post_title ),
				'post_content' => sanitize_textarea_field( $post_content ),
				'post_type'    => self::POST_TYPE_NAME,
				'post_status'  => 'publish',
				'post_author'  => get_current_user_id(),
			)
		);
	}

	/**
	 * Disable gutenberg editor.
	 *
	 * @param bool   $current_status on\off gutenberg.
	 * @param string $post_type current post type.
	 *
	 * @return bool
	 */
	public function disable_gutenberg( $current_status, $post_type ) {
		return self::POST_TYPE_NAME !== $post_type;
	}
}
