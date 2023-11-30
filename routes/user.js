const express  = require('express')

//controller functions
const { signupUser, signinUser, searchUser } = require('../controllers/userController')

const router = express.Router()

//signup
router.post('/signup', signupUser)

//signin
router.post('/signin', signinUser)

//search user
router.get('/search', searchUser)

module.exports = router