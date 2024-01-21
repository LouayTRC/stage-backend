const Command=require('../models/Command');
const Product=require('../models/Product');
const Admin=require('../models/Admin');
const Client=require('../models/Client');

exports.createCommand=async(req,res,next)=>{
    var products=[];
    const client=await Client.findOne({user:req.auth.user_id});

    for(const element of req.body.Products){
        console.log("zee",element);
        let prd=await Product.findOne({_id:element.product});
        if(!prd){
            return res.status(404).json({message:'produit introuvable'});
        }
        else{
            if(prd.qte>=element.qte && prd.status==1){
                products.push(prd);
                console.log("eee",products);
            }
            else{
                console.log("produitQTE",prd.qte);
                console.log("cmmdQTE",element.qte);
                return res.status(400).json({message:'la quantité depasse le stock'})
            } 
        }
    };
    const command=new Command({
        date_cmmd:Date.now(),
        products:products,
        Client:client,
        Admin:null,
        status:0
    });
    command.save()
    .then(command=>{
        client.commands.push(command);
        Client.updateOne({_id:client._id,...client,_id:client._id})
        .then(()=>res.status(201).json({command,message:"commande créé"}))
        .catch(error=>res.status(400).json({error}))
    })
    .catch(error=>res.status(400).json({error}))
};

exports.getCommands=(req,res,next)=>{
    if (req.params?._id) {
        Command.findOne({_id:req.params._id})
        .then(command=>res.status(200).json({command}))
        .catch(error=>res.status(400).json({error}));
    }
    else{
        Command.find()
        .then(commands=>res.status(200).json({commands}))
        .catch(error=>res.status(400).json({error}))
    }
};

exports.updateCommand=(req,res,next)=>{
    Command.updateOne({_id:req.params._id,...req.body,_id:req.params._id})
    .then(command=>res.status(200).json({command}))
    .catch(error=>res.status(400).json({error}))
};

exports.annuleCommand=(req,res,next)=>{
    Command.deleteOne({_id:req.params._id})
    .then(()=>res.status(200).json({message:'deleted successfully'}))
    .catch((error)=>res.status(400).json({error}))
};

exports.acceptCommand=async (req,res,next)=>{
    if(!req?.params?._id){
        console.log("here");
        return res.status(404).json({error})
    }
    else{
        if(req.auth.user_Role=="ADMIN"){
            const cmmd = await  Command.findOne({_id:req.params._id});
            const admin= await  Admin.findOne({user:req.auth.user_id});
            console.log("admin",admin);
            console.log("cmmd",cmmd);
            

            Command.updateOne({_id:req.params._id},{status:1,Admin:admin,_id:req.params._id})

            .then(cmmd=>res.status(200).json({cmmd}))
            .catch(error=>res.status(404).json({error})) 
        }
        else{
            return res.status(401).json({error})
        }
    }
};