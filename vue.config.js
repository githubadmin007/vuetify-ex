const path = require('path');

module.exports = {
    outputDir: './dist',
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    pages: {
        index: {
            entry: 'src/demo/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'VuetifyEx'
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: 'vue-loader',
                            options: {
                                compilerOptions: {
                                    preserveWhitespace: false
                                }
                            }
                        },
                        {
                            loader: path.resolve(__dirname, './src/demo/md-loader/index.js')
                        }
                    ]
                },
            ]
        }
    }
}