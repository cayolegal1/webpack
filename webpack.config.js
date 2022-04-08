const path = require('path')
const html_webpack_plugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserMinimizerPlugin = require('terser-webpack-plugin')
const dotEnvWebpack = require('dotenv-webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {

    entry: './src/index.js',
    output: {

        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },

    mode: 'production', 

    resolve: {

        extensions: ['.js'],

        alias: {

            '@utils': path.resolve(__dirname, 'src', 'utils/'),
            '@images': path.resolve(__dirname, 'src', 'assets', 'images/'),
            '@templates': path.resolve(__dirname, 'src', 'templates/' ),
            '@styles': path.resolve(__dirname, 'src', 'styles/'),

        }
    },

    module: {
        rules: [ 
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }, 

            {
                test: /\.png/,
                type: 'asset/resource'
            },

            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash][ext][query]',
                },
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10000,
                //         mimetype: 'application/font-woff',
                //         name: "[name].[ext]",
                //         outputPath: './assets/fonts',
                //         publicPaths: './assets/fonts', 
                //         esModule: false
                //     }
                // }

    
            }
        ],

    },
    
    plugins: [
        new html_webpack_plugin({
            inject: true,
            template: './public/index.html',
            filename: './main.html'
        }),

        new MiniCssExtractPlugin({

            filename: 'assets/[name][contenthash].css'
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets', 'images'),
                    to: "assets/images"
                }
            ]
        }),

        new dotEnvWebpack(), 

        new CleanWebpackPlugin()

    ],

    optimization: {

        minimize: true,
        minimizer: [

            new CssMinimizerPlugin(),
            new TerserMinimizerPlugin(),

        ]
    }
}

