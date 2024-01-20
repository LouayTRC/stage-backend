const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.login=(req,res,next)=>{
    User.findOne({username:req.body.username})
        .then(user=>{
            if(!user){
                return res.status(401).json({message:"login/mdp incorrect"});
            }
            bcrypt.compare(req.body.password,user.password)
                .then(valid=>{
                    console.log("valid",valid);
                    if(!valid){
                        return res.status(401).json({message:"login/mdp incorrect"});
                    }
                    res.status(200).json({
                        user_id:user._id,
                        user_Role:user.role,
                        token:jwt.sign(
                            {
                                user_id:user._id,
                                user_Role:user.role
                            },
                            'f1sd3f12dsg1d65fs165f1ds6g1re6f1sq6f1sd65f1sd65srt1rs53fzeyehyutyj',
                            {expiresIn:'24h'}
                        )
                    });
                })
                .catch(error=>res.status(500).json({error}));
        })
        .catch(error=>res.status(500).json({error}));
}

exports.createUser=(userData)=>{
  return bcrypt.hash(userData.password,10)
    .then(hash => {
        const user=new User({
            mail:userData.mail,
            username:userData.username,
            password:hash,
            fullname:userData.fullname,
            date_naissance:userData.date_naissance,
            pdp:userData.pdp
        })
        return user;
    })
}