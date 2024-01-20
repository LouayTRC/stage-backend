const admin=require('../models/Admin');
const userController=require('../controllers/UserController');
const Admin = require('../models/Admin');

exports.createAdmin= async (req,res,next)=>{
    const createdUser= await userController.createUser(req.body)
    createdUser.role="ADMIN"
    await createdUser.save()
    const admin=new Admin({
        user:createdUser
    })
    admin.save()
    .then(admin=> res.status(201).json({admin,message:"admin created"}))
    .catch(error=>res.status(400).json({error}));
}