const $sqlQuery = require('./sqlCRUD').comment;
const _ = require('./query');

const comments = {
    getCommentsBySkey: function(bookid) {
        return _.query($sqlQuery.queryComments, bookid);
    },
    addCommentBySkey: function(skey, content, bookid) {
        return _.query($sqlQuery.addComment, [bookid, bookid, content, skey]);
    }
};
module.exports = comments;