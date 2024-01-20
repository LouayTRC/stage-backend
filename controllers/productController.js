const Product=require('../models/Product');

exports.createProduct=(req, res, next) => {
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(() => res.status(201).json({ product,message: 'objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getProduct=(req,res,next)=>{
    
    if(!req.params?._id)
    Product.find()
    .then(products=> res.status(200).json(products))
    .catch(error=> res.status(400).json({error}));
    else
    
    Product.findOne({_id:req.params._id})
    .then(product=>res.status(200).json(product))
    .catch(error=>res.status(404).json({error}))
};

exports.updateProduct=(req,res,next)=>{
    Product.updateOne({_id:req.params._id},{...req.body,_id:req.params._id})
    .then(() => res.status(200).json({message:'update avec succes'}))
    .catch(()=> res.status(400).json({error}));
};

exports.deleteProduct=(req,res,next)=>{
    Product.deleteOne({_id:req.params._id})
    .then(()=> res.status(200).json({message:'delete avec succes'}))
    .catch(()=> res.status(400).json({error}))
};
