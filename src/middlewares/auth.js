import auth from '@utils/auth';

const verifyAuth = async (req, res, next) => {
  const authorization = req.header('authorization') ?? '';
  const authArr = authorization.split('Bearer ');

  if (!authorization || authArr.length === 1) {
    return res.status(401).json({
      message: 'Not authorization here!',
      code: 401,
    });
  }

  const [token] = authArr.filter((f) => f);
  const user = await auth.valid(token);

  if (user) {
    req.user = user;
    return next();
  }

  return res.status(403).json({
    message: 'Token expired!',
    code: 403,
  });

  // auth
};

export default verifyAuth;
