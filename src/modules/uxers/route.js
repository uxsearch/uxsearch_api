import express from 'express'
import uxersController from './controller'

const router = express.Router()

router.get('/', uxersController.getAll)

export default router