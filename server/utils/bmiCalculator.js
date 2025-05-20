// bmiCalculator.js
// BMI Calculator backend service

/**
 * Calculate BMI based on height in cm and weight in kg
 * @param {number} heightCm - Height in centimeters
 * @param {number} weightKg - Weight in kilograms
 * @returns {Object} BMI result with score and category
 */
const calculateBMI = (heightCm, weightKg) => {
  // Convert height from cm to meters
  const heightM = heightCm / 100;
  
  // Calculate BMI: weight(kg) / height(m)²
  const bmiScore = weightKg / (heightM * heightM);
  
  // Round to 1 decimal place
  const roundedBMI = Math.round(bmiScore * 10) / 10;
  
  // Determine BMI category
  let category, color, recommendations;
  
  if (roundedBMI < 18.5) {
    category = 'Underweight';
    color = 'text-blue-600';
    recommendations = [
      'Consider consulting with a healthcare provider about healthy weight gain strategies',
      'Focus on nutrient-dense foods to support healthy weight gain',
      'Include strength training exercises to build muscle mass',
      'Aim for regular, balanced meals throughout the day',
      'Consider tracking your caloric intake to ensure adequate energy consumption'
    ];
  } else if (roundedBMI < 25) {
    category = 'Normal Weight';
    color = 'text-green-600';
    recommendations = [
      'Maintain your balanced diet and regular physical activity',
      'Continue regular health check-ups',
      'Stay hydrated and get adequate sleep',
      'Consider strength training to maintain muscle mass',
      'Focus on nutrient-rich foods to support overall health'
    ];
  } else if (roundedBMI < 30) {
    category = 'Overweight';
    color = 'text-yellow-600';
    recommendations = [
      'Focus on portion control and mindful eating habits',
      'Aim for at least 150 minutes of moderate exercise weekly',
      'Reduce intake of processed foods and sugary beverages',
      'Consider consulting with a nutritionist for a personalized eating plan',
      'Monitor your weight regularly to track progress'
    ];
  } else if (roundedBMI < 35) {
    category = 'Obesity Class I';
    color = 'text-orange-600';
    recommendations = [
      'Consult with a healthcare provider about weight management strategies',
      'Incorporate both cardio and strength training into your routine',
      'Focus on whole foods and reduce ultra-processed food consumption',
      'Consider keeping a food journal to track eating patterns',
      'Set realistic weight loss goals (0.5-1 kg per week)'
    ];
  } else if (roundedBMI < 40) {
    category = 'Obesity Class II';
    color = 'text-red-600';
    recommendations = [
      'Consult with a healthcare provider before starting any weight loss program',
      'Focus on sustainable lifestyle changes rather than rapid weight loss',
      'Consider working with a registered dietitian and fitness professional',
      'Monitor related health markers like blood pressure and blood sugar',
      'Build a support system to help maintain motivation'
    ];
  } else {
    category = 'Obesity Class III';
    color = 'text-red-800';
    recommendations = [
      'Work with healthcare professionals for medical supervision of weight management',
      'Consider structured programs that include dietary, physical activity, and behavioral components',
      'Monitor health markers closely with your healthcare provider',
      'Focus on gradual improvements in daily habits',
      'Celebrate non-scale victories like improved energy and mobility'
    ];
  }
  
  return {
    score: roundedBMI,
    level: { category, color },
    recommendations
  };
};

module.exports = { calculateBMI };