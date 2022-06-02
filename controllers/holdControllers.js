require("dotenv").config();
const axios = require("axios")
const qs = require("qs")
const Token = require("./token");



const PlaceHold = (data) => {
  return new Promise(async (resolve, reject) => {
    let token = await Token.getToken();
    //console.log(data)
    const req = {
      method: 'post',
      url: `${process.env.kohaBaseUrl}/holds`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: data
    }
    axios(req)
      .then((resp) => {
        resolve(resp.data)
      }).catch((err) => {
        if (err.response.status === 403) {
          reject({
            Error:'Item already on hold',
            err,
          })
        }
        if (err.response.status === 400) {
          reject({
            Error:'Missing parameters',
            err
          })
        }
      })
  })
}
const CancelHold = (data) => {
  return new Promise(async (resolve, reject) => {
    let token = await Token.getToken();
    //console.log(data)
    const req = {
      method: 'delete',
      url: `${process.env.kohaBaseUrl}/holds${data.hold_id}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: data
    }
    axios(req)
      .then((resp) => {
        resolve(resp.data)
      }).catch((err) => {
        if (err.response.status === 403) {
          reject({
            Error:'hold not exist',
            err,
          })
        }
        if (err.response.status === 400) {
          reject({
            Error:'Missing parameters',
            err
          })
        }
      })
  })
}
const ListHolds = () => {
    return new Promise(async (resolve, reject) => {
      let token = await Token.getToken();
      const req = {
        method: 'get',
        url: `${process.env.kohaBaseUrl}/holds`,
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


module.exports = {
  
  PlaceHold,
  CancelHold,
  ListHolds
 
}
