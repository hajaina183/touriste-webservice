const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var olonaController = require('./controllers/olonaController.js');
var profilController = require('./controllers/profilController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen( process.env.PORT || 3000, () => console.log('Server started at port : 3000'));

app.use('/employees', employeeController);
app.use('/olona', olonaController);
app.use('/profil', profilController);