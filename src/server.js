require('express-async-errors');
const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const routes = require('./routes');
require('dotenv').config();
const database = require('./database');

const { PORT, HOST, NODE_ENV } = process.env;

database
  .authenticate()
  .then(() => console.log('database is connected'))
  .catch((error) => console.log(error));

const appShutdown = (fnCallback, server) => {
  console.log(`Server on PORT ${PORT} is Down.`);
  server.close();
  fnCallback();
};

if (NODE_ENV !== 'production') {
  database.sync();
}
const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

const server = app.listen(PORT, HOST, () => {
  console.log(`Start server on PORT ${PORT}`);
});

const shutdown = (fnCallback) => appShutdown(fnCallback, server);

module.exports = { server, shutdown, app };
