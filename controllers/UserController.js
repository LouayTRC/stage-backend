const User=require('../models/User');
const bcrypt=require('bcrypt');




exports.createUser=(userData)=>{
  return bcrypt.hash(userData.password,10)
    .then(hash => {
        const user=new User({
            mail:userData.mail,
            username:userData.username,
            password:hash,
            fullname:userData.fullname,
            birthday:userData.birthday,
            pdp:userData.pdp
        })
        return user;
    })
}

exports.getUser=async (userId)=>{
    const user=await User.findOne({_id:userId});
    return user;
}

