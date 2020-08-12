const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {
  index(req, res, next) {
    req.user
      .findUserOffers()
      .then(offers => {
        res.render('users/index', {
          offers,
          user: req.user,
        });
      })
      .catch(next);
  },

  create(req, res, next) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    new User({
      username: req.body.username,
      email: req.body.email,
      password_digest: hash,
    })
      .save()
      .then(user => {
        req.login(user, err => {
          if (err) return next(err);
          res.redirect('/user');
        });
      })
      .catch(next);
  },

  show(req, res, next) {
    User.getById(req.params.id)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(next);
  },
};

module.exports = usersController;
