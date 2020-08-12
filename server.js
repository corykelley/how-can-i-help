const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const offersRouter = require('./routes/offers-router');
const authRouter = require('./routes/auth-routes');
const userRouter = require('./routes/user-routes');

const app = express();
require('dotenv').config();

//Middleware
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Views setup
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', (req, res) => res.render('index'));

app.use('/offers', offersRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use('*', (req, res) => {
  res.status(404).send('Not found!');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});
