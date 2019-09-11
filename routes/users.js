const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator')
const passportJWT = require('../middlewares/passportJWT')


// localhost:3000/api/users/register
router.post('/register',
body('name').not().isEmpty().withMessage('Please input name'),

body('email').not().isEmpty().withMessage('Please input Email')
    .isEmail().withMessage('Wrong format Email'),

body('password').not().isEmpty().withMessage('Please input Password')
    .isLength({min: 3}).withMessage('Password is more than 3 character')  

,userController.register);

router.post('/login', userController.login);

//localhost:3000/api/shop
router.get('/me', passportJWT.isLogin,userController.me);

module.exports = router;
