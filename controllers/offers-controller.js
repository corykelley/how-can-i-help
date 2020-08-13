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
      user_id: req.user.id,
    })
      .save()
      .then(() => {
        res.redirect('/user');
      })
      .catch(next);
  },

  show(req, res, next) {
    Offer.getById(req.params.id)
      .then(offer => {
        res.locals.offer = offer;
        next();
      })
      .catch(next);
  },

  update(req, res, next) {
    Offer.getById(req.params.id)
      .then(foundOffer => {
        return foundOffer.update({
          id: req.params.id,
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          time_offered: req.body.time_offered,
        });
      })
      .then(() => {
        res.redirect(`/user`);
      })
      .catch(next);
  },

  delete(req, res, next) {
    Offer.getById(req.params.id)
      .then(foundOffer => foundOffer.delete())
      .then(() => res.redirect('/user'))
      .catch(next);
  },
};

module.exports = offersController;
