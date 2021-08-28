const express = require("express")
const router = express.Router()
const Eleve = require("../models/Eleve")


router.get("/count",async(req, res) => {
    try{
    const eleves = await Eleve.find({})
        .countDocuments()
    res.json(eleves)
    }
    catch (err){
        res.json({"err": err})
    }
})


router.get('/', (req, res) => {
    Eleve.find().populate("classe")
        .then(ens => res.status(200).json(ens))
        .catch(error => res.status(400).json({ error }));
});


router.get('/classe/:id', (req, res,) => {
    Eleve.find({classe: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});


router.get('/:id', (req, res,) => {
    Eleve.find({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});


router.get('/:niveau', (req, res,) => {
    Eleve.find({ niveau: req.params.niveau })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});


router.post('/', (req, res) => {
    const eleve = new Eleve({
        ...req.body
    });
    eleve.save()
        .then(() => res.status(201).json({ message: 'un nouveau eleve est bien enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});


router.put('/:id', (req, res) => {
    Eleve.findByIdAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Eleve modifié !' }))
        .catch(error => res.status(400).json({ error }));
})


router.delete('/:id', (req, res) => {
    Eleve.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Eleve supprimé !' }))
        .catch(error => res.status(400).json({ error }));
})


module.exports = router