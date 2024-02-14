const mongoose=require('mongoose');

const favoritesSchema=mongoose.Schema({
    list_name:{type:String,required:true},
    Client:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client',
        required: true
    },
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product'
            }
        }
    ],
    pic:{type:String,required:true}
}, { versionKey: false});

module.exports=mongoose.model('Favourites',favoritesSchema);