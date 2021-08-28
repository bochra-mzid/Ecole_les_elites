const express = require("express")
const router = express.Router()
const Salle = require("../models/Salle")


router.get('/', (req, res) => {
    Salle.find()
        .then(ens => res.status(200).json(ens))
        .catch(error => res.status(400).json({ error }));
});


router.post('/', (req, res) => {
    const salle = new Salle({
        ...req.body
    });
    salle.save()
        .then(() => res.status(201).json({ message: 'une nouvelle salle est bien enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
});


router.put('/:id', (req, res) => {
    Salle.findByIdAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Salle modifiée !' }))
        .catch(error => res.status(400).json({ error }));
})


router.delete('/:id', (req, res) => {
    Salle.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Salle supprimée !' }))
        .catch(error => res.status(400).json({ error }));
})


router.get("/count",async(req, res) => {
    try{
    const salles = await Salle.find({})
        .count()
    res.json(salles)
    }
    catch (err){
        res.json({"err": err})
    }
})

module.exports = router