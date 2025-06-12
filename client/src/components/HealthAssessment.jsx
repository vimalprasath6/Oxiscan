import { useState } from 'react';
import OxidativeStressForm from './OxidativeStressForm';
import ResultsPanel from './ResultsPanel';
import LiverHealthAnalyzer from './LiverHealthAnalyzer';
import { calculateCalories } from '../../../server/routes/calorieCalculator';

function HealthAssessment() {
  const [formData, setFormData] = useState(null);
  const [results, setResults] = useState(null);
  const [bmiData, setBmiData] = useState(null);
  const [calorieData, setCalorieData] = useState(null);
  const [liverHealthData, setLiverHealthData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    
    // Calculate oxidative stress score (your existing logic)
    const calculatedResults = calculateResults(data);
    setResults(calculatedResults);
    
    // Calculate BMI data (your existing logic)
    const calculatedBMI = calculateBMI(data);
    setBmiData(calculatedBMI);
    
    // Calculate calorie data
    const calculatedCalorieData = calculateCalories(data);
    setCalorieData(calculatedCalorieData);
    
    // Set liver health data - we'll pass the form data directly to the component
    // The LiverHealthAnalyzer component handles its own calculations
    setLiverHealthData(data);
  };

  const handleReset = () => {
    setResults(null);
    setBmiData(null);
    setCalorieData(null);
    setLiverHealthData(null);
    setFormData(null);
  };

  // Your existing calculation functions
  const calculateResults = (data) => {
    // Your existing oxidative stress calculation logic
    // This is a placeholder - replace with your actual logic
    return {
      score: 75,
      level: 'Moderate',
      recommendations: ['Sample recommendation']
    };
  };

  const calculateBMI = (data) => {
    // Your existing BMI calculation logic
    // This is a placeholder - replace with your actual logic
    const height = parseFloat(data.height) / 100; // Convert cm to meters
    const weight = parseFloat(data.weight);
    const bmi = weight / (height * height);
    
    return {
      bmi: bmi.toFixed(1),
      category: bmi < 18.5 ? 'Underweight' : 
               bmi < 25 ? 'Normal' : 
               bmi < 30 ? 'Overweight' : 'Obese'
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Comprehensive Health Assessment
          </h1>
          <p className="text-lg text-gray-600">
            Complete health analysis including oxidative stress, BMI, calories, and liver health
          </p>
        </div>

        {results ? (
          <div className="space-y-6">
            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={handleReset}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
              >
                Take New Assessment
              </button>
            </div>

            {/* Results Panels */}
            <div className="grid grid-cols-1 gap-6">
              {/* Existing Results Panel */}
              <ResultsPanel 
                results={results} 
                bmiData={bmiData} 
                calorieData={calorieData} 
              />
              
              {/* Liver Health Analyzer */}
              {liverHealthData && (
                <LiverHealthAnalyzer formData={liverHealthData} />
              )}
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {results && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Oxidative Stress</h3>
                    <p className="text-2xl font-bold text-blue-600">{results.score}</p>
                    <p className="text-sm text-blue-700">{results.level}</p>
                  </div>
                )}
                
                {bmiData && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800">BMI</h3>
                    <p className="text-2xl font-bold text-green-600">{bmiData.bmi}</p>
                    <p className="text-sm text-green-700">{bmiData.category}</p>
                  </div>
                )}
                
                {calorieData && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800">Daily Calories</h3>
                    <p className="text-2xl font-bold text-purple-600">{calorieData.maintenance}</p>
                    <p className="text-sm text-purple-700">Maintenance</p>
                  </div>
                )}
                
                {liverHealthData && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800">Liver Health</h3>
                    <p className="text-2xl font-bold text-orange-600">Analyzed</p>
                    <p className="text-sm text-orange-700">See detailed results above</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <OxidativeStressForm onSubmit={handleFormSubmit} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthAssessment;