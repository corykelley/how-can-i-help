const offersController = require('../controllers/offers-controller');
const offersRouter = require('express').Router();

offersRouter.get('/', offersController.index);
offersRouter.post('/', offersController.create);

module.exports = offersRouter;
