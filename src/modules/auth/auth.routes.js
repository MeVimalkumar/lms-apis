const authController = require('./auth.controller')

const router = require('express').Router()

router.route('/login')
    .post((...args) => authController.login(...args))

router.route('/signup')
    .post((...args) => authController.signup(...args))


module.exports = router