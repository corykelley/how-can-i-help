const Offer = require('../models/Offer');

const offersController = {
  index(req, res, next) {
    Offer.getAll()
      .then(offers => {
        res.json({
          message: 'ok',
          offers,
        });
      })
      .catch(next);
  },

  create(req, res, next) {
    new Offer({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      time_offered: req.body.time_offered,
    })
      .save()
      .then(offer => {
        res.json({
          message: 'ok',
          offer,
        });
      })
      .catch(next);
  },

  show(req, res, next) {
    Offer.getById(req.params.id)
      .then(offer => {
        res.json({
          message: 'ok',
          offer,
        });
      })
      .catch(next);
  },
};

module.exports = offersController;
