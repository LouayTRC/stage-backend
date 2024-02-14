const express=require('express');
const authCtrl=require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const router=express.Router();

router.post('/login',authCtrl.login);
router.post('/signup',authCtrl.signup);
router.post('/verify',authCtrl.verifyToken);

module.exports=router;