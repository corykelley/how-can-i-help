const bcrypt = require('bcryptjs');

const comparePass = (userPassword, databasePassword) =>
  bcrypt.compareSync(userPassword, databasePassword);

const loginRedirect = (req, res, next) => {
  if (req.user) return res.redirect('/user');
  return next();
};

const loginRequired = (req, res, next) => {
  if (!req.user) return res.redirect('/auth/login');
  return next();
};

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
};
