const Product=require('../models/Product');

exports.createProduct=(req, res, next) => {
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(() => res.status(201).json(product))
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
    .catch(error=> res.status(400).json({error}))
};

exports.verifyProducts=async (productsCmmd)=>{
    
    const products=[]
    let verified=true;
    for (const element of productsCmmd) {
        console.log("element",element);
        const product=await Product.findOne({_id:element.idProduct});
        if (!product) {
            console.log("!",product);
            verified=false
            break;
        } 
        else {
            if (element.qte>product.qte || product.status!=1) {
                console.log("quan",product);
                verified=false
                break
            }
            else{
                product.qte=element.qte
            
                products.push(product);
            }
        
        }
    }
   return {verified,productsCmmd:products }
}

exports.listProducts=async (req,res,next)=>{
    const products=[];
    for (const element of req.body) {
        const prd=await Product.findOne({_id:element.idProduct});
        if (!prd) {
            return res.status(404).json({error})
        } else {
            products.push(prd);
        }
    }

    return res.status(200).json(products);
}