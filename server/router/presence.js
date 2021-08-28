const express = require("express")
const router = express.Router()
const Presence = require("../models/Presence")


router.get('/', (req, res) => {
    Presence.find().populate("matiere eleve")
        .then(ens => res.status(200).json(ens))
        .catch(error => res.status(400).json({ error }));
});


router.post('/', (req, res) => {
    const presence = new Presence({
        ...req.body
    });
    presence.save()
        .then(() => res.status(201).json({ message: ' presence enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});


router.put('/:id', (req, res) => {
    Presence.findByIdAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Presence modifié !' }))
        .catch(error => res.status(400).json({ error }));
})


router.delete('/:id', (req, res) => {
    Presence.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Presence supprimé !' }))
        .catch(error => res.status(400).json({ error }));
})

module.exports = router