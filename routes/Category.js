const express=require('express');
const router=express.Router();
const categoryCtrl=require('../controllers/categoryController');
const onlyAdmin=require('../middleware/onlyAdmin');
const authenticate=require('../middleware/authenticate');

router.post('/',authenticate,onlyAdmin,categoryCtrl.createCategory);
router.delete('/:id',authenticate,onlyAdmin,categoryCtrl.deleteCategory);
router.get('/',categoryCtrl.getCategories);

module.exports=router;