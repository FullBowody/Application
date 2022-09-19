const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    chainWebpack: config => {
        
    },
    pluginOptions: {
        electronBuilder: {
            chainWebpackMainProcess: config => {
                // Chain webpack config for electron main process only
                config.module.rule('node').test(/\.node$/).use("node-loader").loader("node-loader").end();
            }
        }
    }
});

// TODO : Fix NODE-LOADER for .node files