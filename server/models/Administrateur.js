const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const AdministrateurSchema = mongoose.Schema({
    familyname:{
        type: String,
        required: true,
    },
    firstname:{
        type: String,
        required: true,
    },
    sexe:{
        type: String,
        required:true
    },
    age:{
        type:Number,
    },
    email: { type: String, required: true, unique: true },
    mdp: { type: String, required: true },
    numero:{type:Number, required:true},
    adresse:{type:String},
    poste:{type:String, required:true},
    date_de_naissance:{type: Date},
    photo:{type:String}
})

AdministrateurSchema.plugin(uniqueValidator);


module.exports= mongoose.model('Administrateur', AdministrateurSchema)