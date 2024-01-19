const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const routes = require('./Routes/index');
const passportSetup = require('./Controllers/passport');
const authRoutes = require('./Controllers/auth');
const dotenv = require('dotenv');
const paymentsRouter = require('./Controllers/payment');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Cookie session configuration
app.use(cookieSession({
  name: 'PracticeSession',
  keys: ['practice'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

dotenv.config();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Mount the payments router
app.use('/api/payment', paymentsRouter);

// Define your routes
app.use('/', routes);
app.use('/auth', authRoutes);

const port = 5500;
const hostname = 'localhost';

const atlasDbUrl = 'mongodb+srv://rtmttk555:ts9mQGCP0jSjs8Xt@practice.rqq1xuw.mongodb.net/zomato-clone?retryWrites=true&w=majority';

mongoose.connect(atlasDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
  });
}).catch(err => {
  console.error('Error starting the server:', err);
});
