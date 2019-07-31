import express from 'express'
import uxersController from 'api/modules/uxers/controller'
import projectController from 'api/modules/uxers/projects/controller'

const router = express.Router()

router.get('/', uxersController.getAll)
router.get('/:id', uxersController.getUxerById)
router.post('/add', uxersController.create)
router.put('/:id/edit', uxersController.update)

router.get('/:id/projects', projectController.getProjectByUxerId)

export default router