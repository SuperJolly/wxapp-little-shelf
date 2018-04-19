/** myBooks.js **/

// 获取服务器接口地址
const api = require('../../config/config.js');
// 获取app应用实例
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookList: [],           // 书籍列表
        showLoading: true,      // 是否显示loading态
        showDownloading: false, // 是否显示下载loading态
        downloadPercent: 0      // 下载书籍进度百分比
    },

    /**
     * 浏览书籍
     */
    readBook: function(ev) {
        let that = this;
        let data = ev.currentTarget.dataset;
        let key = 'book_' + data.id;
        let fileUrl = data.file;


        // 如果已经下载过当前书 直接打开
        let downloadPath = app.getDownloadPath(key);
        if (downloadPath) {
            app.openBook(downloadPath);
            return;
        }

        // 如果没有加载过当前书，开始下载
        const downloadTask = wx.downloadFile({
            url: fileUrl,
            success: function(res) {
                let filePath = res.tempFilePath;
                
                that.setData({
                    showDownloading: false
                });
                
                // 下载后保存当前书籍文件路径
                app.saveDownloadPath(key, filePath)
                    .then(function(saveFilePath) {
                        app.openBook(saveFilePath);
                    })
                    .catch(function() {
                        app.showInfo('文件保存失败');
                    });
            },
            fail: function(error) {
                app.showInfo('文档下载失败');
                console.log(error);
            }
        });
        
        // 监听当前文件下载进度
        downloadTask.onProgressUpdate(function(res) {
            
            console.log('下载进度返回的res:', res);

            let progress = res.progress;
            
            that.setData({
                showDownloading: true,
                downloadPercent: progress
            });

        });
    },

    /**
     * 获取已购书籍操作
     */
    getMybooks: function() {
        let that = this;

        wx.request({
            url: api.getBoughtBooksUrl,
            data: {
                skey: app.getLoginFlag()            // 获取当前用户skey
            },
            success: function(res) {
                let data = res.data;

                if (data.result === 0) {
                    that.setData({
                        bookList: data.list || []
                    });
                }

            },
            error: function(err) {
                console.log(err);
            }
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        setTimeout(function() {
            that.setData({
                showLoading: false
            });
        }, 800);

        that.getMybooks();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        console.log('current page is onReady');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log('current page is onShow');
    }
})