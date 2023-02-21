const router = require('express').Router()
const userRoutes = require('../modules/user/user.routes')
const courseRoutes = require('../modules/course/course.routes')
const authRoutes = require('../modules/auth/auth.routes')
const { verifyToken } = require('./helpers')

router.use('/', authRoutes)
router.use('/user', verifyToken, userRoutes)
router.use('/course', verifyToken, courseRoutes)

module.exports = router;