import jwt from 'jsonwebtoken';
import getConfig from '../config';

const { jwtKey } = getConfig();
// eslint-disable-next-line
const create = async (user) => {
  return jwt.sign(user, jwtKey);
};

const valid = async (token) => {
  try {
    const user = await jwt.verify(token, jwtKey);
    return {
      errors: null,
      data: user,
    };
  } catch (e) {
    console.log(e);
    return {
      errors: e,
      data: null,
    };
  }
};

const auth = {
  create,
  valid,
};

export default auth;
