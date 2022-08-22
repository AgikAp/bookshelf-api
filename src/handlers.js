const { nanoid } = require('nanoid')
const moment = require('moment')
const books = require('./books')

const searchIn = (arr, match) => {
  let tempResult = []
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].name.toLowerCase().search(match.toLowerCase()) > -1) tempResult.push(arr[i])
  }
  return tempResult
}

module.exports.viewBooks = (req, h) => {
  const { name, reading, finished } = req.query
  let result = books;

  if(name !== undefined && name !== '') {
    result = searchIn(result, name)
  }

  if(reading !== undefined) {  
    result = reading == 1 ? result.filter((book) => book.reading == true) : result.filter((book) => book.reading == false)
  }
  
  if(finished !== undefined) {
    result = finished == 1 ? result.filter((book) => book.finished == true) : result.filter((book) => book.finished == false)
  }

  return h.response({ status: 'success', data: { books: result.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher, })) } })
}


module.exports.viewBooksById = (req, h) => {
  let result = books.filter((book) => book.id == req.params.bookId)

  if(result.length == 0) {
    return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404)
  }

  return h.response({status: 'success', data: { book: result[0] }})
}


module.exports.addBooks = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

  // Validation Name 
  if(name === undefined || name === null || name === '') {
    return h.response({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' }).code(400)
  }
  
  // Validation Page Count 
  if(pageCount < readPage) {
    return h.response({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }).code(400)
  }
  
  const id = nanoid(10)
  const insertedAt = moment()
  const updatedAt = insertedAt
  const finished = (pageCount === readPage ? true : false) 

  const newBooks = {
    id, 
    name, 
    year, 
    author, 
    summary, 
    publisher, 
    pageCount, 
    readPage, 
    finished, 
    reading, 
    insertedAt, 
    updatedAt
  };

  books.push(newBooks)

  if(books.filter((book) => book.id === id).length != 0) {
    return h.response({ status: 'success', message: 'Buku berhasil ditambahkan', data: { bookId: id } }).code(201)
  }else {
    return h.response({ status: 'error', message: 'Buku gagal ditambahkan' }).code(500)
  }
}


module.exports.editBooks = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

  // Validation Name 
  if(name === undefined || name === null || name === '') {
    return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Mohon isi nama buku' }).code(400)
  }
  
  // Validation Page Count 
  if(pageCount < readPage) {
    return h.response({ status: 'fail', message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' }).code(400)
  }

  const id = req.params.bookId
  const updatedAt = moment()
  const finished = (pageCount === readPage ? true : false) 

  const index = books.findIndex((book) => book.id == id)

  console.log(index);
  
  if(index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      finished
    }

    return h.response({ status: 'success', message: 'Buku berhasil diperbarui' })
  }

  return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Id tidak ditemukan' }).code(404)
}

module.exports.deleteBooks = (req, h) => {
  const index = books.findIndex((book) => book.id == req.params.bookId)

  if(index !== -1) {
    books.splice(index, 1)
    return h.response({ status: 'success', message: 'Buku berhasil dihapus' })
  }

  return h.response({ status: 'fail', message: 'Buku gagal dihapus. Id tidak ditemukan' }).code(404)
}