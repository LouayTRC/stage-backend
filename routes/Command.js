const express=require('express');
const router=express.Router();
const cmmdCtrl=require('../controllers/Commandcontroller');
const onlyAdmin=require('../middleware/onlyAdmin');
const authenticate=require('../middleware/authenticate');
const authorize=require('../middleware/authorize')

router.post('/',authenticate,authorize(['CLIENT']),cmmdCtrl.createCommand);
router.get('/myCommands',authenticate,cmmdCtrl.getCommands);
router.get('/:id',authenticate,onlyAdmin,cmmdCtrl.getCommandById);
router.put('/accept/:_id',authenticate,onlyAdmin,cmmdCtrl.acceptCommand);
router.put('/refuse/:_id',authenticate,onlyAdmin,cmmdCtrl.refuseCommand);


module.exports=router;