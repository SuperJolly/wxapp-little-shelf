const express   = require('express');
const Order     = require('../controllers/orders');
const router    = express.Router();

/**
 * @desc    兑换当前书籍
 * @method  {*请求方法} POST
 */
router.post('/buy', function (req, res, next) {
    
    const { skey, bookid } = req.body;
    
    if (skey === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数skey字段，请检查后重试'
        });
        return;
    }

    if (bookid === undefined) {
        res.json({
            result: -1,
            errmsg: '缺少请求参数bookid字段，请检查后重试'
        })
    }

    Order.buyBookBySkey(req, res, next);
})

module.exports = router;