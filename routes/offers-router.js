const offersController = require('../controllers/offers-controller');
const offersRouter = require('express').Router();
const authHelpers = require('../utils/auth/auth-helpers');

offersRouter.get('/', offersController.index);
offersRouter.post('/', authHelpers.loginRequired, offersController.create);
offersRouter.get('/new', authHelpers.loginRequired, (req, res) => {
  res.render('offers/new');
});

offersRouter.get('/:id([0-9]+)', offersController.show, (req, res) => {
  res.render('offers/show', {
    offer: res.locals.offer,
    user: req.user,
  });
});
offersRouter.get('/:id([0-9]+)/edit', offersController.show, (req, res) => {
  res.render('offers/edit', {
    offers: res.locals.offer,
    id: req.params.id,
  });
});
offersRouter.put(
  '/:id([0-9]+)',
  authHelpers.loginRequired,
  offersController.update
);
offersRouter.delete(
  '/:id([0-9]+)',
  authHelpers.loginRequired,
  offersController.delete
);

module.exports = offersRouter;
