import express from 'express'
import uxerRouter from 'api/modules/uxers/route'

const router = express.Router()

router.use('/uxers', uxerRouter)

export default router