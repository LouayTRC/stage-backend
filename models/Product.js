const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    qte:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    status:{type:Number,required:true}
}, { versionKey: false});


module.exports=mongoose.model('Product',productSchema);