const db = require('../db/config');
const Offer = require('../models/Offer');

class User {
  constructor({ id, username, email, password_digest }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_digest = password_digest;
  }

  static findByUserName(username) {
    return db
      .oneOrNone(
        `
      SELECT * FROM users WHERE username = $1
      ORDER BY id ASC;
    `,
        username
      )
      .then(user => {
        if (user) return new this(user);
        else throw new Error('User not found!');
      });
  }

  save() {
    return db
      .one(
        `
      INSERT INTO users
      (username, email, password_digest)
      VALUES
      ($/username/, $/email/, $/password_digest/)
      RETURNING *;
    `,
        this
      )
      .then(savedUser => Object.assign(this, savedUser));
  }

  findUserOffers() {
    return db
      .manyOrNone('SELECT * FROM offers WHERE user_id = $1;', this.id)
      .then(offers => {
        return offers.map(offer => new Offer(offer));
      });
  }
}

module.exports = User;
