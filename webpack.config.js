const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let dist = "./dist";
module.exports = {
    entry: {
        main: './src/jsx/index.jsx',
    },
    output: {
        filename: './js/[name].bundle.js',
        path: path.resolve(__dirname, dist),
    }, 
    //將loader的設定寫在module的rules屬性中
    module: {
        //rules的值是一個陣列可以存放多個loader物件
        rules: [
            { 
                test: /.jsx$/, 
                exclude: /node_modules/, 
                use: { 
                    loader: 'babel-loader', 
                    options: { 
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-env',
                            { 'plugins': ['@babel/plugin-proposal-class-properties']}
                        ] 
                    } 
                } 
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader'],
            }

        ]
    },
    //給devserver的設定
    devServer: {
        //指定開啟port為8080
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        port: 8080
    },
    plugins: [ 
        new CopyPlugin([
            // 這次的例子中copy to的目標path會基於output.path的路徑之下
            {
                from: './src/html/index.html',
                to: './'
            }
        ])
    ]
};
