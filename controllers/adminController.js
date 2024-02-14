const userController=require('../controllers/UserController');
const Admin = require('../models/Admin');
const User=require('../models/User')
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

exports.getAllAdmins=(req,res,next)=>{
    Admin.find()
    .then(async (admins)=>{
        for (const admin in admins) {
            admins[admin].user=await userController.getUser(admins[admin].user);
        }
        return res.status(200).json(admins)
    })
    .catch(error=>res.status(400).json({error}))
}