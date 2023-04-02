var express = require("express");
var router = express.Router();
var homeController = require("../controllers/home");
var calculatorController = require("../controllers/calculator");
var riskToolController = require("../controllers/risks");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("home", {});
// });
router.get("/", homeController.index);
router.get("/calculator", calculatorController.getCalculator); // comment this out when in development
router.post("/calculator", calculatorController.postCalculator); // comment this out when in development
router.get("/risktool", riskToolController.getRiskTool); // comment this out when in development
router.post("/risktool", riskToolController.postRiskTool); // comment this out when in development
router.get("/apps", calculatorController.getApps);
router.get("/privacy", homeController.privacy);

module.exports = router;
