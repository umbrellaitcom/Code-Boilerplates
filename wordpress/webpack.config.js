const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );

const appPath = path.join( `${ __dirname }` );

const jsPath = path.join( appPath, '/src/wp-content/plugins/sampleplugin/src/front.js' );
const jsPathAdmin = path.join( appPath, '/src/wp-content/plugins/sampleplugin/src/admin.js' );

const outPath = path.join( appPath, '/src/wp-content/plugins/sampleplugin/dist/' );

const extractSass = new ExtractTextPlugin( {
	filename: 'style.css',
} );

const externals = {
	jquery: 'jQuery',
};
const wpDependencies = [ 'components', 'element', 'blocks', 'utils', 'date' ];

wpDependencies.forEach( wpDependency => {
	externals[ '@wordpress/' + wpDependency ] = {
		this: [ 'wp', wpDependency ],
	};
} );

module.exports = {
	entry: {
		'front.js': jsPath,
		'admin.js': jsPathAdmin,
	},
	output: {
		filename: '[name]',
		path: outPath,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					plugins: [ 'lodash' ],
					presets: [ [ '@babel/env', { targets: { node: 6 } } ] ],
				},
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
						},
					},
					'css-loader',
					'resolve-url-loader',
					'sass-loader?sourceMap',
				],
			},
		],
	},
	optimization: {
		minimizer: [
			new TerserJSPlugin( {
				terserOptions: {
					mangle: false,
					safari10: false,
				},
			} ),
			new OptimizeCSSAssetsPlugin( {} ),
		],
	},
	plugins: [
		extractSass,
		new webpack.ProvidePlugin( {
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		} ),
		new MiniCssExtractPlugin( {
			moduleFilename: ( { name } ) => {
				if ( name === 'main.js' ) {
					return 'style.css';
				}
				return `${ name.replace( /js/, '' ) }css`;
			},
		} ),
	],
	externals,
};
