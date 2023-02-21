const UserModel = require("./user.model")

class UserController {

    async findAndCountAll(req, res, next) {
        try {
            const { take = 10, skip = 0 } = req.query;
            const result = await UserModel.findAndCountAll({ limit: parseInt(take), offset: parseInt(skip) })
            res.status(200).send(result)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const result = await UserModel.create(req.body)
            res.status(201).send(result)
        } catch (error) {
            next(error)
        }
    }

    async findById(req, res, next) {
        try {
            const result = await UserModel.findByPk(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        try {
            const result = await UserModel.findByPk(res.locals.user.userId)
            res.status(200).send(result)
        } catch (error) {
            next(error)
        }
    }

    async findByIdAndUpdate(req, res, next) {
        try {
            const result = await UserModel.update({ ...req.body }, { where: { userId: req.params.id } })
            console.log(result)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    async findByIdAndDelete(req, res, next) {
        try {
            const result = await UserModel.destroy({ where: { userId: req.params.id } })
            console.log(result)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()