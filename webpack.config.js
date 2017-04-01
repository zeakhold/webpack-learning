var path = require('path')//路径模块
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')//导出HTML
var ExtractTextPlugin = require('extract-text-webpack-plugin')//抽离css


module.exports = {
    entry: {
        app: './src/js/app.js',
    },//入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),//打包后的文件存放的地方
        publicPath: '',//资源公共路径,可用于CDN
        filename: 'js/[name].min.js'//打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif)$/,
                use: 'url-loader?limit=10000&name=./img/[name].[ext]'//小于10k转为base64 inline 图片
            },//处理图片
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?minimize=true'//带参数压缩css
                })
            }//处理css
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].min.css'), //用ExtractTextPlugin 来抽离css
        new webpack.optimize.UglifyJsPlugin({        //压缩js代码
            compress: {
                warnings: false
            },
            except: ['$super','$','exports','require']//排除关键字
        }),
        new HtmlWebpackPlugin({                      //插入css/js标签生成最终html
            filename: 'index.html',
            template: './src/index.html',
            hash: true,//静态资源后加hash
            minify: {
                removeComments: true,//移除注释
                collapseWhitespace: true,//移除空格
            },
            chunks: [
                'app'
            ]//只选择加载入口文件 app.js
        }),
    ],
    devServer: {
        contentBase: './dist',//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
}