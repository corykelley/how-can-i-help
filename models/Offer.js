const db = require('../db/config');

class Offer {
  constructor(offer) {
    this.id = offer.id;
    this.title = offer.title;
    this.category = offer.category;
    this.description = offer.description;
    this.time_offered = offer.time_offered;
    this.user_id = offer.user_id;
  }

  static getAll() {
    return db.manyOrNone(
      `
      SELECT * FROM offers
      JOIN users ON offers.user_id = users.id;
    `
    );
    // .then(offers => {
    //   return offers.map(offer => new this(offer));
    // });
  }

  static getById(id) {
    return db
      .oneOrNone(
        `
        SELECT * FROM offers 
        JOIN users 
        ON offers.user_id = users.id 
        WHERE offers.id = $1;
      `,
        id
      )
      .then(offer => {
        if (offer) return new this(offer);
        else throw new Error('No offer found');
      });
  }

  save() {
    return db
      .one(
        `
      INSERT INTO offers
      (title, category, description, time_offered, user_id)
      VALUES
      ($/title/, $/category/, $/description/, $/time_offered/, $/user_id/)
      RETURNING *
    `,
        this
      )
      .then(offer => Object.assign(this, offer));
  }

  update(changes) {
    Object.assign(this, changes);
    return db
      .one(
        `
      UPDATE offers SET
      title = $/title/,
      category = $/category/,
      description = $/description/,
      time_offered = $/time_offered/
      WHERE id = $/id/
      RETURNING *
    `,
        this
      )
      .then(offer => Object.assign(this, offer));
  }

  delete() {
    return db.none('DELETE FROM offers WHERE id = $1', this.id);
  }
}

module.exports = Offer;
