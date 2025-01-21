const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/', basketController.getAll)
router.post('/delete', basketController.delete)
router.post('/add', basketController.add)

module.exports = router
