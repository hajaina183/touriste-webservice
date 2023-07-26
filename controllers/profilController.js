const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Profil } = require('../models/profil');

// => localhost:3000/profil/
router.get('/', (req, res) => {
    Profil.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Profil :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Profil.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Profil :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var profil = new Profil({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        user: req.body.user,
    });
    profil.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Profil Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var profil = new Profil({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        user: req.body.user,
    });
    Profil.findByIdAndUpdate(req.params.id, { $set: profil }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Profil Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Profil.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Profil Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/traitementLogin', (req, res) => {
    var profil = new Profil({
        user: req.body.user,
        mdp: req.body.mdp
    });
    Profil.find({ user: req.body.user, mdp: req.body.mdp }, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            if(docs.length == 1) {
                res.send(docs[0])
            } else {
                res.send(docs[0])
            }
        }
    });
});

router.post('/inscription', (req, res) => {
    var profil = new Profil({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        user: req.body.user,
        mdp: req.body.mdp,
    });
    profil.save((err, doc) => {
        if (!err) { 
            res.send(doc); 
        }
        else { 
            console.log('Error in Client Save :' + JSON.stringify(err, undefined, 2));
         }
    });
});
module.exports = router;