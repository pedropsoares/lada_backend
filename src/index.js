require('dotenv').config();

const dbConect = require('./db');
const express = require('express');
const routes = require('./routes');

const app = express();

dbConect();

app.use(express.json());
app.use(routes);

app.listen(3000);