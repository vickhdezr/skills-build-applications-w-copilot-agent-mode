import { Router } from 'express'
import healthRouter from './health'
import debugRouter from './debug'

const router = Router()

router.use('/health', healthRouter)
router.use('/debug', debugRouter)

export default router
