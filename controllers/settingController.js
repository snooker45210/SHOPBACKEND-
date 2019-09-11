const Setting = require('../models/setting')

exports.index = async (req, res, next) => {

    
    //  await setting.save()
     const setting = await Setting.find();
    //  console.log(res.body)
    res.status(200).json ({   
        data:setting
    })
}