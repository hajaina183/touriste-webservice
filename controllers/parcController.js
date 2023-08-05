const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Parc } = require('../models/parc');


router.get('/', (req, res) => {
    Parc.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Parc :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/listeCommentaire', (req, res) => {
    var parc = new Parc({
        nom: req.body.nom
    });
    Parc.find({ nom: req.body.nom }, function (err, docs) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des commentaires.' });
        }

        if (!docs || docs.length === 0) {
            console.log('Aucun parc trouvé avec ce nom.' )
            return res.status(404).json({ message: 'Aucun parc trouvé avec ce nom.' });
        }

        const parcTrouve = docs[0];

        if (!parcTrouve.commentaire || parcTrouve.commentaire.length === 0) {
            console.log('Aucun commentaire trouvé pour ce parc. taille 0')
            return res.status(404).json({ message: 'Aucun commentaire trouvé pour ce parc.' });
        }

        res.json(parcTrouve.commentaire);
    });
});

  

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Parc.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving EndroitPopulaire :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/insertCommentaireParc', (req, res) => {
    const filter = { nom : req.body.nom };
    const updateDoc = {
        $push:{
            commentaire:{
                date: req.body.date,
                text: req.body.text,
                user : req.body.user,
            }
        },
      };
        Parc.updateOne(filter, updateDoc, function (err, docs) {
            if (err){
                res.send(err);
            }
            else{
                res.send(docs);
            }
        });
});


module.exports = router;