const mongoose=require('mongoose');

const clientSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    commands:[
      {
          Command:{
              type: mongoose.Schema.Types.ObjectId, 
              ref: 'Command'
          }
      }
    ],
    playlists:[
      {
          favorites:{
              type: mongoose.Schema.Types.ObjectId, 
              ref: 'Favorites'
          }
      }
    ],
    adress:{type:String},
    phone:{type:String}
  },{ versionKey: false});

module.exports=mongoose.model('Client',clientSchema);
