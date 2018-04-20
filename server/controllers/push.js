const Push = require('../dao/push');
const Users = require('../dao/users');
const http = require('axios');
const moment = require('moment');

module.exports = {
    /**
     * 向用户推送模板消息
     */
    pushMessageToUser: function (req, res, next) {

        const { 
            formid,
            skey,
            content
        } = req.body;

        let access_token = '', 
            openid       = '', 
            uname        = '', 
            utime        = moment().format('YYYY-MM-DD HH:mm:ss');

        // 初始化模板id和跳转页面路由
        const template_id = '/** your template_id **/',
              page        = '/pages/books/books';

        // 获取接口调用凭据token
        Push.getPusherToken()
        .then((resData) => {

            if(resData && resData[0] && resData[0].token) {
                access_token = resData[0].token;
            }
            
            // 获取用户信息
            return Users.getUserId(skey, content);
        })
        .then((resData) => {
            
            if(resData && resData[0] && resData[0].uid) {
                openid = resData[0].uid;
                uname = resData[0].uname;
                utime = moment(resData[0].ctime).format('YYYY-MM-DD HH:mm:ss');
            }
            
            if (!access_token || !openid) {
                throw new Error('信息获取失败!');
            } else {
                // 调用微信后台提供的发送模板消息接口
                const paramObj = {
                    touser: openid,
                    template_id,
                    page,
                    form_id: formid,
                    data: {
                        keyword1: {
                            value: '小书架模板消息',
                            color: '#1aad19'
                        },
                        keyword2: {
                            value: uname + ' 恭喜你的留言入选啦',
                            color: '#1e1e1e'
                        },
                        keyword3: {
                            value: utime,
                            color: '#cdcdcd'
                        }
                        
                    }
                }
                return http({
                    url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
                    method: 'POST',
                    data: paramObj
                })
                
            }
        })
        .then((resData) => {
            console.log(resData,'!!!');
        })
        .catch((error) => {
            console.log('推送评论消息失败::', error);
        })
    }
}