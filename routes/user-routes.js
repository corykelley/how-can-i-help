const userRouter = require('express').Router();

const authHelpers = require('../utils/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});
userRouter.post('/', usersController.create);
userRouter.get('/', authHelpers.loginRequired, usersController.index);

module.exports = userRouter;
