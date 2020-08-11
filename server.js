const express = require('express');
const morgan = require('morgan');

const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', (req, res) => res.send('You did it!'));

app.use('*', (req, res) => {
  res.status(404).send('Not found!');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});
