<?php
/**
 * API endpoints register.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

namespace SamplePlugin;

use SamplePlugin\Vendor\Singleton;
use SamplePlugin\PostType\Reviews;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Templates
 */
class Rest_API extends Singleton {

	/**
	 * Rest_API namespace.
	 *
	 * @const string
	 */
	const API_NAMESPACE = 'uit/v1';

	/**
	 * Rest_API init.
	 */
	protected function init() {
		add_action( 'rest_api_init', array( $this, 'register_api_endpoint' ) );
	}

	/**
	 * API endpoint registration.
	 */
	public function register_api_endpoint() {
		register_rest_route(
			self::API_NAMESPACE,
			'/reviews/',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'api_get_callback' ),
			)
		);

		register_rest_route(
			self::API_NAMESPACE,
			'/reviews/',
			array(
				'methods'  => 'POST',
				'callback' => array( $this, 'api_set_callback' ),
				'args'     => array(
					'_wpnonce' => array(
						'required' => true,
					),
					'name'     => array(
						'required' => true,
					),
					'text'     => array(
						'required' => true,
					),
				),
			)
		);
	}

	/**
	 * API endpoint callback. Returns a list of reviews.
	 *
	 * @param array $request request props.
	 *
	 * @return array list of reviews.
	 */
	public function api_get_callback( $request ) {
		$count  = isset( $request['count'] ) ? (int) $request['count'] : get_option( 'posts_per_page' );
		$offset = isset( $request['offset'] ) ? (int) $request['offset'] : 0;

		if ( $request['count'] > 50 ) {
			$count = 50;
		}

		if ( $request['count'] < 1 ) {
			$request['count'] = 1;
		}

		return Reviews::get_instance()->get( $count, $offset );
	}

	/**
	 * API endpoint callback. Set review.
	 *
	 * @param array $request request props.
	 *
	 * @return array status and messages.
	 */
	public function api_set_callback( $request ) {
		if ( ! wp_verify_nonce( $request['_wpnonce'], 'wp_rest' ) ) {
			return array(
				'status'   => 'fail',
				'messages' => array(
					'WP nonce is wrong.',
				),
			);
		}

		$validation = Reviews::get_instance()->validate( $request['name'], $request['text'] );

		if ( 'error' === $validation['status'] ) {
			return $validation;
		}

		Reviews::get_instance()->set( $request['name'], $request['text'] );

		return $validation;
	}
}
