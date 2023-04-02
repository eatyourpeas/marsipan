/**
 * Module dependencies.
 */
var express = require("express");
var cookieParser = require("cookie-parser");
var compress = require("compression");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var logger = require("morgan");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var multer = require("multer");

var _ = require("lodash");

var flash = require("express-flash");
var path = require("path");
var expressValidator = require("express-validator");
var connectAssets = require("connect-assets");
var growthmethods = require("growthmethods");

/**
 * Controllers (route handlers).
 */
var homeController = require("./controllers/home");

//var apiController = require('./controllers/api');
var contactController = require("./controllers/contact");
var calculatorController = require("./controllers/calculator");
var riskToolController = require("./controllers/risks");
var patientController = require("./controllers/patient");

/**
 * API keys and Passport configuration.
 */
var secrets = require("./config/secrets");

/**
 * Create Express server.
 */
var app = express();

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(compress());
app.use(
  connectAssets({
    paths: [
      path.join(__dirname, "public/css"),
      path.join(__dirname, "public/js"),
    ],
  })
);
app.use(logger("dev"));
app.use(favicon(path.join(__dirname, "public/favicon.png")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: path.join(__dirname, "uploads") }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function (req, res, next) {
  if (/api/i.test(req.path)) req.session.returnTo = req.path;
  next();
});
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);

app.get("/contact", contactController.getContact);
app.post("/contact", contactController.postContact);

//routes

app.get("/calculator", calculatorController.getCalculator); // comment this out when in development
app.post("/calculator", calculatorController.postCalculator); // comment this out when in development
app.get("/risktool", riskToolController.getRiskTool); // comment this out when in development
app.post("/risktool", riskToolController.postRiskTool); // comment this out when in development

// app.get('/calculator', calculatorController.getCalculator);   //comment this out when in production
// app.post('/calculator', calculatorController.postCalculator); //comment this out when in production
// app.get('/risktool', riskToolController.getRiskTool);   //comment this out when in production
// app.post('/risktool', riskToolController.postRiskTool);   //comment this out when in production
app.get("/about", homeController.getAbout);
app.get("/publications", homeController.getPublications);
app.get("/patientresources", patientController.getPatientResources);

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), function () {
  console.log(
    "Express server listening on port %d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

module.exports = app;
