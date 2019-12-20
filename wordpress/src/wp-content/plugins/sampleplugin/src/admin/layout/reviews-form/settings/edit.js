const { Component } = wp.element;

class EditForm extends Component {
	render() {
		return (
			<div className="reviews-form">
				<label htmlFor="reviews-form__name" className="reviews-form__label">
					Name
				</label>
				<input id="reviews-form__name" className="reviews-form__input" type="text" placeholder="Jason Statham" />

				<label htmlFor="reviews-form__review-content" className="reviews-form__label">
					Review text
				</label>
				<textarea id="reviews-form__review-content" className="reviews-form__textarea"></textarea>

				<div className="reviews-form__footer">
					<button className="submit reviews-form__button reviews-form__submit--js">
						Submit
					</button>
					<div className="loading" style={ { display: 'none' } }></div>
				</div>

				<div className="reviews-form__messages reviews-form__messages--js" style={ { display: 'none' } }></div>
			</div>
		);
	}
}

export default EditForm;
