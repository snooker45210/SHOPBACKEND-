const Shop = require('../models/shop')
const config = require('../config/index')
const Menu = require('../models/menu')

exports.index = async (req, res, next) => {

    
    //  await setting.save()
     const shop = await Shop.find().select('name photo location ').sort({_id:-1 });
     const shopWithPhotoDomain = await shop.map((shop, index) => {
         return{
             id : shop._id,
             name : shop.name,
             photo : config.DOMAIN + '/images/' + shop.photo,
             location : shop.location
         }
     });
    
    return res.status(200).json ({   
        data:shopWithPhotoDomain
    })
}

exports.menu = async(req , res, next) => {
    // res.send('OK')
    // const menu = await menu.find()
    // const menu = await Menu.find().select('+name-price')
    // const menu = await Menu.find().where('price').gte(130); // มากกว่า
    // const menu = await Menu.find().where('price').lte(130); // น้อยกว่า
    // const menu = await Menu.find({price : { $get: 100 }});
    const menu = await Menu.find().populate('shop' ,'name location').sort({price:+1 });// +น้อย-มาก

    return res.json({
        data:menu
    })
}

exports.getShopWithMenu = async (req, res, next) => {

    const shopWithMenu = await Shop.findOne({_id:req.params.id }).populate('menus');
    

    return res.json({
        message : shopWithMenu
    })
}

exports.store = async (req , res , next) => {

    try {
        //สร้างตัวแปรเก็บข้อมูลนำไปใช้
    let shop = new Shop(req.body)
    
    //ทำการบันทึกข้อมูลที่จะใส่เข้าไป
    await shop.save()


   res.status(201).json ({
   message: "บันทึกสำเร็จ!!"
});

    } catch (error) {
      next(error)  
    }
}

