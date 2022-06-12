const Router = require('router')
const AuthController = require('../Controllers/authContoller')
const { body } = require('express-validator')

const router = Router()

// route for registraion method=POST ROUTE=/auth/register
router.post('/register', 
[

    body('firstname').isLength({min: 3}).withMessage("Name should greater then 3 characters."),
    body('email').isEmail().withMessage("Enter valid email id."),
    body('password').isLength({min:8}).withMessage("Password length should be of atleast 8 character long.")

],
AuthController().register)

// route for login method=POST ROUTE=/auth/login
router.post('/login', 
[
    body('email').isEmail().withMessage("Enter valid email id."),

],
 AuthController().login)

module.exports = router