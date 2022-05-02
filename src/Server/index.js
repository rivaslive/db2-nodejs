import express from 'express';

import getConfig from 'config';
import { initializeDB } from './db';

const { port } = getConfig();

const app = express();

// creating Server
const initializeServer = async (routes) => {
  // initialize DB
  await initializeDB();

  // json parse
  app.use(express.json());

  // set urls
  app.use(routes);
  app.get('/subjects', (req, res) => {
    const { name } = req.query;
    const data = [
      {
        code: 'dbII',
        name: 'Base de datos 2',
        professor: 'Kevin Rivas',
        cicle: '01-2022',
        uv: 5,
      },
      {
        code: 'in1',
        name: 'Ingles 1',
        professor: 'Alguna persona',
        cicle: '01-2022',
        uv: 4,
      },
    ];

    if (name) {
      return res.status(200).json(data);
    }

    return res.status(400).json({
      message: 'Por favor envie el parametro GET llamado name',
    });
  });

  // create express app
  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
};

export default initializeServer;
