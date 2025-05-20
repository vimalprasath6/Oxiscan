import { AlertTriangle, Check, Info, LineChart, ArrowLeft, Activity, Utensils } from 'lucide-react';

function ResultsPanel({ results, bmiData, calorieData, onReset }) {
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
      case 'Severe':
      case 'Obesity':
      case 'Obesity Class I':
      case 'Obesity Class II':
      case 'Obesity Class III':
        return <AlertTriangle size={24} className="text-red-500" />;
      default:
        return <Info size={24} className="text-blue-500" />;
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
        
        {/* Oxidative Stress Section */}
        <div className="mb-6">
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
        </div>
        
        {/* Interpretation */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-blue-800 mb-2 flex items-center">
            <LineChart size={18} className="mr-2" />
            Interpretation
          </h3>
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
          <h3 className="font-bold text-gray-800 mb-3">Recommendations</h3>
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
        
        {/* Disclaimer */}
        <div className="mt-8 text-sm text-gray-500 bg-gray-100 p-3 rounded">
          <p><strong>Disclaimer:</strong> This assessment provides an estimated evaluation based on the information provided. It is not a medical diagnosis and should not replace professional medical advice. Please consult with a healthcare provider for personalized medical guidance.</p>
        </div>
        
        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onReset}
            className="flex items-center justify-center mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
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