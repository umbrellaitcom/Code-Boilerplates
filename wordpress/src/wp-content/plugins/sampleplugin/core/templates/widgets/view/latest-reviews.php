<?php
/**
 * Template for Last_Reviews_Widget.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$reviews = \SamplePlugin\PostType\Reviews::get_instance()->get( $data['posts_per_page'], 0 );
?>

<div class="reviews-widget">
<?php
	echo wp_kses( $data['before_widget'], 'post' );

if ( ! empty( $data['widget_title'] ) ) :
	?>
		<h4 class="reviews-widget__title"><?php echo wp_kses( $data['before_title'] . $data['widget_title'] . $data['after_title'], 'post' ); ?></h4>
	<?php
	endif;

if ( ! empty( $reviews ) ) :
	?>
	<ul>
	<?php foreach ( $reviews as $review ) : ?>
		<li class="reviews-widget__item">
			<span class="reviews-widget__item__title">
				<?php echo esc_html( $review->post_title ); ?>
			</span>
			<span class="reviews-widget__item__text">
				<?php echo esc_html( $review->post_content ); ?>
			</span>
		</li>
	<?php endforeach; ?>
	</ul>
	<?php
endif;

echo wp_kses( $data['after_widget'], 'post' );
?>
</div>
