const mongoose=require('mongoose');

const Client=require('./Client');
const Admin=require('./Admin');

const commandSchema=mongoose.Schema({
    Client:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client',
        required: true
    },
    Admin:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin'
    },
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product'
            },
            qte:{
                type:Number,
                required:true
            }
        }
    ],
    date_cmmd:{type:Date,required:true},
    status:{type:Number,required:true}
}, { versionKey: false});

module.exports=mongoose.model('Command',commandSchema);