import express from 'express';

import getConfig from 'config';
import { initializeDB } from './db';

const { port, serverUrl } = getConfig();

const app = express();

// creating Server
const initializeServer = async (routes) => {
  // initialize DB
  await initializeDB();

  // json parse
  app.use(express.json());

  // set urls
  app.use(routes);

  // set urls
  app.get('/', (_req, res) => {
    return res.send('</h1>This is our API</h1>');
  });

  // create express app
  app.listen(port, () => {
    console.log(`Example app listening on ${serverUrl}:${port}`);
  });
};

export default initializeServer;
