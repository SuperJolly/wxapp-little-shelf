// pages/myBooks/myBooks.js
const api = require('../../config/config.js');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookList: [],
        showLoading: true,
        showDownloading: false,
        downloadPercent: 0
    },

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


        const downloadTask = wx.downloadFile({
            url: fileUrl,
            success: function(res) {
                let filePath = res.tempFilePath;
                that.setData({
                    showDownloading: false
                });

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

        downloadTask.onProgressUpdate(function(res) {

            let progress = res.progress;
            that.setData({
                showDownloading: true,
                downloadPercent: progress
            });

        });
    },


    getMybooks: function() {
        let that = this;
        wx.request({
            url: api.getBoughtBooksUrl,
            data: {
                skey: app.getLoginFlag()
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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    }
})