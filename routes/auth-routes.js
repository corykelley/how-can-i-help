const authRouter = require('express').Router();

const passport = require('../utils/auth/local');
const authHelpers = require('../utils/auth/auth-helpers');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login');
});
authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);
authRouter.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = authRouter;
