<?php
/**
 * Form template.
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<div class="reviews-form">
	<label for="reviews-form__name" class="reviews-form__label">Name</label>
	<input id="reviews-form__name" class="reviews-form__input" type="text" placeholder="Jason Statham"/>

	<label for="reviews-form__review-content" class="reviews-form__label">Review text</label>
	<textarea id="reviews-form__review-content" class="reviews-form__textarea"> </textarea>

	<div class="reviews-form__footer">
		<button class="submit reviews-form__button reviews-form__submit--js">Submit</button>
		<div class="loading" style="display: none"></div>
	</div>

	<div class="reviews-form__messages reviews-form__messages--js" style="display: none"></div>
</div>
