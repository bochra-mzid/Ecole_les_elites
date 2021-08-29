const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClasseSchema = mongoose.Schema({
    nom:{
        type: String,
        required: true,
    },
    niveau:{
        type: Number,
        required: true,
    },
    nb_eleve:{
        type:Number,
        required:true,
    },
    année:{
        type: String,
        required: true,
    },
    matieres:[{
        type:Schema.Types.ObjectId,
        ref:"Matiere"
    }],
    eleves:[{
        type:Schema.Types.ObjectId,
        ref:"Eleve"
    }]

})

module.exports= mongoose.model('Classe', ClasseSchema)