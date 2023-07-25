const mongoose = require('mongoose');

var Profil = mongoose.model('Profil', {
    nom: { type: String },
    prenom: { type: String },
    adresse: { type: String },
    user: { type: String },
    mdp: { type: String }
});

module.exports = { Profil };