const {User} = require('../models/index')
const {compare} = require('../middlewares/password')
const { generateToken } = require('../middlewares/jwt')

class UserController {

    static register(req, res, next) {
        const body = req.body
        const newUser = {
            name: body.name,
            email: body.email,
            password: body.password
        }

        User.create(newUser)
            .then((user) => {
                if(user) {
                    res.status(201).json({ user })
                } else {
                    throw new Error()
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static login(req, res, next){
        const email = req.body.email
        const password = req.body.password

        User.findOne({
            where: {
                email: email
            }
        })
            .then((user) => {
                if(user) {
                    let compared = compare(password, user.password)
                    if(compared) {
                        let payload = {
                            id: user.id,
                            email: user.email,
                            role: user.role
                        }

                        res.status(200).json({...payload, access_token: generateToken(payload)})
                    } else {
                        res.status(401).json({message: 'Invalid Email or Password'})
                    }
                } else {
                    res.status(401).json({message: 'Invalid Email or Password'})
                }
            })
            .catch((err) => {
                res.status(401).json({message: 'Invalid Email or Password'})
            })

    }

}

module.exports = UserController