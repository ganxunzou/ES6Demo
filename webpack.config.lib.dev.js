/**
 * Created by KJ on 2016/3/10.
 */
var WebpackCfg = require('./webpack.common.config.js');

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {
    devtool:'source-map',
    entry: {
        "index":[
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server',
            'babel-polyfill',//增加Generator函数支持
            './src_lib/test/test.jsx'
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias:{
            'HelloLib':__dirname+'/dist/libs/HelloLib'
        }
    },
    output: {
        path: __dirname+"/dist/libs/test",
        filename:'test.js'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'HelloLib':'HelloLib'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src_lib/test/test.jade',//index.html
            title:'Library Test',
            chunks: ['index']
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
};

Object.assign(WebpackCfg,config);

module.exports = WebpackCfg;
