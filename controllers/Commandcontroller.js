const Command = require('../models/Command');
const Admin = require('../models/Admin');
const Client = require('../models/Client');
const productCtrl = require('../controllers/productController');

exports.createCommand = async (req, res, next) => {

    const {verified,productsCmmd} = await productCtrl.verifyProducts(req.body);

    if(!verified)
    return res.status(404).json({message:"produit introuvable ou quantité insuffisante"})

    const client = await Client.findOne({ user: req.auth.user_id });

    console.log("prdcmmd", productsCmmd);
    let total=0;
    for (const element of productsCmmd) {
        console.log("elem",element);
        total+=element.price*element.qte;
    }

    const command = new Command({
        date_cmmd: Date.now(),
        Products: productsCmmd,
        Client: client,
        total:total,
        Admin: null,
        status: 0
    });
    console.log("cmmd", command);
    command.save()
        .then(command => res.status(201).json({ command }))
        .catch(error => res.status(400).json({ error }))
};


exports.getCommands = async (req, res, next) => {
    if (req?.auth?.user_Role=="CLIENT") {
        const client=await Client.findOne({user:req.auth.user_id});
        console.log("client",client);
        Command.find({Client: client})
            .then(command => res.status(200).json({ command }))
            .catch(error => res.status(400).json({ error }));
    }
    else {
        Command.find()
            .then(commands => res.status(200).json(commands ))
            .catch(error => res.status(400).json({ error }))
    }
};


exports.annuleCommand = (req, res, next) => {
    Command.deleteOne({ _id: req.params._id })
        .then(() => res.status(200).json({ message: 'deleted successfully' }))
        .catch((error) => res.status(400).json({ error }))
};

exports.acceptCommand = async (req, res, next) => {
    if (!req?.params?._id) {
        console.log("here");
        return res.status(404).json({ error })
    }
    else {
        if (req.auth.user_Role == "ADMIN") {
            const cmmd = await Command.findOne({ _id: req.params._id });
            const admin = await Admin.findOne({ user: req.auth.user_id });
            console.log("admin", admin);
            console.log("cmmd", cmmd);


            Command.updateOne({ _id: req.params._id }, { status: 1, Admin: admin, _id: req.params._id })
            .then(cmmd => res.status(200).json({ cmmd }))
            .catch(error => res.status(404).json({ error }))
        }
        else {
            return res.status(401).json({ error })
        }
    }
};