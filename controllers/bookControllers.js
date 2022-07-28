require("dotenv").config();
const axios = require("axios")
const qs = require("qs")
const Book = require("../models/book");
const Token = require("./token");


const GetBook = (data) => {
  return new Promise(async (resolve, reject) => {
    let token = await Token.getToken()
    const req = {
      method: 'get',
      url: `${process.env.kohaBaseUrl}/biblios/${data.id}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    axios(req)
      .then((resp) => {
        resolve(resp.data)
      }).catch((err) => {
        reject(err)
      })
  })
}
const GetItem = (data) => {
  return new Promise(async (resolve, reject) => {
    let token = await Token.getToken()
    const req = {
      method: 'get',
      url: `${process.env.kohaBaseUrl}/biblios/${data.id}/items`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    axios(req)
      .then((resp) => {
        resolve(resp.data)
      }).catch((err) => {
        reject(err)
      })
  })
}

const GetItemById = (data) => {
  return new Promise(async (resolve, reject) => {
    let token = await Token.getToken()
    const req = {
      method: 'get',
      url: `${process.env.kohaBaseUrl}/items/${data.id}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    axios(req)
      .then((resp) => {
        resolve(resp.data)
      }).catch((err) => {
        reject(err)
      })
  })
}



const SearchBook = (data) => {
  return new Promise(async (resolve, reject) => {
    if (data.txt != "") {
      const resPerPage = 5;
      const page = data.page || 1;
      const numOfItems = await Book.count({ name: { '$regex': data.txt } });
      if (numOfItems < resPerPage) {
        await Book.find({ name: { '$regex': data.txt } }).then((resp) => {
          resolve({
            CurrentPage: 1,
            TotalPages: 1,
            Search: data.txt,
            TotalBooks: numOfItems,
            data: resp
          })
        }).catch((err) => {
          reject(err)
        })
      } else {
        console.log((resPerPage * page))
        await Book.find({ name: { '$regex': data.txt } }).skip((resPerPage * page) - resPerPage)
          .limit(resPerPage).then(async (resp) => {
            resolve({
              CurrentPage: page,
              TotalPages: Math.ceil(numOfItems / resPerPage),
              Search: data.txt,
              TotalBooks: numOfItems,
              data: resp
            })
          }).catch((err) => {
            console.log(err);
            reject(err);
          })
      }
    } else {
      reject({
        message: "Please enter a text"
      })
    }
  })
}
const SearchBook1 = (data) => {
  return new Promise(async (resolve, reject) => {
    let token = await Token.getToken();
    let books = [];
    let booksKoha = [];
    books = await Book.find({ name: { '$regex': data.txt } }).then((resp) => {
      console.log(books)
      books.forEach(item => {
        let id = item.biblioId;
        const req = {
          method: 'get',
          url: `${process.env.kohaBaseUrl}/biblios/${id}`,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        axios(req).then((resp) => {
          booksKoha.push(resp.data)
          console.log(booksKoha)
        }).catch((err) => {
          console.log(err);
          reject(err);
        })
      })
      //resolve(booksKoha)
      resp.json(booksKoha);
    }).catch((error) => {
      reject(error)
    })
  })
}


module.exports = {
  GetBook,
  GetItem,
  GetItemById,
  SearchBook,
  SearchBook1
}
