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
    if (req.params?._id) {
        Client.findOne({ _id: req.params._id })
            .then(client => res.status(200).json({ client, message: 'client existant' }))
            .catch(error => res.status(400).json({ error }))
    }
    else {
        Client.find()
            .then(clients => res.status(200).json({ clients }))
            .catch(error => res.status(400).json({ error }));
    }

}
