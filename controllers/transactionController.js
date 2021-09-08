const {User, Product, Transaction} = require('../models')

class TransactionController {

    static addTransaction(req, res, next) {
        const newTrx = {
            user_id: req.user.id,
            product_id: req.params.product_id,
            amount: req.body.amount,
        }

        Transaction.create(newTrx)
            .then((trx) => {
                res.status(201).json(trx)
            })
            .catch((err) => {
                res.status(400).json({message: err.message})
            })

    }

    static showTransaction(req, res, next) {
        Transaction.findAll({
            where: {
                user_id : req.params.user_id
            },
            include: Product
        })
            .then((data) => {
                // console.log(data);
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(404).json({message: err.message})
            })
    }

    static patchTransaction(req, res, next) {
        const id = req.params.id
        const updatedTrx= {
            amount: req.body.amount
        }
        Transaction.update(updatedTrx, {
            where: {
                order_id: +id
            }
        })
            .then((trx) => {
                res.status(200).json({trx, message: 'Update Transaction success'})
            })
            .catch((err) => {
                next(err)
            })
    }

    static deleteTransaction(req, res, next) {
        const id = req.params.id
        Transaction.destroy({
            where: {
                order_id: +id
            }
        })
            .then((trx) => {
                res.status(200).json({trx, message: 'Delete Transaction success'})
            })
            .catch((err) => {
                next(err)
            })
    }

}

module.exports = TransactionController