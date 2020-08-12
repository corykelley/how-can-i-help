const userRouter = require('express').Router();

const authHelpers = require('../utils/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});
userRouter.post('/', usersController.create);
userRouter.get('/', authHelpers.loginRequired, usersController.index);
// userRouter.get(
//   '/:id([0-9]+)',
//   authHelpers.loginRequired,
//   usersController.show,
//   (req, res) => {
//     res.render('user/show', {
//       offer: res.locals.offer,
//       user: req.user,
//     });
//   }
// );

module.exports = userRouter;
