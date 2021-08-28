const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AffectationEnseignantSchema = mongoose.Schema({
   matiere:{
        type:Schema.Types.ObjectId,
        ref:"Matiere"
    },
    enseignant:{
        type:Schema.Types.ObjectId,
        ref:"Enseignant",
    },

    classe:{
        type:Schema.Types.ObjectId,
        ref:"Classe"
    }
})

module.exports= mongoose.model('AffectationEnseignant', AffectationEnseignantSchema)