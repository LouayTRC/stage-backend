const express=require('express');
const router=express.Router();
const cmmdCtrl=require('../controllers/Commandcontroller');
const onlyAdmin=require('../middleware/onlyAdmin');

router.post('/',cmmdCtrl.createCommand);
router.get('/:_id?',cmmdCtrl.getCommands);
router.put('/accept/:_id',onlyAdmin,cmmdCtrl.acceptCommand);
router.put('/:_id',cmmdCtrl.updateCommand);
router.delete('/:_id',cmmdCtrl.annuleCommand);


module.exports=router;