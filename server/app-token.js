const express = require('express');
const http = require('axios');
const config = require('./conf/app').appConfig;
const app = express();
const _ = require('./dao/query');

let nextTime = 0;
let timer;
let expires = 0;
let access_token = '';

/**
 * @desc    利用setTimeout定时器来刷新access-token接口调用凭据
 * @param   {*回调函数} fn 
 * @param   {*定时器间隔} time 
 */
function refreshAccessToken(fn, time) {
  
    const refreshToken = function() {
       fn(refreshToken);
    }
  
    timer = setTimeout(refreshToken, time);
}

/**
 * @desc 获取access-token接口调用凭据
 * @param {*回调} cb 
 */
function getAccessToken(cb) {
    // 清除上一个定时器
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    // 获取 access_token
    const opt = {
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        method: 'GET',
        params: {
            grant_type: 'client_credential',
            appid: config.appid,
            secret: config.secret
        }
    };

    http(opt)
    .then(function(response) {
        console.log(response,'调用接口返回数据');
        if(response && response.data && response.data.access_token) {
            // 拿到access_token，存表
            const resData = response.data;
            access_token = resData.access_token;
            expires = resData.expires_in || 0;

            return _.query('select count(*) as count from access');
        }
    })
    .then(function(response) {
        console.log('查表数据', response);
        if(response && response[0]) {
            if (response[0]['count'] === 0) {   // 首次获取，插入表中 
                return _.query('insert into access set ?', {
                    token: access_token,
                    expires: expires
                })
            } else {                            // 非首次获取，刷新token
                return _.query('update access set ?', {
                    token: access_token,
                    expires: expires
                })
            }
        }
    })
    .then(function(response) {
        if(response) {
            // 更新下次刷新的时间
            nextTime = (expires || 7200) * 1000;
            setTimeout(cb, nextTime);
        }
    })
    .catch(function(error) {
        console.log('error is:', error);
        // 捕获错误后，设置下次刷新时间为30s后
        nextTime = 30*1000;
        timer = setTimeout(cb, nextTime);
    });
}

// 刷新access-token
refreshAccessToken(getAccessToken, 0);

module.exports = app;