const{User} = require('../models/index')
const {verifyToken} = require('./jwt')

const authenticate = (req, res , next) => {

    let {id, email} = verifyToken(req.headers.access_token)    

    User.findOne(
        {
            where: {
                email
            }
        }
    )
        .then((user) => {
            req.user = {id: user.id, email: user.email}
            next()

        })
        .catch((err) => {
            next({
                code: 401,
                message: "Unauthenticated"
            })
        })
}



module.exports = {authenticate}
