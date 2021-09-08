const { Product } = require('../models/index')

class ProductController {
    
    static addProduct(req, res) {
        // const body = req.body
        const newProduct = {
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty
        }

        Product.create(newProduct)
            .then((product) => {
                res.status(201).json({product, message: "New Product Added"})
            })
            .catch((err) => {
                res.status(401).json({message: "Not Authorized"})
            })
    }

    static showProducts(req, res, next) {
        Product.findAll()
            .then((product) => {
                res.status(200).json({product})
            })
            .catch((err) => {
                next(err)
            })
    }

    static getProduct(req, res, next) {
        const id = req.params.id
        Product.findOne({
            where: {
                id: +id
            }
        })
            .then((product) => {
                if(product){
                    res.status(200).json({product})
                } else {
                    next({
                        code: 404,
                        message: "Product not Found"
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static putProduct(req, res, next) {
        const id = req.params.id
        const body = req.body
        const editedProduct = {
            name: body.name,
            price: +body.price,
            qty: body.qty
        }

        Product.update(editedProduct, {
            where: {
                id: +id
            }
        })
            .then((product) => {
                if(product){
                    res.status(200).json({product})
                } else {
                    next({
                        code: 404,
                        message: "Product not Found"
                    })
                }
            })
            .catch((err) => {
                next(err)
            })

    }

    static deleteProduct(req, res, next) {
        const id = req.params.id
        Product.destroy({
            where: {
                id: +id
            }
        })
            .then((product) => {
                if(product){
                    res.status(200).json({message: "Product has been deleted"})
                } else {
                    next({
                        code: 404,
                        message: "Product not Found"
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }


}

module.exports = ProductController
