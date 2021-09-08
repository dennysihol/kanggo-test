const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const {authenticate} = require('../middlewares/auth')

router.get('', ProductController.showProducts)
router.use(authenticate)
router.post('', ProductController.addProduct)
router.get('/:id', ProductController.getProduct)
router.put('/:id', ProductController.putProduct)
router.delete('/:id', ProductController.deleteProduct)


module.exports = router
