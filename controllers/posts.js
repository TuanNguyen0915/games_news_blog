import { Post } from "../models/post.js";

function index(req, res) {
  Post.find({})
    .then(posts => {
      res.render('posts/index', {
        posts,
        title: 'All Posts'
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts')
    })
}


function newPost(req, res) {
  res.render('posts/new', {
    title: "New Post"
  })
}

function createPost(req, res) {
  Post.create(req.body)
    .then(post => {
      res.redirect('/posts')
    })
    .catch(err => {
      res.redirect('/posts')
    })
}


function showPost(req, res) {
  Post.findById(req.params.postId)
    .then(post => {
      res.render('posts/show', {
        post,
        title: "Post details"
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts')
    })
}

function editPost(req, res) {
  Post.findById(req.params.postId)
    .then(post => {
      res.render('posts/edit', {
        post,
        title: "Edit post"
      })
    })
}


function updatePost(req, res) {
  Post.findById(req.params.postId)
    .then(post => {
      post.updateOne(req.body)
        .then(() => {
          res.redirect(`/posts/${post._id}`)
        })
        .catch(err => {
          console.log(err);
          res.redirect('/posts')
        })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts')
    })
}


function deletePost(req, res) {
  Post.findById(req.params.postId)
    .then(post => {
      post.deleteOne()
        .then(() => {
          res.redirect('/posts')
        })
        .catch(err => {
          console.log(err);
          res.redirect('/posts')
        })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts')
    })
}
export { index, newPost, createPost, showPost, editPost, updatePost, deletePost }