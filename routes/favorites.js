const express=require('express');
const router=express.Router();
const favCtrl=require('../controllers/favoritesController');
const authenticate=require('../middleware/authenticate');


router.post('/create',authenticate,favCtrl.createPlaylist);
router.put('/rename/:id/:name',authenticate,favCtrl.renamePlaylist);
router.put('/:id',authenticate,favCtrl.addProduct);
router.get('/:id?',authenticate,favCtrl.getPLaylists);
router.delete('/:id/:index',authenticate,favCtrl.deleteProduct);
router.delete('/:id',authenticate,favCtrl.deletePlaylist);

module.exports=router;