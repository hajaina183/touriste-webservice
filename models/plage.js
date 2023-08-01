const mongoose = require('mongoose');

var Plage = mongoose.model('plages', {
    photo: { type: String },
    nom: { type: String },
    lieu: { type: String },
    description: { type: String },
    commentaire : { type: Array },
    
});

module.exports = { Plage };