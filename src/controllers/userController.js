const model = require("../models")
const sequelize = require("sequelize");

module.exports = {
    register: async (req, res, next) => {
        try {
            let checkUser = await model.users.findAll({
                where: {
                    email: req.body.email
                }
            })

            if (checkUser.length == 0) {
                if (req.body.password == req.body.confirmationPassword) {
                    delete req.body.confirmationPassword

                    let register = await model.users.create({
                        email: req.body.email,
                        password: req.body.password,
                        role: 1
                    })

                    return res.status(200).send({
                        success: true,
                        data: register,
                        message: "Register Successfull"
                    })
                } else {
                    return res.status(400).send({
                        success: false,
                        message: "Password Not Match"
                    })
                }

            } else {
                return res.status(400).send({
                    success: false,
                    message: "User Already Exist"
                })
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            let checkUser = await model.users.findAll({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            })
            if (checkUser.length) {
                let { username, email, password, role } = checkUser[0].dataValues

                return res.status(200).send({
                    success: true,
                    data: { username, email, password, role }
                })

            } else {
                return res.status(400).send({
                    success: false,
                    message: "incorrect password or email"
                })
            }

        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    keepLogin: async (req, res, next) => {
        try {
            let get = await model.users.findAll({
                where: {
                    email: req.body.email
                }
            })
            return res.status(200).send(get)
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    googleLogin: async (req, res, next) => {
        try {
            console.log(req.body);
        } catch (error) {
            
        }
    }
}