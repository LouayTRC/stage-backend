const express=require('express');
const router=express.Router();
const categoryCtrl=require('../controllers/categoryController');

router.post('/',categoryCtrl.createCategory);
router.delete('/:id',categoryCtrl.deleteCategory);

module.exports=router;