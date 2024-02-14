const Command = require('../models/Command');
const Admin = require('../models/Admin');
const Client = require('../models/Client');
const productCtrl = require('../controllers/productController');
const userCtrl=require('../controllers/UserController');
const Product = require('../models/Product');

exports.createCommand = async (req, res, next) => {

    const { verified, productsCmmd } = await productCtrl.verifyProducts(req.body);

    if (!verified)
        return res.status(404).json({ message: "produit introuvable ou quantité insuffisante" })

    const client = await Client.findOne({ user: req.auth.user_id });
    let total = 0;
    for (const element of productsCmmd) {
        total += element.price * element.qte;
    }

    const command = new Command({
        date_cmmd: Date.now(),
        Products: productsCmmd,
        Client: client,
        total: total,
        Admin: null,
        status: 0
    });
    command.save()
        .then(async() =>{
            return await productCtrl.sellProducts(command.Products,res)
        })         
        .catch(error => res.status(400).json({error,message:"4"}))
};


exports.getCommands = async (req, res, next) => {
    if (req?.auth?.user_Role == "CLIENT") {
        const client = await Client.findOne({ user: req.auth.user_id });
        Command.find({ Client: client })
            .then(async commands => {
                commands.forEach(cmmd => {
                    cmmd.Products.forEach(async product => {
                        product=await Product.findOne({_id:product._id})    
                    });
                });
                res.status(200).json(commands)
            })
            .catch(error => res.status(400).json({ error }));
    }
    else {
        Command.find()
            .then(async commands =>{
                for (const cmmd of commands) {
                    if (cmmd.status!=0) {
                        const admin=await Admin.findOne({_id:cmmd.Admin});
                        cmmd.Admin=admin;
                        cmmd.Admin.user=await userCtrl.getUser(admin.user);
                    }
                    const client=await Client.findOne({_id:cmmd.Client})
                    cmmd.Client=client;
                    cmmd.Client.user=await userCtrl.getUser(client.user);
                }
                res.status(200).json(commands)
            })
            .catch(error => res.status(400).json({error,message:"5"}))
    }
};


exports.refuseCommand = async (req, res, next) => {
    if (!req?.params?._id) {
        
        return res.status(404).json({ error })
    }
    else {

        const cmmd = await Command.findOne({ _id: req.params._id });
        const admin = await Admin.findOne({ user: req.auth.user_id });


        Command.updateOne({ _id: req.params._id }, { status: -1, Admin: admin, _id: req.params._id })
            .then(async () =>{
               
                await productCtrl.cancelSell(cmmd.Products);
                const newCmmd=await this.getCmmd(req.params._id);
                return res.status(200).json( newCmmd )
            })
            .catch(error => {
                res.status(500).json({ error })
            })

    }
};

exports.acceptCommand = async (req, res, next) => {
    if (!req?.params?._id) {
        return res.status(404).json({ error })
    }
    else {
        const cmmd = await Command.findOne({ _id: req.params._id });
        const admin = await Admin.findOne({ user: req.auth.user_id });
        

        Command.updateOne({ _id: req.params._id }, { status: 1, Admin: admin, _id: req.params._id })
            .then(async () =>{
                const newCmmd=await this.getCmmd(req.params._id);

                res.status(200).json( newCmmd )
            } )
            .catch(error => res.status(500).json({ error }))
    }
}

exports.getCommandById = (req, res, next) => {

    Command.findOne({ _id: req.params.id })
        .then((cmmd) => res.status(200).json(cmmd))
        .catch(error => res.status(400).json({ error }))
}

exports.getCmmd=async (idCmmd)=>{
    const cmmd=await Command.findOne({_id:idCmmd})
    const client=await Client.findOne({_id:cmmd.Client})
    const admin=await Admin.findOne({_id:cmmd.Admin});
    cmmd.Admin=admin;
    cmmd.Client=client;
    cmmd.Admin.user=await userCtrl.getUser(admin.user);
    cmmd.Client.user=await userCtrl.getUser(client.user);
    return cmmd;
}