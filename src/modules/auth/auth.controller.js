const { generateToken } = require("../../lib/helpers");
const UserModel = require("../user/user.model");

class AuthController {

    async login(req, res, next) {
        try {
            const user = await UserModel.scope('withPassword').findOne({ where: { email: req.body.email } })
            if (user && await user.comparePassword(req.body.password)) {
                const data = {
                    userId: user.userId
                }
                const token = generateToken(data)
                res.status(200).send({ token })
            } else {
                res.status(403).send({ message: 'Invalid Username or Password' })
            }
        } catch (error) {
            next(error);
        }
    }

    async signup(req, res, next) {
        try {
            const result = await UserModel.create(req.body)
            res.status(201).send(result)
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AuthController()