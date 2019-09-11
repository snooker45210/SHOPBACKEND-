const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    name :{type:String, required:true, trim:true },
    price :{type:Schema.Types.Decimal128 },
    shop:{type:Schema.Types.ObjectId,  ref: 'shop' }

})

const Menu = mongoose.model('Menu', schema);
module.exports = Menu;
