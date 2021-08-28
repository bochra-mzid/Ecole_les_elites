const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EnseignantSchema = mongoose.Schema({
    nom:{
        type: String,
        required: true,
    },
    prénom:{
        type: String,
        required: true,
    },

    sexe:{
        type: String,
        required: true,
    },

    email:{
        type:String,
        required:true
    },
    
    mdp:{
        type: String,
        required: true,  
    },
    sexe:{
        type:String,
    },
    numero:{
        type:Number
    },
    adresse:{
        type:String,
    },
    nbHeures:{
        type:Number,
    },
    spécialités:[String]   
    ,
    age:{type: Number},
    dateDeNaissance:{type:Date},
    photo:{type: String},
    
    seance:[{
        type: Schema.Types.ObjectId,
        ref:"Seance"
    }]
})

module.exports= mongoose.model('Enseignant', EnseignantSchema)