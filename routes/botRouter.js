const Router = require('express')
const router = new Router()
const botController = require('../controllers/botController')

router.post('/web-data', botController.send)

module.exports = router
