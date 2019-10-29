import experss from 'express'
import authenController from 'api/modules/authen/controller'

const router = experss.Router()

router.post('/signin', authenController.signIn)
router.get('/signout', authenController.signOut)

export default router