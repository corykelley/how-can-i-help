const fetch = require('node-fetch');
require('dotenv').config();

const getLinksList = (req, res, next) => {
  fetch(
    `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&body=${searchParams}&site=stackoverflow`
  )
    .then(res => res.json())
    .then(data => {
      res.locals.data = data.items;
      next();
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = {
  getLinksList,
};
