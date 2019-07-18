import express from 'express'
import uxersController from 'api/modules/uxers/controller'

const router = express.Router()

router.get('/', uxersController.getAll)
router.get('/:id', uxersController.getUxerById)
router.post('/add', uxersController.create)
router.put('/:id/edit', uxersController.update)

export default router