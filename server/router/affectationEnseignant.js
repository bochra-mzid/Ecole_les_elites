const express = require("express")
const router = express.Router()
const Classe = require("../models/Classe")
const Matiere = require("../models/Matiere")
const Enseignant= require('../models/Enseignant')
const AffectationEnseignant = require("../models/AffectationEnseignant")


router.get('/classe/:id_classe', async (req, res)=>{
    try{
        const affectation = await AffectationEnseignant.find({classe: req.params.id_classe}).populate('matiere enseignant classe')
        res.status(200).json({affectation})
    }
    catch(error){ res.status(404).json({"error": error})}

})


router.get('/:id_classe/:id_matiere', (req, res,) => {
    AffectationEnseignant.findOne({ 'classe': req.params.id_classe, 'matiere': req.params.id_matiere }).populate("matiere enseignant classe")
        .then(aff => res.status(200).json(aff))
        .catch(error => res.status(404).json({ error }));
});


router.get('/', (req, res) => {
    AffectationEnseignant.find().populate('enseignant matiere classe')
        .then((aff) => {
        res.status(200).json(aff)
    }).catch(error => {
        res.status(400).json({ error })
        console.log('erreur')
    })
})


router.get('/:id', (req, res,) => {
    AffectationEnseignant.findById({ _id: req.params.id }).populate("matiere enseignant classe")
        .then(aff => res.status(200).json(aff))
        .catch(error => res.status(404).json({ error }));
});


router.delete('/:id', (req, res) => {
    AffectationEnseignant.delete({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Matiere supprimé !' }))
      .catch(error => res.status(400).json({ error }));
  })


router.post('/:id_ens/:id_classe/:id_mat', async(req,res)=>{
    try{
    const aff = await AffectationEnseignant.find({'classe': req.params.id_classe, 'matiere': req.params.id_mat})
    const ens = await Enseignant.findById({_id: req.params.id_ens})
    aff.enseignant=ens
    await aff.save()
    res.status(200).json({message: "enseignant affecté"})
    }
    catch(error){ res.json({"error": error})}
})


router.post("/:id_aff/:id_ens", async(req,res)=>{
    try{
    const aff = await AffectationEnseignant.findById({_id: req.params.id_aff})
    aff.enseignant=req.params.id_ens
    const classe = await Classe.findById({_id : aff.classe._id})
    await aff.save()
    classe.enseignants.push(req.params.id_ens)
    await classe.save()
    res.status(200).json({message: "enseignant affecté"})}
    catch(error){ res.json({error})}
})


module.exports = router