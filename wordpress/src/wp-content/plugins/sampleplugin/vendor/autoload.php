<?php
/**
 * Autoloader for PHP classes inside plugin.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

function sp_autoloader( $class ) {

	// project-specific namespace prefix
	$prefix = 'SamplePlugin\\';

	// base directory for the namespace prefix
	$base_dir = UIT_CORE_DIR . '/';

	// does the class use the namespace prefix?
	$len = strlen( $prefix );
	if ( strncmp( $prefix, $class, $len ) !== 0 ) {
		// no, move to the next registered autoloader
		return;
	}

	// get the relative class name
	$relative_class = substr( $class, $len );

	// replace the namespace prefix with the base directory, replace namespace
	// separators with directory separators in the relative class name, append
	// with .php
	$relative_class = strtolower( str_replace( '_', '-', $relative_class ) );
	$file           = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';

	// if the file exists, require it
	if ( file_exists( $file ) ) {
		require $file;
	}

	preg_match( '/[^\/]*.php/', $file, $matches );
	$new_file_path = preg_replace( '/[^\/]*.php/', 'class-' . strtolower( $matches[0] ), $file );

	// if the file exists, require it
	if ( file_exists( $new_file_path ) ) {
		require $new_file_path;
	}

	preg_match( '/[^\/]*.php/', $file, $matches );
	$new_file_path = preg_replace( '/[^\/]*.php/', 'trait-' . strtolower( $matches[0] ), $file );

	// if the file exists, require it
	if ( file_exists( $new_file_path ) ) {
		require $new_file_path;
	}
}

/**
 * Register autoloader
 */
spl_autoload_register(  'sp_autoloader' );

