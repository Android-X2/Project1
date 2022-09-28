const mongoose = require('mongoose')

const LinkSchema = new mongoose.Schema({
    title:{ 
        type:String,
        required:true,
        trime: true
    },
    link:{
        type:String,
        required:true,
        trime:true
    },
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Link', LinkSchema)