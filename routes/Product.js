const express=require('express');
const ProductCtrl = require('../controllers/productController');
const router=express.Router();

router.post('/', ProductCtrl.createProduct);

router.get('/:_id?',ProductCtrl.getProduct);

router.put('/:_id',ProductCtrl.updateProduct);


router.delete('/:_id',ProductCtrl.deleteProduct);

module.exports=router;