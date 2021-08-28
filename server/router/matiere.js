const express = require("express");
const AffectationEnseignant = require("../models/AffectationEnseignant");
const Classe = require("../models/Classe");
const Matiere = require("../models/Matiere")

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const matiere = await new Matiere({
      ...req.body
    });
    const classes = await Classe.find().where("niveau").equals(matiere.niveau)
    matiere.classes = classes
    await matiere.save()
    classes.map(async (c) => {
      if (c.matieres === []) {
        c.matieres = [matiere._id]
        await c.save()
      }
      else {
        c.matieres.push(matiere)
        await c.save()
      }
      const aff = await new AffectationEnseignant({ matiere: matiere._id, classe: c._id })
      await c.save()
      await aff.save()
    })
    res.status(201).json({ message: 'Objet enregistré !' })
  }
  catch (error) { res.status(400).json({ error }) }
});


router.delete('/:id', async (req, res) => {
  try {
    const matiere = await Matiere.findById({ _id: req.params.id })
    await AffectationEnseignant.deleteMany({ "matiere": matiere })
    matiere.remove()
    const classes = await Classe.find({})
    classes.map(async (c) => {
      c.matieres.pull(matiere)
      await c.save()
    })
    res.status(200).json({ message: 'Matiere supprimé !' })
  }
  catch (err) {
    res.json({ "err": err })
  }
})


router.get('/', (req, res) => {
  Matiere.find().populate("classe")
    .then(ens => res.status(200).json(ens))
    .catch(error => res.status(400).json({ error }));
});


router.get('/:id', (req, res,) => {
  Matiere.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});


router.get('/:niveau', (req, res,) => {
  Matiere.find({ niveau: req.params.niveau })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});


router.put('/:id', (req, res) => {
  Matiere.findByIdAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Matiere modifié !' }))
    .catch(error => res.status(400).json({ error }));
})


module.exports = router