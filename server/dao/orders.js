const $sqlOrderQuery = require('./sqlCRUD').order;
const $sqlUserQuery = require('./sqlCRUD').user;

const _ = require('./query');

const orders = {
    addBookOrder: function (bookid, price, uid, balance) {
        return Promise.all([
            _.query($sqlOrderQuery.buyBook, [uid, price, bookid]),
            _.query($sqlUserQuery.reduceBalance, [(balance - price), uid])
        ])
    }
};
module.exports = orders;