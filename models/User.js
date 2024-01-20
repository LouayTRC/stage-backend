const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const userSchema=mongoose.Schema({
    mail:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    fullname:{type:String,required:true},
    date_naissance:{type:Date,required:true},
    role:{type:String},
    pdp:{type:String}
},{ versionKey: false});

userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User',userSchema);