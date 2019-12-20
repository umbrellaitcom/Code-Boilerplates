<?php
/**
 * Template for Last_Reviews_Widget form method.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<p>
	<label for="<?php echo esc_attr( $data['title_field_id'] ); ?>">Title</label>
	<input
		class="widefat"
		id="<?php echo esc_attr( $data['title_field_id'] ); ?>"
		name="<?php echo esc_attr( $data['title_field_name'] ); ?>"
		type="text"
		value="<?php echo esc_attr( $data['title'] ); ?>"
	/>
</p>
<p>
	<label for="<?php echo esc_attr( $data['posts_per_page_field_id'] ); ?>">Posts count</label>
	<input
		id="<?php echo esc_attr( $data['posts_per_page_field_id'] ); ?>"
		name="<?php echo esc_attr( $data['posts_per_page_field_name'] ); ?>"
		type="text"
		value="<?php echo ( $data['posts_per_page'] ) ? esc_attr( $data['posts_per_page'] ) : '5'; ?>"
		size="3"
	/>
</p>
