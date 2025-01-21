const Router = require('express')
const router = new Router()
const clotherController = require('../controllers/clotherController')

router.post('/', clotherController.create)
router.get('/', clotherController.getAll)
router.get('/:id', clotherController.getOne)

module.exports = router
