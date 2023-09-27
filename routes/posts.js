import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as postsCtrl from '../controllers/posts.js'


const router = Router()

router.get('/', postsCtrl.index)
router.get('/new', postsCtrl.newPost)
router.get('/:postId', postsCtrl.showPost)
router.get('/:postId/edit', isLoggedIn, postsCtrl.editPost)

router.put('/:postId', postsCtrl.updatePost)
router.put('/:postId/comment/:commentId', isLoggedIn, postsCtrl.updateComment)

router.post('/:postId/comment', isLoggedIn, postsCtrl.addComment)
router.post('/', isLoggedIn, isLoggedIn, postsCtrl.createPost)

router.delete('/:postId', isLoggedIn, postsCtrl.deletePost)
router.delete('/:postId/comment/:commentId', isLoggedIn, postsCtrl.deleteComment)


router.get('/pendingposts', postsCtrl.pendingPosts)
export {
  router
}


