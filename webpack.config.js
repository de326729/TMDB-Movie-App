var webpack = require('webpack');
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const envFile = require('node-env-file');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'

    },
    resolve:{
        modules: [__dirname, 'node_modules', './src/components', './src/apis' ],
        alias: {
          actions: 'src/actions/actions.jsx',
          reducers: 'src/reducers/reducers.jsx',
          configureStore: 'src/store/configureStore.jsx'
        },
        extensions: ['.js', '.jsx','.scss']
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']

            },
            {
                test:/\.scss$/,
                use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
            }, {
                loader: "sass-loader",

            }]
            },
            {
                test:/\.css$/,
                use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            },
            {
                 test: /\.(ttf|eot|png)$/,
                 loader: 'file-loader?name=fonts/[name].[ext]'
            }
               ]
    },
    devServer: {
        contentBase: "./public",
        hot: true
    },
    plugins: [
    new UglifyJSPlugin(),
     new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
    }
    })
    ],
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
}
