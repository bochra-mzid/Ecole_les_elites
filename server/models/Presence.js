const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PresenceSchema = mongoose.Schema({
    etat:{
        type:String,
        required:true
    },
    debut:{type:Date},
    fin:{type:Date},
    matiere:{
        type: Schema.Types.ObjectId,
        ref:"Matiere"
    },
    eleve:{
        type:Schema.Types.ObjectId,
        ref:"Eleve"
    },
})

module.exports= mongoose.model('Presence', PresenceSchema)