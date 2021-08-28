const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MatiereSchema = mongoose.Schema({
    libele:{
        type:String,
        required:true
    },

    chargeHoraire:{
        type:Number,
        required:true
    },
    niveau:{
        type:Number,
        required:true
    },
    classes:[{
        type:Schema.Types.ObjectId,
        ref: "Classe"
    }]
})

module.exports= mongoose.model('Matiere', MatiereSchema)