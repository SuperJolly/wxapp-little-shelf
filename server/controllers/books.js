const Books    = require('../dao/books');
const Comments = require('../dao/comments');
const moment   = require('moment');

module.exports = {
    /**
     * 获取所有书籍信息
     */
    getAllBooks: function(req, res, next) {
        Books.getBookInfo(true).then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function(item) {
                    // 返回的map结构
                    return {
                        author: item.bkauthor || '',
                        category: item.bkclass || '',
                        cover_url: item.bkcover || '',
                        file_url: item.bkfile || '',
                        book_id: item.bkid || '',
                        book_name: item.bkname || '',
                        book_price: item.bkprice || 0,
                        book_publisher: item.bkpublisher || ''
                    }  
                })
            })
        })
    },

    /**
     * 根据bookid获取当前书籍信息
     */
    getBookById: function(req, res, next) {
        const bookid = req.query.bookid;
        if(!bookid) {
            res.json({
                result: -1,
                errmsg: '缺少请求参数字段bookid，请检查后重试'
            });
            return;
        }
        Books.getBookInfo(false, bookid).then(function(resData) {
            res.json({
                result: 0,
                data: resData.map(function (item) {
                    return {
                        author: item.bkauthor || '',
                        category: item.bkclass || '',
                        cover_url: item.bkcover || '',
                        file_url: item.bkfile || '',
                        book_id: item.bkid || '',
                        book_name: item.bkname || '',
                        book_price: item.bkprice || 0,
                        book_publisher: item.bkpublisher || ''
                    }
                })
            })
        });
    },
    
    /**
     * 根据用户skey标识，查询用户是否购买书籍并返回评论列表
     */
    queryBookBySkey: function(req, res, next) {
        const responseData = {};
        // 查询用户是否购买当前书籍
        Books.queryBookBySkey(req.query.bookid, req.query.skey).then(function(resData) {

            if(resData && resData[0] && resData[0]['buyCount'] === 1) {
                responseData['is_buy'] = 1;
            } else {
                responseData['is_buy'] = 0;
            }
            
            // 返回当前书籍评论列表
            return Comments.getCommentsBySkey(req.query.bookid);
            
        })
        .then(function(resCommentData) {

            if(resCommentData && resCommentData.length) {
                resCommentData.forEach(function(item) {
                    item.ctime = moment(item.ctime).format('YYYY-MM-DD HH:mm:ss');
                });
                responseData['lists'] = resCommentData;
            } else {
                responseData['lists'] = [];
            }

            res.json({
                result: 0,
                data: responseData
            });
        })
        .catch(function(e){

            res.json({
                result: -2,
                errmsg: '数据查询出错，' + JSON.stringify(e)
            })

        })
    }
}