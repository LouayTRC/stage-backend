const Client = require('../models/Client');
const userCtrl = require('../controllers/UserController');


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

exports.getAllClients=(req,res,next)=>{
    Client.find()
    .then(async (clients)=>{
        for (const client in clients) {
            clients[client].user=await userCtrl.getUser(clients[client].user);
        }
        return res.status(200).json(clients)
    })
    .catch(error=>res.status(400).json({error}))
}