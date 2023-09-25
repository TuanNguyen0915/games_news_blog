import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: { type: String, require: true },
  author: { type: Schema.Types.ObjectId, ref: 'Profile' }
})


const postSchema = new Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  comment: [commentSchema],
  author: { type: Schema.Types.ObjectId, ref: 'Profile' }
})

const Post = mongoose.model("Post", postSchema)


export { Post }