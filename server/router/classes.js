const express = require("express")
const router = express.Router()
const Classe = require("../models/Classe")
const Matiere = require("../models/Matiere")
const AffectationEnseignant= require("../models/AffectationEnseignant")


router.delete('/:id',async (req, res) => {
    try{
    const classe=await Classe.findById({_id: req.params.id})
    await AffectationEnseignant.deleteMany({"classe":classe})
    classe.remove()
    const matieres =await Matiere.find({})
    matieres.map(async (m) => {
      m.classes.pull(classe)
      await m.save()
    })
  res.status(200).json({ message: 'Classe supprimé !' })
}
catch(err){
  res.json({"err": err})
}
})


router.get('/', (req, res) => {
    Classe.find().populate("matieres eleves")
        .then((classe) => {
            res.status(200).json(classe)
        }).catch(error => {
            res.status(400).json({ error })
            console.log('erreur')
        })
})


router.get('/:id/matieres', (req, res) => {
    Classe.findById({_id: req.params.id}).populate('matieres')
        .then((classe) => {
            res.status(200).json(classe.matieres)
        }).catch(error => {
            res.status(400).json({ error })
            console.log('erreur')
        })
})

router.get('/:id/enseignants', (req, res) => {
    Classe.findById({_id: req.params.id}).populate('enseignants')
        .then((ens) => {
            res.status(200).json(ens.enseignants)
        }).catch(error => {
            res.status(400).json({ error })
            console.log('erreur')
        })
})

router.get('/:id/eleves', (req, res) => {
    Classe.findById({_id: req.params.id}).populate('eleves')
        .then((c) => {
            res.status(200).json(c.eleves)
        }).catch(error => {
            res.status(400).json({ error })
            console.log('erreur')
        })
})


router.get('/:id', (req, res,) => {
    Classe.findOne({ _id: req.params.id }).populate("matieres")
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});


router.post('/', async (req, res) => {
    try{
        const classe =await new Classe({
          ...req.body
        });
        const matieres = await Matiere.find().where("niveau").equals(req.body.niveau)
        matieres.map(async (m) => {
          const aff = await new AffectationEnseignant({matiere:m._id , classe: classe._id})
          m.classes.push(classe)
            classe.matieres.push(m)
          await m.save()
          await aff.save()
        })
        await classe.save()
      res.status(201).json({ message: 'Objet enregistré !' })}
          catch(error)
          {res.status(400).json({ error })}
      });


router.put('/:id', (req, res) => {
    Classe.findByIdAndUpdate(req.params.id, {
        nb_eleve: req.body.nb_eleve,
    }).then((result) => {
        res.send(JSON.stringify(result))
    })
        .catch((error) => { result.status(400).json({ error }) })
})


module.exports = router