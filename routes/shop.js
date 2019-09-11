const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController')


// localhost:3000/api/setting
router.get('/',shopController.index);

//localhost:3000/api/shop/menu
router.get('/menu',shopController.menu);

//localhost:3000/api/shop/??
router.get('/:id',shopController.getShopWithMenu);

//localhost:3000/api/shop
router.post('/', shopController.store);



 module.exports = router;
