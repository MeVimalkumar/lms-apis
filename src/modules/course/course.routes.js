const courseController = require('./course.controller')

const router = require('express').Router()

router.route('/')
    .get((...args) => courseController.findAll(...args))
    .post((...args) => courseController.create(...args))

router.route('/:id')
    .get((...args) => courseController.findById(...args))
    .put((...args) => courseController.findByIdAndUpdate(...args))
    .delete((...args) => courseController.findByIdDelete(...args))

module.exports = router