import 'slick-carousel';
import './scripts';
import './scss/front.scss';

$( document ).on( 'ready', () => {
	$( '.reviews-slider' )
		.slick()
		.on( 'setPosition', ( event, slick ) => {
			slick.$slides.css( 'height', slick.$slideTrack.height() + 'px' );
		} );
});
