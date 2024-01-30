const express=require('express');
const router=express.Router();
const cmmdCtrl=require('../controllers/Commandcontroller');
const onlyAdmin=require('../middleware/onlyAdmin');
const authenticate=require('../middleware/authenticate');


router.post('/',cmmdCtrl.createCommand);
router.get('/myCommands',authenticate,cmmdCtrl.getCommands);
router.put('/accept/:_id',authenticate,onlyAdmin,cmmdCtrl.acceptCommand);
router.delete('/:_id',cmmdCtrl.annuleCommand);


module.exports=router;