const mongoose = require('mongoose')

export const ShortenedUrlModelName = 'ShortenedUrl'

export const ShortenedUrlSchema = new mongoose.Schema(
  {
    shortenedUrl: { type: String },
    originalUrl: { type: String, require: true },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      set: () => {
        return new Date()
      }
    },
    clicksCounter: { type: Number, default: 0 }
  },
  {
    collection: ShortenedUrlModelName
  }
)
