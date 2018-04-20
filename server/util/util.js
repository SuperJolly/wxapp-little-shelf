const crypto = require('crypto');

module.exports = {
    /**
     * 解密用户数据
     */
    decryptByAES: function (encrypted, key, iv) {
        encrypted = new Buffer(encrypted, 'base64');
        key = new Buffer(key, 'base64');
        iv = new Buffer(iv, 'base64');
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
        let decrypted = decipher.update(encrypted, 'base64', 'utf8')
        decrypted += decipher.final('utf8');
        return decrypted
    },

    /**
     * 加密生成小程序自己的用户登录标识
     */
    encryptSha1: function (data) {
        return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
    }
}