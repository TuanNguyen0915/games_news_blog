import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as postsCtrl from '../controllers/posts.js'


const router = Router()

router.get('/', postsCtrl.index)
router.get('/new', postsCtrl.newPost)
router.get('/:postId', postsCtrl.showPost)
router.get('/:postId/edit', postsCtrl.editPost)

router.put('/:postId', postsCtrl.updatePost)
router.post('/', isLoggedIn, postsCtrl.createPost)

router.delete('/:postId', postsCtrl.deletePost)
export {
  router
}


