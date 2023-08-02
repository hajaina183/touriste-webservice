const mongoose = require('mongoose');

var Site = mongoose.model('sites', {
    photo: { type: String },
    nom: { type: String },
    lieu: { type: String },
    description: { type: String },
    commentaire : { type: Array },
    
});

module.exports = { Site };