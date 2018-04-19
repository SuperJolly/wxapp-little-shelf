// pages/books/books.js

const app = getApp();
const api = require('../../config/config.js');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookList: [],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        circular: true,
        sideMargin: '100rpx',
        showLoading: true
    },

    /**
     * 打开书籍详情页面
     */
    goDetail: function(ev) {

        let info = ev.currentTarget.dataset;
        let navigateUrl = '../detail/detail?';

        for (let key in info) {
            info[key] = encodeURIComponent(info[key]);
            navigateUrl += key + '=' + info[key] + '&';
        }

        navigateUrl = navigateUrl.substring(0, navigateUrl.length - 1);

        wx.navigateTo({
            url: navigateUrl
        });
    },

    /**
     * 获取所有书籍列表
     */
    getBookList: function() {
        let that = this;
        wx.request({
            url: api.getBooksUrl,
            data: {
                is_all: 1
            },
            success: function(res) {
                let data = res.data;
                // console.log(data);

                if (data.result === 0) {
                    setTimeout(function() {
                        that.setData({
                            bookList: data.data,
                            showLoading: false
                        });
                    }, 800);
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
        that.getBookList();
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

    },

    /**
     * 设置页面转发信息
     */
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '小书架首页',
            path: '/pages/books/books',
            imageUrl: '/images/bookstore.png',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
});