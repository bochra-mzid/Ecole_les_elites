const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SeanceSchema = mongoose.Schema({
   
    Salle:{
        type:Schema.Types.ObjectId,
        ref:"Salle"
    },
    Enseignant:{
        type:Schema.Types.ObjectId,
        ref:"Enseignant",
    },
    Classe:{
        type:Schema.Types.ObjectId,
        ref:"Classe"
    },
    Matiere:{
        type: Schema.Types.ObjectId,
        ref: "Matiere"
    },
    isAllDay:{type:Boolean},
    Title:{type: String},
    Room:{type: Number},
    Note: {type:String},
    Start: {type: Date},
    End: {type: Date},
    RecurrenceRule:{type:String}
    

})

module.exports=mongoose.model("Seance", SeanceSchema)