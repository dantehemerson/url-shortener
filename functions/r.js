require('dotenv').config()

const mongoose = require('mongoose')
const { ShortenedUrlModelName, ShortenedUrlSchema } = require('../functions_src/shortenedUrl.schema')

const MONGO_URL = process.env.MONGO_URL

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

let conn = null

const createResponse = (status, body) => {
  let bodyRes
  if (typeof body === 'string') {
    bodyRes = body
  } else {
    bodyRes = JSON.stringify(body)
  }

  return {
    statusCode: status,
    headers,
    body: bodyRes,
  }
}

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  if (conn === null) {
    conn = await mongoose.createConnection(MONGO_URL, {
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
    })
    conn.model(ShortenedUrlModelName, ShortenedUrlSchema)
  }

  if (event.httpMethod !== 'GET') {
    callback(null, createResponse(400, 'Only GET method is accepted.'))
    return
  }

  // console.log(event)
  console.log("Dante: exports.handler -> event", event)
  const ItemModel = conn.model(ShortenedUrlModelName)

  let items = await ItemModel.find({}, { __v: false })

  callback(null, createResponse(200, items))
}
