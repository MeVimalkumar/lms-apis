const CourseModel = require('./course.model')

class CourseController {
    async findAll(req, res, next) {
        try {
            const { take = 10, skip = 0 } = req.query;
            const result = await CourseModel.findAll({ limit: parseInt(take), offset: parseInt(skip) })
            res.status(200).send(result)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const body = req.body
            body.userId = res.locals.user.userId
            const result = await CourseModel.create(req.body)
            res.status(201).send(result)
        } catch (error) {
            next(error)
        }
    }

    async findById(req, res, next) {
        try {
            const result = await CourseModel.findByPk(req.params.id)
            res.status(200).send(result)
        } catch (error) {
            next(error)
        }
    }

    async findByIdAndUpdate(req, res, next) {
        try {
            const result = await CourseModel.update({ ...req.body }, { where: { courseId: req.params.id } })
            console.log(result)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    async findByIdAndDelete(req, res, next) {
        try {
            const result = await CourseModel.destroy({ where: { courseId: req.params.id } })
            console.log(result)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CourseController()