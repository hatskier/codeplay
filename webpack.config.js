const Path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
		// Custom scripts
		// "app": './src/index.js',
		// "app.plugable": './src/plugable.js',
		"lesson": "./src/lesson.js",
		"image-preloader": "./src/image-preloader.js",
		"gif-urls-preview": "./src/gif-urls-preview.js",

		// Tour styles
		"tour.css": "tour/dist/tour.css",

		// Monaco editor
    // "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
		// "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
		// "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
		// "html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
		// "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
  },
  output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: Path.resolve(__dirname, 'dist')
	},
  devServer: {
    compress: true,
    port: 9000
  },
  module: {
		rules: [{
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		}]
	},
	plugins: [
		new CopyPlugin([
			{ from: 'static' }
		]),
		new MonacoWebpackPlugin({
			languages: ['javascript']
		}),
		// new webpack.optimize.CommonsChunkPlugin({
    //   names: ["vendor"],

    //   // use this to overwrite output config
    //   // filename: "vendor.bundle.js"

    //   // with more entries, this ensures that no other module goes into the vendor chunk
    //   minChunks: Infinity,
    // })
	],
	// optimization: {
  //   runtimeChunk: "single", // enable "runtime" chunk
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         // test: /[\\/]node_modules[\\/]/,
  //         name: "vendor",
  //         chunks: "all"
  //       }
  //     }
  //   }
  // }
};