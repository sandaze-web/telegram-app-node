const Router = require('express')
const router = new Router()
const clotherRouter = require('./clotherRouter')
const basketRouter = require('./basketRouter')
const botRouter = require('./botRouter')

// router.use('/user', userRouter)
// router.use('/type', typeRouter)
// router.use('/brand', brandRouter)
router.use('/cloth', clotherRouter)
router.use('/basket', basketRouter)
router.use('/bot', botRouter)

module.exports = router
