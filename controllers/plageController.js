const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Plage } = require('../models/plage');


router.get('/', (req, res) => {
    Plage.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Plage :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Plage.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving EndroitPopulaire :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/listeCommentaire', (req, res) => {
    var plage = new Plage({
        nom: req.body.nom
    });
    Plage.find({ nom: req.body.nom }, function (err, docs) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des commentaires.' });
        }

        if (!docs || docs.length === 0) {
            console.log('Aucun plage trouvé avec ce nom.' )
            return res.status(404).json({ message: 'Aucun plage trouvé avec ce nom.' });
        }

        const plageTrouve = docs[0];

        if (!plageTrouve.commentaire || plageTrouve.commentaire.length === 0) {
            console.log('Aucun commentaire trouvé pour ce plage. taille 0')
            return res.status(404).json({ message: 'Aucun commentaire trouvé pour ce plage.' });
        }

        res.json(plageTrouve.commentaire);
    });
});


router.put('/insertCommentairePlage', (req, res) => {
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
        Plage.updateOne(filter, updateDoc, function (err, docs) {
            if (err){
                res.send(err);
            }
            else{
                res.send(docs);
            }
        });
});

module.exports = router;