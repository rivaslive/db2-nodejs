import path from 'path';

const rootPath = path.resolve('./');
const port = process.env.APP_PORT || 8080;

const config = () => ({
  port,
  rootPath,
  publicPath: path.join(rootPath, 'public/uploads/'),
  serverUrl: process.env.APP_SERVER_URL || `http://localhost:${port}`,
  jwtKey: process.env.APP_JWT_KEY || 'shhhhh',
  database: {
    uri: process.env.APP_DATABASE_URL,
    options: {},
  },
});

export default config;
