const express=require('express');
const router=express.Router();
const favCtrl=require('../controllers/favoritesController');



router.post('/create',favCtrl.createPlaylist);
router.put('/rename/:id/:name',favCtrl.renamePlaylist);
router.put('/:id',favCtrl.addProduct);
router.get('/:id?',favCtrl.getPLaylists);
router.delete('/:id/:index',favCtrl.deleteProduct);
router.delete('/:id',favCtrl.deletePlaylist);

module.exports=router;