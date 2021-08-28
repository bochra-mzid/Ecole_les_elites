const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SalleSchema = mongoose.Schema({

    id:{type: Number},
    title:{type:String},
})

module.exports=mongoose.model("Salle", SalleSchema)