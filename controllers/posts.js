import { Post } from "../models/post.js";

function index(req, res) {
  Post.find({}).populate('author')
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
  req.body.author = req.user.profile._id
  Post.create(req.body)
    .then(post => {
      res.redirect('/posts')
    })
    .catch(err => {
      res.redirect('/posts')
    })
}


function showPost(req, res) {
  Post.findById(req.params.postId).populate([{ path: 'author' }, { path: 'comments.author' }])
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


function addComment(req, res) {
  Post.findById(req.params.postId)
    .then(post => {
      req.body.author = req.user.profile._id
      post.comments.push(req.body)
      post.save()
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

function updateComment(req, res) {
  // Author can edit comment
  Post.findById(req.params.postId)
    .then(post => {
      const comment = post.comments.id(req.params.commentId)
      if (comment.author.equals(req.user.profile._id)) {
        comment.set(req.body)
        post.save()
          .then(() => {
            res.redirect(`/posts/${post._id}`)
          })
          .catch(err => {
            console.log(err);
            res.redirect(`/posts`)
          })
      } else {
        throw new Error("'🚫 Not authorized 🚫'")
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts')
    })
}

function deleteComment(req, res) {
  Post.findById(req.params.postId)
    .then(post => {
      const comment = post.comments.id(req.params.commentId)
      // The author and admin can delete the comment
      if (comment.author.equals(req.user.profile._id) || req.user?.profile.isAdmin) {
        post.comments.remove(comment)
        post.save()
          .then(() => {
            res.redirect(`/posts/${post._id}`)
          })
          .catch(err => {
            console.log(err);
            res.redirect(`/posts/${post._id}`)
          })
      } else {
        throw new Error('🚫 Not authorized 🚫')
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts')
    })
}

function pendingPosts(req, res) {
  Post.find({})
    .then(posts => {
      let newPosts
      posts.forEach(post => {
        if (post.approved === false) {
          newPosts.push(post)
        }
      });
      console.log(newPost.length);
      if (req.user?.profile.isAdmin) {
        res.render('posts/pendingPosts', {
          posts: newPosts,
          title: 'Pending Posts'
        })
      } else {
        throw new Error('🚫 Not authorized 🚫')
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect('/posts')
    })
}

export { index, newPost, createPost, showPost, editPost, updatePost, deletePost, addComment, updateComment, deleteComment, pendingPosts }