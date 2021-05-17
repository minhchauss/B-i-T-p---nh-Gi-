module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },

    devServer: {
        proxy: 'https://localhost:44333/api/v1',
    }
}