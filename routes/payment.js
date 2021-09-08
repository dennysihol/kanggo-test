const express = require('express')
const PaymentController = require('../controllers/paymentController')
const { authenticate } = require('../middlewares/auth')
const router = express.Router()

router.use(authenticate)
router.post('/:order_id', PaymentController.addPayment)
router.get('', PaymentController.showPayment)

module.exports = router