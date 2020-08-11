const offersController = require('../controllers/offers-controller');
const offersRouter = require('express').Router();

offersRouter.get('/', offersController.index);
offersRouter.post('/', offersController.create);
offersRouter.get('/new', (req, res) => {
  res.render('offers/new');
});

offersRouter.get('/:id([0-9]+)', offersController.show);
offersRouter.put('/:id([0-9]+)', offersController.update);
offersRouter.delete('/:id([0-9]+)', offersController.delete);

module.exports = offersRouter;
