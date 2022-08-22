const handler = require('./handlers')

module.exports.routes = [
  {
    method: 'get',
    path: '/books',
    handler: handler.viewBooks
  },
  {
    method: 'get',
    path: '/books/{bookId}',
    handler: handler.viewBooksById
  },
  {
    method: 'post',
    path: '/books',
    handler: handler.addBooks
  },
  {
    method: 'put',
    path: '/books/{bookId}',
    handler: handler.editBooks
  },
  {
    method: 'delete',
    path: '/books/{bookId}',
    handler: handler.deleteBooks
  }
]