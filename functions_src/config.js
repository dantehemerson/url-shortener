require('dotenv').config()

export const config = {
  MONGO_URL: process.env.MONGO_URL
}
console.log("Dante: config", config)
