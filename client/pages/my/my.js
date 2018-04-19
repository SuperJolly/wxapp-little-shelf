/** index.js **/

//获取app实例
const app = getApp();

Page({
    data: {
        userInfo: {},   // 用户信息
        hasLogin: wx.getStorageSync('loginFlag')
            ? true 
            : false     // 是否登录，根据后台返回的skey判断
    },

    // 检查本地 storage 中是否有skey登录态标识
    checkLoginStatus: function() {
        
        let that = this;

        let loginFlag = wx.getStorageSync('loginFlag');

        if (loginFlag) {
            // 检查 session_key 是否过期
            wx.checkSession({
                // session_key 有效(未过期)
                success: function() {
                    // 获取用户头像/昵称等信息
                    that.getUserInfo();
                },

                // session_key 已过期
                fail: function() {
                    that.setData({
                        hasLogin: false
                    });
                }
            });

        } else {
            that.setData({
                hasLogin: false
            });
        }
    },

    /**
     * 执行登录操作
     */
    doLogin: function() {
        let that = this;
        wx.showLoading({
            title: '登录中...',
            mask: true
        });
        app.doLogin(that.getUserInfo);
    },

    /**
     * 跳转已购书籍页面
     */
    goMyBooks: function() {
        wx.navigateTo({
            url: '../myBooks/myBooks'
        });
    },

    /**
     * 从 globalData 中获取 userInfo
     */
    getUserInfo: function() {
        let that = this;

        let userInfo = app.globalData.userInfo;

        console.info('userInfo is:', userInfo);

        if (userInfo) {
            that.setData({
                hasLogin: true,
                userInfo: userInfo
            });
            wx.hideLoading();
        } else {
            console.log('globalData中userInfo为空');
        }
    },

    onLoad: function() {
        this.checkLoginStatus();
    },

    onShow: function() {
        let that = this;
        that.setData({
            userInfo: app.globalData.userInfo
        });
    }
})