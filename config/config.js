const baseUrl = 'http://127.0.0.1:3003/';

const getBooksUrl = baseUrl + 'api/book/getBooks';
const commentUrl = baseUrl + 'api/comment/write';
const queryBookUrl = baseUrl + 'api/book/queryBook';
const loginUrl = baseUrl + 'login';
const getBoughtBooksUrl = baseUrl + 'api/user/getBoughtBooks';
const buyBookUrl = baseUrl + 'api/order/buy';


module.exports = {
	getBooksUrl: getBooksUrl,
	commentUrl: commentUrl,
	queryBookUrl: queryBookUrl,
	loginUrl: loginUrl,
	getBoughtBooksUrl: getBoughtBooksUrl,
	buyBookUrl: buyBookUrl
};