<?php
/**
 * Class Singleton.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

namespace SamplePlugin\Vendor;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Singleton
 *
 * @package SamplePlugin\Vendor
 */
class Singleton {
	/**
	 * Array with instances of classes.
	 *
	 * @var array
	 */
	private static $instances = array();

	/**
	 * Is not allowed to call from outside to prevent from creating multiple instances,
	 * to use the singleton, you have to obtain the instance from Singleton::getInstance() instead.
	 */
	protected function __construct() {
		$this->init();
	}

	protected function init() {}

	/**
	 * Prevent the instance from being cloned (which would create a second instance of it).
	 */
	protected function __clone() { }

	/**
	 * Prevent from being unserialized (which would create a second instance of it).
	 *
	 * @throws \Exception Cannot unserialize a singleton.
	 */
	public function __wakeup() {
		throw new \Exception( 'Cannot unserialize a singleton.' );
	}

	/**
	 * Gets the instance via lazy initialization (created on first usage).
	 */
	final public static function get_instance() {
		$cls = get_called_class();

		if ( ! isset( static::$instances[ $cls ] ) ) { // phpcs:ignore
			static::$instances[ $cls ] = new static(); // phpcs:ignore
		}

		return static::$instances[ $cls ]; // phpcs:ignore
	}
}
