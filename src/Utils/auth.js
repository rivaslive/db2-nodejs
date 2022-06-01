import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const rootPath = path.resolve('keys');

const certPub = fs.readFileSync(`${rootPath}/key-public.pem`);
const certPriv = fs.readFileSync(`${rootPath}/key-private.pem`);

const create = async (user) => {
  const token = await jwt.sign(user, certPriv, {
    algorithm: 'RS256',
    expiresIn: '24h',
  });

  console.log(token);
  return token;
};

const valid = async (token) => {
  try {
    return await jwt.verify(token, certPub);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const auth = {
  create,
  valid,
};

export default auth;
