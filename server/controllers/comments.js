const Comments = require('../dao/comments');
const Pusher = require('./push');

module.exports = {
    /**
     * 根据用户skey标识，写评论
     */
    addCommentBySkey: function(req, res, next) {
        Comments.addCommentBySkey(req.body.skey, req.body.content, req.body.bookid).then(function(resData) {

            if(resData && resData.insertId) {
                /**
                 * 推送评论消息
                 */
                Pusher.pushMessageToUser(req);

                res.json({
                    result: 0,
                    errmsg: 'insert success!'
                });

            } else {
                
                res.json({
                    result: -2,
                    errmsg: '提交失败'
                });

            }
        })
        .catch(function(e) {

            res.json({
                result: -3,
                errmsg: '网络错误'
            })
            
        })
    }
}