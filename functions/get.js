const { getMongoConnection } = require('../functions_src/mongo')
const { createResponse } = require('../functions_src/utils')
const  { ShortenedUrlModelName } = require('../functions_src/shortenedUrl.schema')

let conn = null

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  if (event.httpMethod === 'OPTIONS') {
    callback(null, createResponse(200, 'sucks'))
    return
  }

  conn = conn || await getMongoConnection()

  if (event.httpMethod !== 'GET') {
    callback(null, createResponse(400, 'Only GET method is accepted.'))
    return
  }

  const ShortenedUrlModel = conn.model(ShortenedUrlModelName)

  const urlCode = event.path.slice(24)

  const shortenedUrl = await ShortenedUrlModel.findOne({
    urlCode
  })

  if(!shortenedUrl) {
    callback(null, createResponse(404, 'Shotened URL not found'))
    return
  }

  callback(null, createResponse(200, shortenedUrl))
}
