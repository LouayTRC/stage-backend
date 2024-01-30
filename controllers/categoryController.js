const Category = require("../models/Category")

exports.createCategory=(req,res,next)=>{
    const category=new Category({
        ...req.body
    });
    category.save()
    .then((category)=>res.status(201).json({category}))
    .catch(error=>res.status(400).json({error}));
}

exports.deleteCategory=(req,res,next)=>{
    Category.deleteOne({_id:req.params.id})
    .then(()=>res.status(200).json({message:'deleted successfully'}))
    .catch((error)=>res.status(400).json({error}))
}