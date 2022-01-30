const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const { PORT, HOST } = process.env;

const app = express();

require('./database');

app.use(express.json());
app.use(routes);

app.listen(PORT, HOST, () => console.log('online'));
