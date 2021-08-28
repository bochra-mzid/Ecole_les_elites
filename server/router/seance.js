const express = require("express")
const router = express.Router()
const Seance= require('../models/Seance')
const Classe= require('../models/Classe')
const Matiere= require('../models/Matiere')
const Enseignant= require('../models/Enseignant')


const Salle= require('../models/Salle')

router.get('/', (req, res) => {
    Seance.find().populate("Classe Matiere Enseignant")
        .then((Seance
    ) => {
            res.status(200).json(Seance
        )
        }).catch(error => {
            res.status(400).json({ error })
            console.log('erreur')
        })
})


router.get('/:id', (req, res,) => {
    Seance.findOne({ _id: req.params.id }).populate("Classe Matiere Enseignant")
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});


router.get('/enseignant/:id', (req, res,) => {
    Seance.find({ Enseignant: req.params.id }).populate("Classe Matiere Enseignant")
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});


router.delete('/:id', (req, res) => {
    const Seance_id = req.params.id
    Seance.findById(Seance_id).then((Seance) => {
        Seance.delete();
        res.status(200).json({ message: "Seance supprimée" })
            .catch(error => res.status(400).json({ error }))
    })
})


router.post("/", (req,res)=>{
    const seance= new Seance({
        ...req.body
    })
    seance.save()
        .then(() => res.status(201).json({ message: 'seance enregistré !' }))
        .catch(error => res.status(400).json({ error }));
})


router.post("/:id", (req,res)=>{
    const seance= new Seance({
        ...req.body
    })
    seance.RecurrenceRule="FREQ=WEEKLY"
    seance.save()
        .then(() => res.status(201).json({ message: 'seance enregistré !' }))
        .catch(error => res.status(400).json({ error }));
})


router.get('/salles',async (req,res)=>{
    const seances = await Seance.find ()
    let occ= []
    seances.map((s)=>{
        occ.push(s.salle)
    })
    const libres= await Salle.find({id: {$nin : occ}})
    res.status(200).json(libres)

})


router.post('/:id_classe/:id_matiere/:id_ens', async(req,res)=>{
    try{
        const ens = await Enseignant.findById({_id: req.params.id_ens})
        const classe = await Classe.findById({_id: req.params.id_classe})
        const matiere = await Matiere.findById({_id: req.params.id_matiere})
        const seance = new Seance ({
            Enseignant: ens,
            Matiere: matiere,
            Classe: classe,
            Room: req.body.Room,
            Start: req.body.Start,
            End: req.body.End,
            Title: matiere.libele,
            RecurrenceRule:"FREQ=WEEKLY"
        })
    await seance.save()
    ens.seance.push(seance)
    ens.save()
    res.status(200).json({message: "seance enregistrée"})
    }
    catch(error){ res.json({"error": error})}
})

module.exports = router