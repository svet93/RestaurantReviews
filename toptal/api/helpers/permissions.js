exports.checkAdmin = (req, res, next) => {
  const {
    role,
  } = req.user;

  if (role === 'admin') {
    return next();
  }
  return res.status(401).send('You do not have permission');
};
