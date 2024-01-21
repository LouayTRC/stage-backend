const express=require('express');
const router=express.Router();
const clientCtrl=require('../controllers/ClientController');
const onlyAdmin=require('../middleware/onlyAdmin');
const authenticate=require('../middleware/authenticate');


router.post('/signup',clientCtrl.signup);
router.get('/:_id?',authenticate,onlyAdmin,clientCtrl.getClients);

module.exports=router;