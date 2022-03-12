module.exports = {
    //以下配置的效果
    //   “/api/getok.php”  -->   http://122.51.238.153/getok.php
    // 修改的配置
    devServer: {
        proxy: {
            //如果地址以/api开头，它就会请求到 http://122.51.238.153 
            '/api': {
                // 部署在Vercel的接口
                target: 'https://netease-cloud-music-api-p2nucsglx-qiuzijun.vercel.app', 
                // target: 'http://localhost:3000',//本地node启动 下面github大佬的API文档地址 https://neteasecloudmusicapi.vercel.app/#/ 
                changeOrigin: true,
                ws: true, 
                pathRewrite: {
                      '^/api': '',   //重写请求路径
                },
            }
        }
    }
  }