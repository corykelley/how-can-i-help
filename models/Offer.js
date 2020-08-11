const db = require('../db/config');

class Offer {
  constructor(offer) {
    this.id = offer.id;
    this.title = offer.title;
    this.category = offer.category;
    this.description = offer.description;
    this.time_offered = offer.time_offered;
  }

  static getAll() {
    return db
      .manyOrNone(
        `
      SELECT * FROM offers;
    `
      )
      .then(offers => {
        return offers.map(offer => new this(offer));
      });
  }

  // static getById(id) {}

  save() {
    return db
      .one(
        `
      INSERT INTO offers
      (title, category, description, time_offered)
      VALUES
      ($/title/, $/category/, $/description/, $/time_offered/)
      RETURNING *
    `,
        this
      )
      .then(offer => Object.assign(this, offer));
  }
}

module.exports = Offer;
