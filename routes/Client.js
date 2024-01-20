const express=require('express');
const router=express.Router();
const clientCtrl=require('../controllers/ClientController');

router.post('/signup',clientCtrl.signup);
router.get('/:_id',clientCtrl.getClient);

module.exports=router;