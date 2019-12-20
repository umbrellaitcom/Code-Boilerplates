<?php
/**
 * Allow to render templates with passed data
 *
 * @package WordPress
 * @subpackage Sample Plugin [UIT]
 */

namespace SamplePlugin;

use SamplePlugin\Vendor\Singleton;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Templates
 */
class Templates extends Singleton {

	/**
	 * List of all templates which can be used.
	 *
	 * @var array
	 */
	private $files = array(
		'review_form'        => UIT_CORE_DIR . '/templates/review-form/form.php',
		'review_slider'      => UIT_CORE_DIR . '/templates/review-slider/slider.php',
		'review_widget_form' => UIT_CORE_DIR . '/templates/widgets/form/latest-reviews.php',
		'review_widget_view' => UIT_CORE_DIR . '/templates/widgets/view/latest-reviews.php',
	);

	/**
	 * Templates init.
	 */
	protected function init() {
		$this->files = apply_filters( 'uit_register_template', $this->files );
	}

	/**
	 * Allow to add some external templates.
	 *
	 * @param string $template_name template name for callback.
	 * @param string $path_to_template absolute path to folder with tempaltes or file.
	 */
	public function add_template( $template_name, $path_to_template ) {
		if ( ! empty( $template_name ) && ! empty( $path_to_template ) ) {
			$this->files[ $template_name ] = $path_to_template;
		}
	}

	/**
	 * Allow to get template with passed params.
	 * Using when you need to just get a string template code.
	 *
	 * @param string $template_name template name which need to render.
	 * @param void   $data passed data to template.
	 *
	 * @return string $response inline html.
	 */
	public function get_template( $template_name, $data = null ) {
		$template_path = $this->files[ $template_name ];
		$template_path = apply_filters( 'uit_template_renderer', $template_path, $template_name );

		ob_start();

		include $template_path; // phpcs:ignore

		return ob_get_clean();
	}

	/**
	 * Allow to render template with passed params.
	 * Using when you need render template on the page.
	 *
	 * @param string $template_name template name which need to render.
	 * @param void   $data passed data to template.
	 */
	public function render_template( $template_name, $data = null ) {
		$template_path = $this->files[ $template_name ];
		$template_path = apply_filters( 'uit_template_renderer', $template_path, $template_name );

		ob_start();

		include $template_path; // phpcs:ignore

		echo ob_get_clean(); // phpcs:ignore
	}

}
