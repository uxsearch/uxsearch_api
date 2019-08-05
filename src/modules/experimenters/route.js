import express from 'express'
import experimenterController from 'api/modules/experimenters/controller'

const router = express.Router()

router.get('/', experimenterController.getAll)
router.get('/:id', experimenterController.getExperimentById)
router.post('/add', experimenterController.create)

export default router