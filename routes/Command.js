const express=require('express');
const router=express.Router();
const cmmdCtrl=require('../controllers/Commandcontroller');

router.post('/',cmmdCtrl.createCommand);
router.get('/client',cmmdCtrl.getCommandsByClient);
router.get('/:_id?',cmmdCtrl.getCommands);
router.put('/:_id/accept',cmmdCtrl.acceptCommand);
router.put('/:_id',cmmdCtrl.updateCommand);
router.delete('/:_id',cmmdCtrl.annuleCommand);


module.exports=router;