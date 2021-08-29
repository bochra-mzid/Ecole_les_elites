const mongoose= require("mongoose")
const Schema = mongoose.Schema

const EleveSchema = mongoose.Schema({
    nom:{type:String, require:true},
    prenom:{type:String, require:true},
    age:{type:Number},
    email:{type:String},
    mdp:{type:String},
    sexe:{type:String},
    numero:{type:Number},
    adresse:{type:String},
    nomPere:{type:String},
    nomMere:{type:String},
    numPere:{type:Number},
    numMere:{type:Number},
    niveau:{type:Number},
    classe:{
        type:Schema.Types.ObjectId,
        ref:"Classe"
    },
    seances:[{
        type:Schema.Types.ObjectId,
        ref:"Seance"
    }],
    presences:[{
        type:Schema.Types.ObjectId,
        ref:"Presence"
    }]
})

module.exports = mongoose.model("Eleve", EleveSchema)