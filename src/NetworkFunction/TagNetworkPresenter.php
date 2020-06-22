<?php

declare( strict_types = 1 );

namespace MediaWiki\Extension\Network\NetworkFunction;

use Html;

class TagNetworkPresenter implements NetworkPresenter {

	private static $idCounter = 1;

	/**
	 * @var string[]
	 */
	private $resourceModules = [];

	/**
	 * @var mixed[]|string
	 */
	private $parserFunctionReturnValue = '';

	private $visJsOptions;

	public function __construct( array $visJsOptions ) {
		$this->visJsOptions = $visJsOptions;
	}

	public function showGraph( ResponseModel $viewModel ): void {
		$this->resourceModules = [ 'ext.network' ];

		$this->parserFunctionReturnValue = [
			Html::element(
				'div',
				[
					'id' => 'network-viz-' . (string)self::$idCounter++,
					'class' => $viewModel->cssClass,
					'data-pages' => json_encode( $viewModel->pageNames ),
					'data-exclude' => json_encode( $viewModel->excludedPages ),
					'data-options' => json_encode( $this->getVisJsOptions() ),
				]
			),
			'noparse' => true,
			'isHTML' => true,
		];
	}

	private function getVisJsOptions(): array {
		return array_replace_recursive(
			[
				'layout' => [
					'randomSeed' => 42
				]
			],
			$this->visJsOptions
		);
	}

	/**
	 * @return string[]
	 */
	public function getResourceModules(): array {
		return $this->resourceModules;
	}

	/**
	 * @return mixed[]|string
	 */
	public function getParserFunctionReturnValue() {
		return $this->parserFunctionReturnValue;
	}

	public function showTooManyPagesError(): void {
		// TODO: i18n
		$this->parserFunctionReturnValue = 'Too many pages. Can only show connections for up to 100 pages.';
	}

}