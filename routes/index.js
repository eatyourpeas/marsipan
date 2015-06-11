var express = require('express');
var growthmethods = require('growthmethods');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.get('/calculator', function(req, res, next){
	res.render('calculator', {title: 'Calculator'})
});

router.post('/calculator', function(req, res){
	var height = req.body.height;
	var weight = req.body.weight;
	var clinic_date = req.body.date_of_clinic;
	var date_of_birth = req.body.date_of_birth;
	var gender = req.body.sexchange;
	isMale=false;
	if (gender=="Male") {isMale=true};
	var decimal_age, calendar_age, height_centile, height_sds, weight_centile, weight_sds, bmi, bmi_centile, bmi_sds, pctmBMI;
	decimal_age = growthmethods.decimalAgeFromDates(date_of_birth, clinic_date);

	var calendar_age = growthmethods.chronologicalAgeFromDates(date_of_birth, clinic_date);
	console.log(calendar_age);
	
	///do the calculations
//	calendar_age = growthmethods.chronologicalAgeFromDates(date_of_birth, clinic_date);
	bmi = growthmethods.bmiFromHeightandWeight(height, weight);
	height_sds = growthmethods.SDS("height",  decimal_age,  height, isMale);
	weight_sds = growthmethods.SDS("weight",  decimal_age,  weight, isMale);
	bmi_sds = growthmethods.SDS("BMI",  decimal_age,  bmi, isMale);
	weight_centile = growthmethods.convertZScoreToCentile(weight_sds);
	height_centile = growthmethods.convertZScoreToCentile(height_sds);
	bmi_centile = growthmethods.convertZScoreToCentile(bmi_sds);
	pctmBMI = growthmethods.percentageMedianBMI(bmi, decimal_age, isMale);

/// weight target calculations
	
	var medianBMI = growthmethods.measurementFromSDS("BMI", 0, bmi, isMale, decimal_age);
	var ninthCentileBMI = growthmethods.measurementFromSDS("BMI", -1.341, bmi, isMale, decimal_age);
	var ninetyfirstCentileBMI = growthmethods.measurementFromSDS("BMI", 1.341, bmi, isMale, decimal_age);
	var targetWeight100pctmBMI = growthmethods.weightForBMI(height, medianBMI);
	var targetWeight95pctmBMI = targetWeight100pctmBMI * 0.95;
	var targetWeight90pctmBMI = targetWeight100pctmBMI * 0.9;
	var targetWeight85pctmBMI = targetWeight100pctmBMI * 0.85;
	var targetWeight9thCentileBMI = growthmethods.weightForBMI(height, ninthCentileBMI);
	var targetWeight91stCentileBMI = growthmethods.weightForBMI(height, ninetyfirstCentileBMI);
	var BMIat1SD = growthmethods.measurementFromSDS("BMI", 1, bmi, isMale, decimal_age);
	var BMIat2SD = growthmethods.measurementFromSDS("BMI", 2, bmi, isMale, decimal_age);
	var weightFor1SDBMI = growthmethods.weightForBMI(height, BMIat1SD);
	var weightFor2SDBMI = growthmethods.weightForBMI(height, BMIat2SD);


	decimal_age = Math.round(decimal_age*100)/100;
	bmi = Math.round(bmi*10)/10;
	height_centile = Math.round(height_centile*10)/10;
	height_sds = Math.round(height_sds*10)/10;
	weight_centile = Math.round(weight_centile*10)/10;
	weight_sds = Math.round(weight_sds*10)/10;
	bmi_centile = Math.round(bmi_centile*10)/10;
	bmi_sds = Math.round(bmi_sds*10)/10;
	pctmBMI = Math.round(pctmBMI*10)/10;

	height_centile = centileBeyondThreshold(height_centile);
	weight_centile = centileBeyondThreshold(weight_centile);
	bmi_centile = centileBeyondThreshold(bmi_centile);

	///

	ideal_weight = Math.round(targetWeight100pctmBMI*100)/100;
	ninth_centile = Math.round(targetWeight9thCentileBMI*100)/100;
	ninetyfirst_centile = Math.round(targetWeight91stCentileBMI*100)/100;
	ninety_five_percent = Math.round(targetWeight95pctmBMI*100)/100;
	ninety_percent = Math.round(targetWeight90pctmBMI*100)/100;
	eighty_five_percent = Math.round(targetWeight85pctmBMI*100)/100;
	one_sd = Math.round(weightFor1SDBMI*100)/100;
	two_sd = Math.round(weightFor2SDBMI*100)/100;
	
	
	
	res.render('calculator', {date_of_birth: date_of_birth, date_of_clinic: clinic_date, height: height, weight: weight, calendar_age: calendar_age, decimal_age: decimal_age, height_centile: height_centile, height_sds: height_sds, weight_centile: weight_centile, weight_sds: weight_sds, bmi_centile: bmi_centile, bmi_sds: bmi_sds, pctmBMI: pctmBMI, ideal_weight: ideal_weight, ninth_centile: ninth_centile, ninetyfirst_centile: ninetyfirst_centile, eighty_five_percent: eighty_five_percent, ninety_percent: ninety_percent, ninety_five_percent: ninety_five_percent, one_sd: one_sd, two_sd: two_sd});

});

function centileBeyondThreshold(centile){
	var centileThreshold = "";
	if (centile < 0.4) {
		centileThreshold = "<0.4";
		return centileThreshold;
	} else if (centile>99.6) {
		centileThreshold = ">99.6";
		return centileThreshold;
	} else {
		return centile;
	}

}
module.exports = router;