import React from 'react';
import { AlertTriangle, Check, Info, LineChart, ArrowLeft, Activity, Utensils, Heart, TrendingUp, Shield, AlertCircle } from 'lucide-react';

function ResultsPanel({ results, bmiData, calorieData, liverHealthData, onReset }) {
  const { score, level, recommendations } = results;
  
  // Determine the score gauge level and color
  const getScorePercentage = () => {
    // Max score is theoretically 100 for simplicity
    return Math.min(score, 100);
  };
  
  const getLevelIcon = (levelCategory) => {
    switch (levelCategory) {
      case 'Low':
      case 'Normal Weight':
        return <Check size={24} className="text-green-500" />;
      case 'Moderate':
      case 'Overweight':
      case 'Underweight':
        return <Info size={24} className={levelCategory === 'Underweight' ? "text-blue-500" : "text-yellow-500"} />;
      case 'High':
      case 'Severe': // Added Severe for oxidative stress
      case 'Obesity':
      case 'Obesity Class I':
      case 'Obesity Class II':
      case 'Obesity Class III':
        return <AlertTriangle size={24} className="text-red-500" />;
      default:
        return <Info size={24} className="text-blue-500" />;
    }
  };

  // Get liver health status icon and color
  const getLiverHealthIcon = (healthLevel) => {
    switch (healthLevel) {
      case 'Excellent':
        return <Shield size={24} className="text-green-500" />;
      case 'Good':
        return <Check size={24} className="text-green-500" />;
      case 'Fair':
        return <Info size={24} className="text-yellow-500" />;
      case 'Poor':
        return <AlertCircle size={24} className="text-orange-500" />;
      case 'Critical':
        return <AlertTriangle size={24} className="text-red-500" />;
      default:
        return <Info size={24} className="text-blue-500" />;
    }
  };

  const getLiverHealthColor = (healthLevel) => {
    switch (healthLevel) {
      case 'Excellent':
      case 'Good':
        return 'text-green-600';
      case 'Fair':
        return 'text-yellow-600';
      case 'Poor':
        return 'text-orange-600';
      case 'Critical':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const getLiverHealthBgColor = (healthLevel) => {
    switch (healthLevel) {
      case 'Excellent':
      case 'Good':
        return 'bg-green-500';
      case 'Fair':
        return 'bg-yellow-500';
      case 'Poor':
        return 'bg-orange-500';
      case 'Critical':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-700 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Health Assessment Results</h2>
        <p className="text-blue-100">Based on your health information</p>
      </div>
      
      <div className="p-6">
        {/* BMI Result Section */}
        {bmiData && (
          <div className="mb-8 border-b pb-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Activity size={20} className="mr-2" />
              Body Mass Index (BMI)
            </h3>
            
            <div className="flex items-center justify-center mb-4">
              {/* BMI Score Circle */}
              <div className="relative w-32 h-32 flex items-center justify-center mx-auto">
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                <div className={`absolute inset-2 rounded-full ${
                  bmiData.bmiLevel.category === 'Normal Weight' ? 'bg-green-500' :
                  bmiData.bmiLevel.category === 'Underweight' ? 'bg-blue-500' :
                  bmiData.bmiLevel.category === 'Overweight' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-black">{bmiData.bmiScore}</span>
                  <span className="text-xs text-gray-600">BMI</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              {getLevelIcon(bmiData.bmiLevel.category)}
              <h3 className={`text-xl font-bold ml-2 ${
                bmiData.bmiLevel.category === 'Normal Weight' ? 'text-green-600' :
                bmiData.bmiLevel.category === 'Underweight' ? 'text-blue-600' :
                bmiData.bmiLevel.category === 'Overweight' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {bmiData.bmiLevel.category}
              </h3>
            </div>
            
            {/* BMI Range Scale */}
            <div className="mb-4">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-blue-500">Underweight<br/>&lt;18.5</span>
                <span className="text-green-500">Normal<br/>18.5-24.9</span>
                <span className="text-yellow-500">Overweight<br/>25-29.9</span>
                <span className="text-red-500">Obesity<br/>&gt;30</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Calorie Information Section */}
        {calorieData && (
          <div className="mb-8 border-b pb-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Utensils size={20} className="mr-2" />
              Calorie Maintenance & Weight Management
            </h3>
            
            <div className="flex items-center justify-center mb-6">
              {/* Maintenance Calories Circle */}
              <div className="relative w-36 h-36 flex items-center justify-center mx-auto">
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                <div className="absolute inset-2 rounded-full bg-emerald-500"></div>
                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-black">{calorieData.maintenanceCalories}</span>
                  <span className="text-xs text-gray-600 text-center">Maintenance<br/>Calories</span>
                </div>
              </div>
            </div>
            
            {/* Calorie Targets */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-3">Weight Management Targets</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.values(calorieData.calorieTargets).map((target, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg ${
                      index === 0 ? 'bg-emerald-100 border-l-4 border-emerald-500' :
                      index === 1 ? 'bg-blue-100 border-l-4 border-blue-500' :
                      index === 2 ? 'bg-purple-100 border-l-4 border-purple-500' :
                      'bg-pink-100 border-l-4 border-pink-500'
                    } shadow-sm`}
                  >
                    <div className="text-sm font-medium mb-1 text-gray-600">{target.description}</div>
                    <div className="text-xl font-bold text-gray-800">{target.calories} kcal</div>
                    {index > 0 && <div className="text-xs mt-1 text-gray-600">{target.deficit}% deficit</div>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Weight Loss Progress Visualization */}
            <div className="mt-6 mb-4">
              <h4 className="font-medium text-gray-700 mb-3">Calorie Reduction Scale</h4>
              <div className="h-3 bg-gradient-to-r from-emerald-500 via-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
              <div className="flex justify-between text-xs mt-1">
                <span>Maintenance</span>
                <span>Mild Loss</span>
                <span>Moderate Loss</span>
                <span>Extreme Loss</span>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg mt-4 text-sm">
              <p className="text-yellow-800">
                <strong>Note:</strong> These calorie targets are estimations based on your provided information.
                Individual metabolism can vary. Monitor your progress and adjust as needed for optimal results.
              </p>
            </div>
          </div>
        )}
        
        {/* Enhanced Liver Health Section - MOVED TO BE ABOVE OXIDATIVE STRESS */}
        {liverHealthData && (
          <div className="mb-8 border-b pb-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Heart size={20} className="mr-2 text-red-500" />
              Liver Health Assessment
            </h3>
            
            {/* Main Liver Health Score Display */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 mb-6 border border-red-100">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                {/* Score Circle */}
                <div className="flex items-center justify-center mb-4 lg:mb-0">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                    <div className={`absolute inset-2 rounded-full ${getLiverHealthBgColor(liverHealthData.healthLevel)}`}></div>
                    <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center flex-col">
                      <span className="text-4xl font-bold text-black">{liverHealthData.overallScore}</span>
                      <span className="text-xs text-gray-600 text-center">Health<br/>Score</span>
                    </div>
                  </div>
                </div>
                
                {/* Status and Summary */}
                <div className="text-center lg:text-left lg:ml-8 flex-1">
                  <div className="flex items-center justify-center lg:justify-start mb-3">
                    {getLiverHealthIcon(liverHealthData.healthLevel)}
                    <h3 className={`text-2xl font-bold ml-2 ${getLiverHealthColor(liverHealthData.healthLevel)}`}>
                      {liverHealthData.healthLevel} Liver Health
                    </h3>
                  </div>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    liverHealthData.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                    liverHealthData.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  } mb-4`}>
                    <TrendingUp size={16} className="mr-1" />
                    {liverHealthData.riskLevel} Risk Level
                  </div>
                  
                  <p className="text-gray-700 text-sm lg:text-base max-w-md">
                    {liverHealthData.riskLevel === 'Low' && 
                      "Your liver health appears to be in excellent condition. Your lifestyle choices are supporting optimal liver function."}
                    {liverHealthData.riskLevel === 'Moderate' && 
                      "Your liver health shows some areas for improvement. Following the recommendations below can help optimize your liver function."}
                    {liverHealthData.riskLevel === 'High' && 
                      "Your liver health assessment indicates elevated risk factors. Immediate attention to lifestyle factors is recommended."}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Risk Level Scale */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Liver Health Scale</h4>
              <div className="h-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-green-600 font-medium">Excellent (80-100)</span>
                <span className="text-yellow-600 font-medium">Moderate (60-79)</span>
                <span className="text-red-600 font-medium">High Risk (&lt;60)</span>
              </div>
            </div>
            
            {/* Liver Function Test Results */}
            {liverHealthData.liverFunctionResults && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                  <LineChart size={18} className="mr-2" />
                  Liver Function Test Results
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(liverHealthData.liverFunctionResults).map(([key, result]) => (
                    <div key={key} className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      result.status === 'normal' ? 'bg-green-50 border-green-200 hover:border-green-300' :
                      result.status === 'high' ? 'bg-red-50 border-red-200 hover:border-red-300' :
                      result.status === 'low' ? 'bg-blue-50 border-blue-200 hover:border-blue-300' :
                      'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-gray-700">{result.name}</div>
                        <div className={`w-3 h-3 rounded-full ${
                          result.status === 'normal' ? 'bg-green-500' :
                          result.status === 'high' ? 'bg-red-500' :
                          result.status === 'low' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div className="text-xl font-bold text-gray-800 mb-1">
                        {result.value} {result.value !== 'Not provided' ? result.unit : ''}
                      </div>
                      <div className={`text-xs font-medium ${
                        result.status === 'normal' ? 'text-green-600' :
                        result.status === 'high' ? 'text-red-600' :
                        result.status === 'low' ? 'text-blue-600' :
                        'text-gray-600'
                      }`}>
                        {result.level}
                      </div>
                      {result.value !== 'Not provided' && (
                        <div className="text-xs text-gray-500 mt-1">
                          Normal: {result.normalRange}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Contributing Factors */}
            {liverHealthData.factors && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-4">Contributing Health Factors</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs font-medium text-purple-700 mb-1">Alcohol</div>
                    <div className="text-sm font-bold text-purple-800 capitalize">{liverHealthData.factors.alcohol}</div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-xs font-medium text-indigo-700 mb-1">Diet</div>
                    <div className="text-sm font-bold text-indigo-800 capitalize">{liverHealthData.factors.diet}</div>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="text-xs font-medium text-teal-700 mb-1">Exercise</div>
                    <div className="text-sm font-bold text-teal-800 capitalize">{liverHealthData.factors.exercise}</div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="text-xs font-medium text-amber-700 mb-1">Smoking</div>
                    <div className="text-sm font-bold text-amber-800">{liverHealthData.factors.smoking}</div>
                  </div>
                  <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                    <div className="text-xs font-medium text-cyan-700 mb-1">BMI</div>
                    <div className="text-sm font-bold text-cyan-800">{liverHealthData.factors.bmi}</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Liver Health Recommendations */}
            {liverHealthData.recommendations && liverHealthData.recommendations.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                  <Check size={18} className="mr-2 text-green-500" />
                  Personalized Liver Health Recommendations
                </h4>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-lg border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {liverHealthData.recommendations.slice(0, 8).map((recommendation, index) => (
                      <div key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-0.5">
                          <Check size={14} className="text-white" />
                        </div>
                        <span className="text-green-800 text-sm leading-relaxed">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                  {liverHealthData.recommendations.length > 8 && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                        +{liverHealthData.recommendations.length - 8} more recommendations available
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Enhanced Medical Advisory */}
            <div className={`rounded-lg p-4 border-2 ${
              liverHealthData.riskLevel === 'High' ? 'bg-red-50 border-red-200' :
              liverHealthData.riskLevel === 'Moderate' ? 'bg-yellow-50 border-yellow-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <h4 className={`font-bold mb-2 flex items-center ${
                liverHealthData.riskLevel === 'High' ? 'text-red-800' :
                liverHealthData.riskLevel === 'Moderate' ? 'text-yellow-800' :
                'text-blue-800'
              }`}>
                {liverHealthData.riskLevel === 'High' ? 
                  <AlertTriangle size={18} className="mr-2" /> :
                  <Info size={18} className="mr-2" />
                }
                Medical Advisory
              </h4>
              <p className={`text-sm leading-relaxed ${
                liverHealthData.riskLevel === 'High' ? 'text-red-700' :
                liverHealthData.riskLevel === 'Moderate' ? 'text-yellow-700' :
                'text-blue-700'
              }`}>
                {liverHealthData.riskLevel === 'High' && 
                  "⚠️ Your liver health assessment indicates significant risk factors. We strongly recommend consulting with a hepatologist or your primary care physician for comprehensive liver function evaluation and personalized treatment planning."}
                {liverHealthData.riskLevel === 'Moderate' && 
                  "Your liver health shows room for improvement. Consider discussing these results with your healthcare provider to develop a personalized liver health improvement plan."}
                {liverHealthData.riskLevel === 'Low' && 
                  "Your liver health is in good condition. Continue your current healthy lifestyle and maintain regular health check-ups to preserve optimal liver function."}
              </p>
            </div>
          </div>
        )}
        
        {/* Oxidative Stress Section */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-gray-800 mb-4">Oxidative Stress Level</h3>
          
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                {/* Score Gauge */}
                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                  <div 
                    className={`absolute bottom-0 w-full transition-all duration-1000 ease-out ${
                      level.category === 'Low' ? 'bg-green-500' :
                      level.category === 'Moderate' ? 'bg-yellow-500' :
                      level.category === 'High' ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ height: `${getScorePercentage()}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold text-black">{score}</span>
                    <span className="text-sm text-gray-600">Score</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                {getLevelIcon(level.category)}
                <h3 className={`text-xl font-bold ml-2 ${level.color}`}>
                  {level.category} Oxidative Stress
                </h3>
              </div>
            </div>
          </div>
          
          {/* Interpretation */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center">
              <LineChart size={18} className="mr-2" />
              Interpretation
            </h4>
            <p className="text-gray-700">
              {level.category === 'Low' && 
                "Your results indicate a low level of oxidative stress. Your body is likely maintaining a healthy balance between free radicals and antioxidants. Continue your healthy lifestyle habits to maintain this balance."}
              {level.category === 'Moderate' && 
                "Your results indicate a moderate level of oxidative stress. This suggests some imbalance between free radicals and antioxidants in your body. Consider implementing the recommendations below to improve your oxidative balance."}
              {level.category === 'High' && 
                "Your results indicate a high level of oxidative stress. This suggests a significant imbalance between free radicals and antioxidants in your body. It's important to address the contributing factors identified in this assessment."}
              {level.category === 'Severe' && 
                "Your results indicate a severe level of oxidative stress. This suggests a critical imbalance between free radicals and antioxidants in your body. It's strongly recommended to consult with a healthcare professional to address this imbalance."}
            </p>
          </div>
          
          {/* Recommendations */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Oxidative Stress Recommendations</h4>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-8 text-sm text-gray-500 bg-gray-100 p-4 rounded-lg border">
          <p><strong>Important Disclaimer:</strong> This assessment provides an estimated evaluation based on the information provided. It is not a medical diagnosis and should not replace professional medical advice. Please consult with a healthcare provider for personalized medical guidance and before making any significant health-related decisions.</p>
        </div>
        
        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onReset}
            className="flex items-center justify-center mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={16} className="mr-2" />
            Return to Assessment Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPanel;