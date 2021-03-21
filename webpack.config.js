const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin') // https://github.com/webpack-contrib/copy-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    target: 'web',
    optimization: {
        usedExports: true
    },
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.sass$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            indentedSyntax: true
                        }
                    }
                }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ['vue-style-loader', 'css-loader', 'postcss-loader'],
                        scss: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                        sass: [
                            'vue-style-loader',
                            'css-loader',
                            'postcss-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    sassOptions: {
                                        indentedSyntax: true
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
        alias: {
            vue$: process.env.NODE_ENV === JSON.stringify('production') ? 'vue/dist/vue.js' : 'vue/dist/vue.esm.js',
            '@app': path.resolve(__dirname, 'src')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        contentBase: path.join(__dirname, 'src'),
        openPage: 'index.html',
        port: 4000,
        disableHostCheck: true
    },
    performance: {
        hints: false
    },
    devtool: 'eval-source-map'
}

/*=======================================*/
/*              Production               */
/*=======================================*/
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = 'source-map'
    module.exports.target = 'browserslist'

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*']
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'src/assets'),
                    to: './assets/',
                    globOptions: {
                        ignore: ['**/sass/**/*.*']
                    }
                },
                {
                    from: './*.html',
                    to: './',
                    context: 'src/'
                }
            ]
        })
    ])
}
