const Path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  entry: {
		"app": './src/index.js',
		"app.plugable": './src/plugable.js',
		"lesson": './src/lesson.js',
    "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
		"json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
		"css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
		"html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
		"ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
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
		})
	]
};