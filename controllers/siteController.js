const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Site } = require('../models/site');


router.get('/', (req, res) => {
    Site.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Site :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Site.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Site :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;