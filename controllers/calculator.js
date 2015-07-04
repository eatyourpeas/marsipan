var growthmethods = require('growthmethods');
/**
 * GET /
 * Calculator page.
 */
exports.getCalculator = function(req, res) {

  res.render('calculator', {
    title: '%mBMI Calculator',
    date_of_birth: "", date_of_clinic: "", height: "", weight: "", systolic: "", diastolic: "", calendar_age: "", decimal_age: "", height_centile: "", height_sds: "", weight_centile: "", weight_sds: "", bMI: "", bmi_centile: "", bmi_sds: "", systolic_sds: "", systolic_centile: "", diastolic_sds: "", diastolic_centile: "", pctmBMI: "", ideal_weight: "", ninth_centile: "", ninetyfirst_centile: "", eighty_five_percent: "", ninety_percent: "", ninety_five_percent: "", one_sd: "", two_sd: ""
  });
};

exports.postCalculator = function(req, res){

	var height = req.body.height;
	var weight = req.body.weight;
	var bMI = req.body.bMI;
	var clinic_date = req.body.date_of_clinic;
	var date_of_birth = req.body.date_of_birth;
	var gender = req.body.gender;
	var systolicBP = req.body.systolic;
	var diastolicBP = req.body.diastolic;
  var systolic_SDS_label = req.body.systolic_sds;
  var diastolic_SDS_label = req.body.diastolic_sds;
  var systolic_centile_label = req.body.systolic_centile;
  var diastolic_centile_label = req.body.diastolic_centile;
	isMale=false;
	if (gender=="male") {isMale=true};

	var decimal_age, calendar_age, height_centile, height_sds, weight_centile, weight_sds, bmi, bmi_centile, bmi_sds, pctmBMI, systolicBP, diastolicBP, systolic_sds, systolic_centile, diastolic_sds, diastolic_centile;
	decimal_age = growthmethods.decimalAgeFromDates(date_of_birth, clinic_date);

	var calendar_age = growthmethods.chronologicalAgeFromDates(date_of_birth, clinic_date);

	var originalDecimalAge = decimal_age;

	if (decimal_age >20) {
		decimal_age = 20;
	};

	///do the calculations

	bmi = growthmethods.bmiFromHeightandWeight(height, weight);
	height_sds = growthmethods.SDS("height",  decimal_age,  height, isMale);
	weight_sds = growthmethods.SDS("weight",  decimal_age,  weight, isMale);
	bmi_sds = growthmethods.SDS("BMI",  decimal_age,  bmi, isMale);
	weight_centile = growthmethods.convertZScoreToCentile(weight_sds);
	height_centile = growthmethods.convertZScoreToCentile(height_sds);
	bmi_centile = growthmethods.convertZScoreToCentile(bmi_sds);
	pctmBMI = growthmethods.percentageMedianBMI(bmi, decimal_age, isMale);

console.log('ermm.. '+systolicBP);

  if (systolicBP.length > 0) {
    console.log('true!');
    systolic_sds = growthmethods.bpSDS(true, isMale, decimal_age, systolicBP);
    systolic_centile = growthmethods.convertZScoreToCentile(systolic_sds);
    systolic_sds = Math.round(systolic_sds*100)/100;
    systolic_centile = Math.round(systolic_centile*10)/10;
    systolic_centile = centileBeyondThreshold(systolic_centile);
  } else {
    systolic_centile = "";
    systolic_sds = "";
  }

  if (diastolicBP.length > 0) {
    diastolic_sds = growthmethods.bpSDS(false, isMale, decimal_age, diastolicBP);
    diastolic_centile = growthmethods.convertZScoreToCentile(diastolic_sds);
    diastolic_sds = Math.round(diastolic_sds*100)/100;
    diastolic_centile = Math.round(diastolic_centile*10)/10;
    diastolic_centile = centileBeyondThreshold(diastolic_centile);
  } else {
    diastolic_centile = "";
    diastolic_sds = "";
  }

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


	decimal_age = Math.round(originalDecimalAge*100)/100;
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


	res.render('calculator', {date_of_birth: date_of_birth, date_of_clinic: clinic_date, height: height, weight: weight, systolic: systolicBP, diastolic: diastolicBP, gender: gender, calendar_age: calendar_age, decimal_age: decimal_age, height_centile: height_centile, height_sds: height_sds, weight_centile: weight_centile, weight_sds: weight_sds, bMI: bmi, bmi_centile: bmi_centile, bmi_sds: bmi_sds, systolic_sds: systolic_sds, systolic_centile: systolic_centile, diastolic_sds: diastolic_sds, diastolic_centile: diastolic_centile, pctmBMI: pctmBMI, ideal_weight: ideal_weight, ninth_centile: ninth_centile, ninetyfirst_centile: ninetyfirst_centile, eighty_five_percent: eighty_five_percent, ninety_percent: ninety_percent, ninety_five_percent: ninety_five_percent, one_sd: one_sd, two_sd: two_sd});

};



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

function makeString(valueToTest){
	var returnValue = valueToTest;
	console.log("is it null?");
	if (valueToTest===null || valueToTest==="" || valueToTest === undefined) {
		console.log("null!");
		valueToTest = "";
	};
	return returnValue;
}
