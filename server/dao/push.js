const $sqlQuery = require('./sqlCRUD').access;
const _ = require('./query');

const push = {
    getPusherToken: function() {
        return _.query($sqlQuery.queryToken);
    }
};

module.exports = push;