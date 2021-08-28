const express = require("express")
const user = express.Router()
const Administrateur = require("../models/Administrateur")
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



user.post('/', (req, res) => {
  const adm = new Administrateur({
    ...req.body
  });
  adm.save()
    .then(() => res.status(201).json({ message: 'un nouveau administrateur est enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});


user.get('/', (req, res) => {
  Administrateur.find()
    .then(ens => res.status(200).json(ens))
    .catch(error => res.status(400).json({ error }));
});


user.get('/:id', (req, res,) => {
  Administrateur.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});



user.put('/:id',  upload.single('photo'),(req, res) => {
  Administrateur.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, photo: req.file.originalname })
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch(error => res.status(400).json({ error }));
})


user.delete('/:id', (req, res) => {
  Administrateur.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Administrateur supprimé !' }))
    .catch(error => res.status(400).json({ error }));
})


module.exports = user