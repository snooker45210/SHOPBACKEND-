const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const schema = new mongoose.Schema({
    name:{type:String, required:true, trim:true },
   age:{type:Number, required:true},
    create:{type:String, required:true, trim:true }
    
})
const Setting = mongoose.model('Setting', schema);
module.exports = Setting;