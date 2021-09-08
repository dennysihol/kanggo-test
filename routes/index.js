const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const productRouter = require('./product')
const transactionRouter = require('./transaction')
const paymentRouter = require('./payment')


router.use(userRouter)
router.use('/products', productRouter)
router.use('/transactions', transactionRouter)
router.use('/payments', paymentRouter)



module.exports = router