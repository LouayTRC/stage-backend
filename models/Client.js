const mongoose=require('mongoose');

const clientSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    adress:{type:String,required:true},
    phone:{type:String,required:true}
  },{ versionKey: false});

module.exports=mongoose.model('Client',clientSchema);
