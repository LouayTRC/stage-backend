const express=require('express');
const router=express.Router();
const clientCtrl=require('../controllers/ClientController');
const authenticate=require('../middleware/authenticate');
const onlyAdmin=require('../middleware/onlyAdmin');

router.put('/pwd',clientCtrl.changePassword)
router.put('/',clientCtrl.updateClient)
router.get('/all',onlyAdmin,clientCtrl.getAllClients)
router.get('/',clientCtrl.getClient)

module.exports=router;