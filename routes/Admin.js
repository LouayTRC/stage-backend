const express=require('express');
const router=express.Router();
const adminCtrl=require('../controllers/adminController');


router.post('/',adminCtrl.createAdmin);

module.exports=router;