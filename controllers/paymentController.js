const {Transaction, Payment} = require('../models')

class PaymentController {

    static async addPayment(req, res) {
        
        const order_id = req.params.order_id
        const updatedTrx= {
            status: "paid"
        }
        
        Transaction.findOne({
            where: {
                id: order_id
            }
        })
        .then((data) => {
            const newPayment = {
                order_id: data.id,
                status: "paid",
                amount: data.amount
            }
            return Payment.create(newPayment)
        })
        .then((data2) => {
            if(data2.dataValues.status == "paid"){
                return Transaction.update(updatedTrx, {
                    where: {
                        id: order_id
                    }
                })
            }            
        })
        .then((data3) => {
            res.status(200).json(data3)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })          

    }

    static showPayment(req, res, next) {
        Payment.findAll()
            .then((data) => {
                // console.log(data);
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(404).json({message: err.message})
            })
    }

}

module.exports = PaymentController