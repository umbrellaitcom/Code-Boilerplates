import { setReviews } from '../../api';

class ReviewsForm {
	constructor( props ) {
		this.state = {
			formClass: 'reviews-form',
			nameFieldId: 'reviews-form__name',
			textFieldIt: 'reviews-form__review-content',
			buttonClass: 'reviews-form__submit--js',
			messageBlockClass: 'reviews-form__messages--js',
			successMessage: 'Success',
			...props,
		};

		this.init();
	}

	init() {
		const { buttonClass } = this.state;

		$( `.${ buttonClass }` ).on( 'click', ( e ) => this.onSubmit( e.currentTarget ) );
	}

	onSubmit( target ) {
		const $button = $( target );

		if ( $button.hasClass( 'disabled' ) ) {
			return false;
		}

		const { formClass, nameFieldId, textFieldIt } = this.state;
		const $form = $button.closest( `.${ formClass }` );

		this.reset( $form );

		const values = {
			name: $form.find( `#${ nameFieldId }` ).val(),
			text: $form.find( `#${ textFieldIt }` ).val(),
		};

		const isValid = this.fieldsValidation( values );

		if ( ! isValid ) {
			return false;
		}

		$button.addClass( 'disabled' );
		$form.find( '.loading' ).show( 300 );

		setReviews( { ...values }, true, 'set-review' )
			.then( ( response ) => {
				const { status, messages } = response.data;

				if ( 'success' === status ) {
					this.reset( $form, true );

					this.addMessage( 'Review added successfully.', 'success', 2400 );
				} else {
					messages.map( item => {
						this.reset( $form );

						this.addMessage( item, 'error' );
					} );
				}
			}
			);
	}

	fieldsValidation( values ) {
		const { name, text } = values;
		let isValid = true;

		if ( name ) {
			const nameMatches = name.search( /[<|>]/ );

			if ( nameMatches !== -1 ) {
				isValid = false;
				this.addMessage( 'Name shouldn\t contains a < and > symbol.', 'error' );
			}

			if ( name.length > 100 ) {
				isValid = false;
				this.addMessage( 'Name should be less then 100 symbols.', 'error' );
			}
		} else {
			isValid = false;
			this.addMessage( 'Name field can\'t be empty.', 'error' );
		}

		if ( text ) {
			const textMatches = name.search( /[<|>]/ );

			if ( textMatches !== -1 ) {
				isValid = false;
				this.addMessage( 'Text shouldn\'t contains symbols < and >.', 'error' );
			}

			if ( text.length > 5000 ) {
				isValid = false;
				this.addMessage( 'Text should be less then 5000 symbols.', 'error' );
			}
		} else {
			isValid = false;
			this.addMessage( 'Text field can\'t be empty.', 'error' );
		}

		return isValid;
	}

	reset( form, isResetFields = false ) {
		const { messageBlockClass, buttonClass } = this.state;

		form
			.find( `.${ messageBlockClass }` )
			.text( '' )
			.hide()
			.removeClass( 'error' )
			.removeClass( 'success' );

		form
			.find( `.${ buttonClass }` )
			.removeClass( 'disabled' );

		form
			.find( '.loading' )
			.hide();

		if ( isResetFields ) {
			form
				.find( 'input' )
				.val( '' );

			form
				.find( 'textarea' )
				.val( '' );
		}
	}

	addMessage( text, className, timeoutToHide = 0 ) {
		const { messageBlockClass } = this.state;

		$( `.${ messageBlockClass }` ).text( text ).addClass( className ).show();

		if ( timeoutToHide !== 0 ) {
			setTimeout( () => {
				$( `.${ messageBlockClass }` )
					.text( '' )
					.hide( 300 )
					.removeClass( 'error' )
					.removeClass( 'success' );
			}, timeoutToHide );
		}
	}
}

export default ReviewsForm;
