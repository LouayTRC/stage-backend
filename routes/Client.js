const express=require('express');
const router=express.Router();
const clientCtrl=require('../controllers/ClientController');
const authenticate=require('../middleware/authenticate');
const onlyAdmin=require('../middleware/onlyAdmin');

router.put('/',clientCtrl.updateClient)
router.get('/',onlyAdmin,clientCtrl.getAllClients)

module.exports=router;