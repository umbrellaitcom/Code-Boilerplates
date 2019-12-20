const { createElement } = wp.element;

export default createElement( 'svg',
	{
		width: 24,
		height: 24,
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '0 0 24 24',
		role: 'img',
		focusable: 'false',
	},
	createElement( 'path',
		{
			d: 'M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z',
		}
	)
);
