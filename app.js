/**
 * Module dependencies.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');
var multer  = require('multer');

var _ = require('lodash');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');
var growthmethods = require('growthmethods');

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
//var apiController = require('./controllers/api');
var contactController = require('./controllers/contact');
var calculatorController = require('./controllers/calculator');
var riskToolController = require('./controllers/risks');
var patientController = require('./controllers/patient');

/**
 * API keys and Passport configuration.
 */
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB, {useMongoClient: true}); //comment out in development
//mongoose.connect('mongodb://localhost:27017/test', {useMongoClient: true}); //comment out in production
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')]
}));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public/favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: path.join(__dirname, 'uploads') }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET, //comment out in development
//  secret: "aadfafafadfadfa", //comment out in production
  store: new MongoStore({ url: process.env.MONGODB, autoReconnect: true }) //comment out in development
//  store: new MongoStore({ url: 'mongodb://localhost:27017/test', autoReconnect: true }) //comment out in production
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  if (/api/i.test(req.path)) req.session.returnTo = req.path;
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login',  userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/signedup/:token', userController.getSignedup); //mine
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

//routes

app.get('/calculator', passportConf.isAuthenticated, calculatorController.getCalculator); // comment this out when in development
app.post('/calculator', passportConf.isAuthenticated, calculatorController.postCalculator); // comment this out when in development
app.get('/risktool', passportConf.isAuthenticated, riskToolController.getRiskTool); // comment this out when in development
app.post('/risktool', passportConf.isAuthenticated, riskToolController.postRiskTool); // comment this out when in development
app.get('/apps', passportConf.isAuthenticated, calculatorController.getApps);

// app.get('/calculator', calculatorController.getCalculator);   //comment this out when in production
// app.post('/calculator', calculatorController.postCalculator); //comment this out when in production
// app.get('/risktool', riskToolController.getRiskTool);   //comment this out when in production
// app.post('/risktool', riskToolController.postRiskTool);   //comment this out when in production
app.get('/about', homeController.getAbout);
app.get('/publications', homeController.getPublications);
app.get('/patientresources', patientController.getPatientResources);


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
