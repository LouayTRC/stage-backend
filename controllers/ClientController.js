const Client = require('../models/Client');
const userCtrl = require('../controllers/UserController');
const User = require('../models/User');
const bcrypt=require('bcrypt');

exports.updateClient = async (req, res, next) => {
    const client = await Client.findOne({ user: req.auth.user_id })
    if (client._id == req.body._id) {
        Client.updateOne({ _id: client._id }, { ...req.body })
            .then(client => res.status(200).json(client))
            .catch(error => res.status(400).json(error))
    }
    else {
        res.status(401).json(error)
    }
}

exports.getAllClients = (req, res, next) => {
    Client.find()
        .then(async (clients) => {
            for (const client in clients) {
                clients[client].user = await userCtrl.getUser(clients[client].user);
            }
            return res.status(200).json(clients)
        })
        .catch(error => res.status(400).json({ error }))
}

exports.getClient = (req, res, next) => {
    Client.findOne({ user: req.auth.user_id })
        .then((async client => {
            console.log();
            client.user = await userCtrl.getUser(client.user);
            res.status(200).json(client)
        }))
        .catch((error) => res.status(500).json({ error }))
}
exports.changePassword = async (req, res, next) => {
    const user = await userCtrl.getUser(req.auth.user_id);
    bcrypt.compare(req.body.old,user.password)
    .then(valid=>{
        if(!valid){
            return res.status(401).json({message:"mdp incorrect"});
        }
        else{
            if (req.body.new == req.body.new1) {
                bcrypt.hash(req.body.new, 10)
                    .then(hash => {
                        User.updateOne({_id:user._id},{password:hash})
                        .then(()=>res.status(200).json({message:'update avec succes'}))
                        .catch(error=>res.status(500).json({error}))
                    })
                    .catch(error=>res.status(500).json({error}))
            }
            else{
                res.status(400).json({message:'new passwords are not compatible !'})
            }
        }
    })
    
    
}