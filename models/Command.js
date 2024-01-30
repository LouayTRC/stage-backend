const mongoose = require('mongoose');

const commandSchema = mongoose.Schema({
    Client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    Admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    total:{type:Number},
    Products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            price:{type:Number,required:true},
            qte:{type:Number,required:true}
        }
    ],
    date_cmmd: { type: Date, required: true },
    status: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Command', commandSchema);