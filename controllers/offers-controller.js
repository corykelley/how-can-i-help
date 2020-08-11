const Offer = require('../models/Offer');

const offersController = {
  index(req, res, next) {
    Offer.getAll()
      .then(offers => {
        res.render('offers/index', {
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

  update(req, res, next) {
    Offer.getById(req.params.id)
      .then(foundOffer => {
        return foundOffer.update({
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          time_offered: req.body.time_offered,
        });
      })
      .then(updatedOffer => {
        res.redirect(`/offers/${updatedOffer.id}`);
      })
      .catch(next);
  },

  delete(req, res, next) {
    Offer.getById(req.params.id)
      .then(foundOffer => foundOffer.delete())
      .then(() => res.redirect('/offers'))
      .catch(next);
  },
};

module.exports = offersController;
