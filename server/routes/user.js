const express   = require('express');
const User      = require('../controllers/users');
const router    = express.Router();

/**
 * @desc    查询当前用户已购书籍
 * @method  {*请求方法} GET
 */
router.get('/getBoughtBooks', function (req, res, next) {
    
    const { skey }= req.query;
    
    if(skey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }
    
    User.getBoughtBooks(req, res, next);
})

module.exports = router;