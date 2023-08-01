const mongoose = require('mongoose');

var Parc = mongoose.model('parcs', {
    photo: { type: String },
    nom: { type: String },
    lieu: { type: String },
    description: { type: String },
    commentaire : { type: Array },
    
});

module.exports = { Parc };