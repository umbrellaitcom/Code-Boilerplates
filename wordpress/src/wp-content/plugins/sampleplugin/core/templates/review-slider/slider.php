<?php
/**
 * Slider template.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$reviews = \SamplePlugin\PostType\Reviews::get_instance()->get( $data['slides_count'] );
?>

<div class="reviews-slider" data-slick="<?php echo esc_attr( wp_json_encode( $data['slider_config'] ) ); ?>">
	<?php foreach ( $reviews as $review ) : ?>
		<div class="reviews-slider__card__wrapper">
			<div class="reviews-slider__card">
				<span class="reviews-slider__card__title"><?php echo esc_html( $review->post_title ); ?></span>
				<div class="slide-content">
					<?php echo esc_html( $review->post_content ); ?>
				</div>
			</div>
		</div>
	<?php endforeach; ?>
</div>
