const express = require("express")
const app = express()
const cors= require ('cors')
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

const uri = "mongodb+srv://bochra:projet123@cluster0.s0cur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const mongoose = require("mongoose");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
}).catch((err)=>{
    console.log("error while connecting to db..")
})

app.use("/classes",require("./router/classes"))
app.use("/administrateurs",require("./router/administrateur"))
app.use("/enseignants", require('./router/enseignant'))
app.use('/salles', require('./router/salle'))
app.use('/eleves', require('./router/eleve'))
app.use("/matieres", require('./router/matiere'))
app.use("/affectation", require('./router/affectationEnseignant'))
app.use("/seances", require('./router/seance'))
app.use("/presences", require('./router/presence'))
app.use("/loginEns", require('./router/loginEns'))
app.use("/loginAdm", require('./router/loginAdm'))
app.use("/checkToken", require('./router/checkToken'))



const port = 4000 || process.env.PORT
