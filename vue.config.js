/**
 * @description: vue cli3 配置文件
 * @author: guang.shi <https://blog.csdn.net/guang_s>
 * @date: 2019-04-12 13:51:21
 */

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const colors = require('colors-console');
// const CompressionPlugin = require('compression-webpack-plugin');

// 配置选项
const config = {
    pages: Object.assign(getPages(), {
        app: './src/main.js',    // 配置主入口文件（会生成 app.html，vue cli3并没有提供直接配置入口文件的选项）
       
    }),
    devServer: {
        open: process.platform === 'yao',
        host: '127.0.0.1',
        // port: 9099,//product
        port: 9098,//dev
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    },
    configureWebpack: {
        devtool: 'source-map'
    },
    // configureWebpack: config => {
    //     if (process.env.NODE_ENV === 'production') {
    //         return {
    //             plugins: [ new CompressionPlugin({
    //                 test: /.js$|.html$|\css|.jpg$|.png/, // 匹配文件名
    //                 threshold: 10240, // 对超过10k的文件进行压缩
    //                 deleteOriginalAssets: true // 是否删除原文件
    //             })]
    //         }
    //     }
    // },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
    // publicPath: '/',
    // outputDir: 'dist', //构建输出目录
    assetsDir:process.env.NODE_ENV === 'production'
    ? 'production-sub-path/'
    : '',
};

// 获取多页面的配置数据
function getPages() {
    const pages = {};
    const pagesJson = require('./config/page.json');

    glob.sync('./src/pages/**/*.vue').forEach(function (pageUrl) {
        const ext = path.extname(pageUrl);
        const pageCode = path.basename(pageUrl, ext);
        // 文件名不能重复的验证（pageCode 在这里取的是文件名）
        if(pages[pageCode]){
            console.error(colors('red', `文件名不能重复使用：${pageCode}。\n`));
            process.exit(1);
        }
        // 生成入口文件
        const entryFile = `./entry/${pageCode}.js`;
        fs.exists(entryFile, function (exists) {      // 这里没有对文件目录进行判断，所以需要先建一个'entry'文件夹，否则会报错
            if(exists) return;
            // 创建文件及写入文件内容
            const appTpl = '.' + pageUrl;
            const entryData = `import Vue from 'vue';\nimport App from '${appTpl}';\nVue.config.productionTip = false;\nnew Vue({ render: h => h(App) }).$mount('#${pageCode}'); `;
            fs.writeFile(entryFile, entryData, function(err){
                // err.code === 'ENOENT'
                if(err) console.log(err);
            });
        });
        // 自定义页面数据
        const pageData = pagesJson[pageCode] || {};
        Object.assign(pageData, {
            url: pageUrl,
            code: pageCode
        });
        // 配置多页面
        pages[pageCode] = {
            entry: entryFile,               // 入口文件
            template: './public/index.html',// 模板文件
            filename: pageCode + '.html',   // 打包后的文件路径
            minify: true,                  // 是否压缩
            chunks: ['chunk-vendors', 'chunk-common', 'app', pageCode],   // 引入资源文件
            chunksSortMode: 'manual',       // 控制 chunk 的排序。none | auto（默认）| dependency（依赖）| manual（手动）| {function}
            pageData: pageData
        };
    });
    return pages;
}

module.exports = config;
