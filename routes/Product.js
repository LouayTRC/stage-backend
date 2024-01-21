const express=require('express');
const ProductCtrl = require('../controllers/productController');
const router=express.Router();
const onlyAdmin=require('../middleware/onlyAdmin');
const authenticate=require('../middleware/authenticate');

router.post('/',authenticate,onlyAdmin,ProductCtrl.createProduct);

router.get('/:_id?',ProductCtrl.getProduct);

router.put('/:_id',authenticate,onlyAdmin,ProductCtrl.updateProduct);


router.delete('/:_id',authenticate,onlyAdmin,ProductCtrl.deleteProduct);

module.exports=router;