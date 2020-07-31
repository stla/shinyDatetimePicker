var path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'srcjs', 'datetimePicker.jsx'),
    output: {
        path: path.join(__dirname, 'inst', 'www', '${package}', 'datetimePicker'),
        path: path.join(__dirname, 'inst/www/shinyDatetimePicker/datetimePicker'),
        filename: 'datetimePicker.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    },
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'reactR': 'window.reactR'
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
