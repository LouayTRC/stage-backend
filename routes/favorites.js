const express=require('express');
const router=express.Router();
const favCtrl=require('../controllers/favoritesController');

router.post('/',favCtrl.createPlaylist);
router.put('/:id/:idP',favCtrl.addProduct);
router.put('/rename/:id/:name',favCtrl.renamePlaylist);
router.get('/:id?',favCtrl.getPLaylists);
router.delete('/:id/:index',favCtrl.deleteProduct);
router.delete('/:id',favCtrl.deletePlaylist);

module.exports=router;