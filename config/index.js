const dotenv = require('dotenv')

dotenv.config()

module.exports ={
    MONGODB_URI:process.env.MONGODB_URI,
    PORT:process.env.PORT,
    JWT_SECRECT:process.env.JWT_SECRECT,
    DOMAIN:process.env.DOMAIN
}