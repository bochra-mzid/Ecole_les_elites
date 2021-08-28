const express = require("express")
const router = express.Router()
const Ens = require("../models/Enseignant")
const Classe = require("../models/Classe")
const Matiere = require("../models/Matiere")
const Seance = require ('../models/Seance')
const AffectationEnseignant= require("../models/AffectationEnseignant")
const nodemailer = require('nodemailer')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
})


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


router.get("/count", async (req, res) => {
    try {
        const enseignants = await Ens.find({})
            .countDocuments()
        res.json(enseignants)
    }
    catch (err) {
        res.json({ "err": err })
    }
})


router.get('/specialite/:specialite', async (req, res,) => {
    const ens = await Ens.find({ spécialités: { $in: [req.params.specialite] } })
    res.status(200).json(ens)
});


router.get('/', (req, res) => {
    Ens.find().populate("seance")
        .then(ens => res.status(200).json(ens))
        .catch(error => res.status(400).json({ error }));
});


router.get('/:id', (req, res,) => {
    Ens.findById({ _id: req.params.id }).populate("seance")
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});


router.get('/:id/classes', (req, res) => {
    Ens.findById({ _id: req.params.id }).populate('classes')
        .then(e => {
            res.status(200).json(e.classes)
        })
        .catch(error => res.status(404).json({ error }));
});


router.post('/sendPassword',async(req,res)=>{
    let data= req.body
      let smtpTransporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        secure : false,
        auth: {
            user: "leselitesecole03@gmail.com", 
            pass: "elites2021", 
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: "leselitesecole03@gmail.com", 
        to: data.email, 
        subject: "Mot de passe",
        html: `
            <h3>Bienvenue dans notre école "Les élites".</h3>
            <h4>Vous êtes bien inscrit et voici votre mot de passe:</h4>
            <h4>${data.mdp}</h4>
            `, 
    };

    smtpTransporter.sendMail(mailOptions, (error,response)=>{
        if (error){
            res.send(error)
        }
        else{
            res.send("Success")
        }
    })
    smtpTransporter.close()
})


router.post('/', async (req, res) => {
    console.log(req.body)
    const nom = req.body.nom
    const prénom = req.body.prénom
    const email = req.body.email
    const mdp = req.body.mdp
    if (!nom || !prénom || !email || !mdp) {
        res.status(400).json({ msg: "الرجاء ادخال جميع البيانات المطلوبة" })
    }
    if (!validateEmail(email)) {
        res.status(400).json({ msg: "invalid email format" })
    }
    Ens.findOne({ email }).then((user) => {
        if (user) {
            res.status(400).json({msg: "هذا البريد الالكتروني مسجل مسبقا" })
        }
    }).catch(err => {
        res.json({ err: "error 1" })
    })
    const ens = new Ens({
        nom: req.body.nom,
        prénom: req.body.prénom,
        email: req.body.email,
        mdp: req.body.mdp,
        sexe: req.body.sexe,
        numero: req.body.numero
    })
    ens.save().then((result) => {
        res.status(201).send(JSON.stringify(result))
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ error: "Error adding this to the db" }))
    })
})



router.post('/:id_ens/:id_classe/:id_matiere', async (req, res) => {
    const { ens_id } = req.params.id_ens
    const { classe_id } = req.params.id_classe
    const { mat_id } = req.params.id_matiere
    const ens = await Ens.find(ens_id)
    const classe = await Classe.find(classe_id)
    const matiere = await Matiere.find(mat_id)
    ens.classes.push(classe)
    classe.enseignants.push(ens)
    await classe.save()
    await ens.save()
    const aff = await new AffectationEnseignant({ classe: classe, enseignant: ens, matiere: matiere })
    await aff.save()
    res.status(201).json({ message: `enseignant ${ens.nom} ${ens.prénom} est affecté à la classe ${classe.nom}` })
})


router.delete('/:id',async (req, res) => {
    try{
    const ens=await Ens.findById({_id: req.params.id})
    await Seance.deleteMany({"Enseignant":ens})
    ens.remove()
   const affectations =await AffectationEnseignant.find({"enseignant":ens})
    affectations.map(async (a) => {
     delete(a.enseignant)
      await a.save()
    })
    res.status(200).json({ message: 'enseignant supprimé !' })
  }
  catch(err){
    res.json({"err": err})
  }
  })


router.put('/:id',(req, res) => {
    Ens.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
})


router.put('/:id/photo',  upload.single('photo'),(req, res) => {
    Ens.updateOne({ _id: req.params.id }, { _id: req.params.id, photo: req.file.originalname })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
})

module.exports = router