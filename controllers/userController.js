const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')


exports.register = async (req, res, next) => {

     try {
        const { name, email, password } = req.body

        const errorValidation = validationResult(req)
        if (!errorValidation.isEmpty()) {
            const error = new Error('Please input required information')
            error.statusCode = 422;
            error.validation = errorValidation.array();
            throw error ;
            
        }


        const existMail = await User.findOne({ email : email })
    
        if(existMail){
            const error = new Error('This Email is not avalible')
            error.statusCode = 403;
            throw error;
            
            
            
        }
    
         let user = new User
    
         user.name = name
         user.email = email
         user.password = await user.encryptPassword(password)
    
         await user.save()
        // const user = await User.find();
        //  console.log(res.body)s
        res.status(201).json ({   
            data:user
        })
         
     } catch (error) {
         next(error);
     }
}

exports.login = async (req, res , next ) => {
    try {
        const {email , password } = req.body
        const user = await User.findOne({ email : email });
        if (!user) {
            const error = new Error('Email not found')
            error.statusCode = 401;
            throw error;   
        }
        const vaidPassword = await user.vaidPassword( password );
        if (!vaidPassword) {
            const error = new Error('Password or Email Incorrect')
            error.statusCode = 401;
            throw error;   
      
    
        }
        const token = jwt.sign({ id: user._id, role: user.role}, config.JWT_SECRECT, {expiresIn: '5 days'});
        const expires_in = jwt.decode(token);

         res.json({
            access_token: token,
            expires_in: expires_in,
            token_type: 'Bearer',
            message: 'logined'
        })

        

    } catch (error) {
        next(error)
        
    }

}

exports.me = async (req, res , next) =>{
    
    return res.json({
        user:{
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role:  req.user.role
        }
    })
}