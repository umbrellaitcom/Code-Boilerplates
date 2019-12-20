<?php
/**
 * Plugin Name: Sample Plugin WordPress VIP [UIT - Reviews plugin]
 * Description: Reviews functionality.
 * Version: 1.0
 * Author: Umbrella IT
 * Author URI: https://umbrellait.com
 * Text Domain: uit
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'UIT_PLUGIN_DIR', __DIR__ );
define( 'UIT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'UIT_CORE_DIR', __DIR__ . '/core' );

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Basically it's should be using in your theme.
 * But just for example we are turning on the support of Gutenberg editor
 * in plugin. It's required for properly working of this sample.
 *
 * By default in VIP platform it's turned off.
 * https://wpvip.com/documentation/vip-go/loading-gutenberg/
 */
if ( function_exists( 'wpcom_vip_load_gutenberg' ) ) {
	wpcom_vip_load_gutenberg( true );
}

use SamplePlugin\Core;

Core::get_instance();
