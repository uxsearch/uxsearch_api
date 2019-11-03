import express from 'express'
import uxerRouter from 'api/modules/uxers/route'
import authenRouter from 'api/modules/authen/route'
import experimenterRouter from 'api/modules/experimenters/route'

const router = express.Router()

router.use('/uxer', uxerRouter)
router.use('/authen', authenRouter)
router.use('/experimenter', experimenterRouter)

export default router