const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CORS = require('cors');

const app = express();
app.use(CORS());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./router')(app);
require('./server')(mongoose);
require('./config/index')(app);