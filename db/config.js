require('dotenv').config;
const DB_NAME = process.env.DB_NAME || 'how_can_i_help';

const options = {
	query: (e) => {
		console.log(e.query);
	},
};

const pgp = require('pg-promise')(options);

const setDatabase = () => {
	if (process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV) {
		return pgp({
			database: DB_NAME,
			port: 5432,
			host: 'localhost',
			dialectOptions: {
				ssl: {
					require: true,
					refectUnauthorized: false,
				},
			},
		});
	} else {
		return pgp({
			database: `
			postgres://etknahgemynvno:c3cb177dc49bd519462bb243846cfda771a014dca025a1344f2b2e2b228433d6@ec2-34-225-167-77.compute-1.amazonaws.com:5432/d2dupo40cdmog8?sslmode=require`,
			dialect: 'postgres',
			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
			},
			user: process.env.USERNAME,
			password: process.env.PASSWORD,
			host: process.env.HOST,
		});
	}
};

module.exports = setDatabase();
