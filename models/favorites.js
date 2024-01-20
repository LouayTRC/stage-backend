const mongoose=require('mongoose');

const favoritesSchema=mongoose.Schema({
    list_name:{type:String,required:true},
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product'
            }
        }
    ]
});

module.exports=mongoose.model('Favourites',favoritesSchema);