const Client = require('../models/Client');
const userCtrl = require('../controllers/UserController');

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

exports.getClient = (req, res, next) => {
    Client.findOne({ user: req.auth.user_id })
        .then(async client => {
            client.user=await userCtrl.getUser(client.user);
            res.status(200).json({ client })
        })
        .catch(error => res.status(400).json({ error }))
}

exports.updateClient = async (req, res, next) => {
    const client = await Client.findOne({ user: req.auth.user_id })
    console.log("client",client);
    if (client._id == req.body._id) {
        Client.updateOne({ _id: client._id }, { ...req.body })
            .then(client => res.status(200).json(client))
            .catch(error => res.status(400).json(error))
    }
    else {
        res.status(401).json(error)
    }
}