import mongoose from 'mongoose'

const Schema = mongoose.Schema

const quoteSchema = new Schema({
  content: String,
  author: String
})

const Quote = mongoose.model('Quote', quoteSchema)

export {
  Quote
}
