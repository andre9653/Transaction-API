require('express-async-errors');
const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const routes = require('./routes');
require('dotenv').config();

const { PORT, HOST } = process.env;

const app = express();

require('./database');

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(PORT, HOST, () => console.log(`Start server on PORT ${PORT}`));
