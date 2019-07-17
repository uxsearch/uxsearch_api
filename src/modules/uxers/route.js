import express from 'express'
import uxersController from 'api/modules/uxers/controller'

const router = express.Router()

router.get('/', uxersController.getAll)

export default router