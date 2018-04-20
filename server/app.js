const createError   = require('http-errors');
const express       = require('express');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
/**
 * 中间件
 */
const { authorizeMiddleware } = require('./middleware/auth');

const loginRouter   = require('./routes/login');
const bookRouter    = require('./routes/book');
const userRooter    = require('./routes/user');
const commentRouter = require('./routes/comment');
const orderRouter   = require('./routes/order');

const app = express();

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login',       authorizeMiddleware, loginRouter);
app.use('/api/user',    userRooter);
app.use('/api/book',    bookRouter);
app.use('/api/comment', commentRouter);
app.use('/api/order',   orderRouter);

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
