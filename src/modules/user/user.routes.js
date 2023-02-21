const userController = require('./user.controller');

const router = require('express').Router()

router.route('/me')
    .get((...args) => userController.findOne(...args))

router.route('/')
    .get((...args) => userController.findAndCountAll(...args))
    .post((...args) => userController.create(...args))

router.route('/:id')
    .get((...args) => userController.findById(...args))
    .put((...args) => userController.findByIdAndUpdate(...args))
    .delete((...args) => userController.findByIdAndDelete(...args))

module.exports = router;