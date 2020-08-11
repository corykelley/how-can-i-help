const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const offersRouter = require('./routes/offers-router');

const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.set('views', 'views');
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', (req, res) => res.render('index'));

app.use('/offers', offersRouter);

app.use('*', (req, res) => {
  res.status(404).send('Not found!');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});
