const mongoose = require('mongoose');

var EndroitPopulaire = mongoose.model('EndroitPopulaires', {
    photo: { type: String },
    nom: { type: String },
    lieu: { type: String },
    description: { type: String },
    parc : {type: Array},
    plage : {type: Array},
    site : {type: Array},
    
    
});

module.exports = { EndroitPopulaire };