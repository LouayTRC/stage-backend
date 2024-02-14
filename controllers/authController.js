const User=require('../models/User');
const Client=require('../models/Client');
const userCtrl=require('../controllers/UserController');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


exports.login=(req,res,next)=>{
    User.findOne({username:req.body.username})
        .then(user=>{
            if(!user){
                return res.status(404).json({message:"login/mdp incorrect"});
            }
            bcrypt.compare(req.body.password,user.password)
                .then(valid=>{
                    if(!valid){
                        return res.status(401).json({message:"login/mdp incorrect"});
                    }
                    res.status(200).json({
                        user,
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

exports.signup = async (req, res, next) => {
    const user = await userCtrl.createUser(req.body)
    user.role = "CLIENT";
    await user.save()
    const client = new Client({
        user,
        phone: req.body.phone,
        adress: req.body.adress
    })
    client.save()
        .then((client) => res.status(201).json({ client, message: 'user created' }))
        .catch(error => res.status(400).json({ error }))
}

exports.verifyToken=(req,res,next)=>{
    const token = req.body.token;
    if(token){
        const decode = jwt.verify(token, 'f1sd3f12dsg1d65fs165f1ds6g1re6f1sq6f1sd65f1sd65srt1rs53fzeyehyutyj');
        console.log("decode",decode);
        res.status(200).json({
            login: true,
            data: decode
        });
    }else{
        res.status(400).json({
            login: false,
            data: 'error'
        });
    }
}
