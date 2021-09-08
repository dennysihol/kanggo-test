const express = require('express')
const TransactionController = require('../controllers/transactionController')
const { authenticate } = require('../middlewares/auth')
const router = express.Router()

router.use(authenticate)
router.post('/:product_id', TransactionController.addTransaction)
router.get('/:user_id', TransactionController.showTransaction)
router.patch('/:id', TransactionController.patchTransaction)
router.delete('/:id', TransactionController.deleteTransaction)

module.exports = router