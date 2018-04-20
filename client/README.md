### 小书架

### 小程序端代码

#### 目录结构

    ├── config
    │    └── config.js
    ├── images
    ├── pages
    │    ├── books
    │    │    ├── books.js
    │    │    ├── books.json
    │    │    ├── books.wxml
    │    │    └── books.wxss
    │    ├── comment
    │    │    ├── comment.js
    │    │    ├── comment.js
    │    │    ├── comment.js
    │    │    └── comment.wxss
    │    ├── detail
    │    │    ├── detail.js
    │    │    ├── detail.js
    │    │    ├── detail.js
    │    │    └── detail.wxss
    │    ├── my
    │    │    ├── my.js
    │    │    ├── my.js
    │    │    ├── my.js
    │    │    └── my.wxss
    │    └── myBooks   
    │         ├── myBooks.js
    │         ├── myBooks.js
    │         ├── myBooks.js
    │         └── myBooks.wxss
    ├── utils
    │    └── util.js
    ├── app.js
    ├── app.json
    ├── app.wxss
    └── project.config.json

#### 各页面模块

| 页面 | 描述 |
| --- | --- |
| books | 首页/书籍列表页 |
| comment | 评论页面 |
| detail | 书籍详情页 |
| my | 个人中心页 |
| myBooks | 已购书籍页 |

#### 页面用到的服务端CGI

| 地址 | 入参 | 描述 |
| --- | --- | --- |
| http://127.0.0.1:3003/login | code: 用户登录凭证, rawData, signature, encryptedData, iv | 用户登录 |
| http://127.0.0.1:3003/api/book/getBooks | is_all: [0 -> 单个, 1 -> 所有], bookid: 书籍id,单个书籍时需传入| 获取书籍详情 |
| http://127.0.0.1:3003/api/book/queryBook | bookid: 书籍id，skey: 用户登录标识 | 查询当前用户是否已经购买该书籍并返回评论列表 |
| http://127.0.0.1:3003/api/user/getBoughtBooks | skey: 用户登录标识 | 获取当前用户已购书籍 |
| http://127.0.0.1:3003/api/comment/write| skey: 用户登录标识, bookid: 书籍id, content: 评论内容, formid: 提交表单id[用于发送模板消息] | 写评论 |
| http://127.0.0.1:3003/api/order/buy | bookid: 书籍id，skey: 用户登录标识 | 兑换书籍 |
