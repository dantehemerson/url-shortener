require('dotenv').config()

const mongoose = require('mongoose')
const shortid = require('shortid')
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
    bodyRes = JSON.stringify(body || {})
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

  if (event.httpMethod === 'OPTIONS') {
    callback(null, createResponse(200, 'sucks'))
    return
  }

  if (event.httpMethod !== 'POST') {
    callback(null, createResponse(400, 'Only POST methods are allowed'))
    return
  }

  if (!event.body) {
    callback(null, createResponse(400, 'body is required'))
    return
  }

  const body = JSON.parse(event.body)
  const originalUrl = body.originalUrl
  if (!originalUrl) {
    callback(null, createResponse(400, 'Url is required'))
    return
  }

  const ItemModel = conn.model(ShortenedUrlModelName)


  let doc = await ItemModel.create(
    {
      originalUrl,
      urlCode: shortid.generate()
    }
  )

  callback(null, createResponse(200, doc))
}
