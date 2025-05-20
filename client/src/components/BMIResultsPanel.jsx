import { useEffect, useState } from 'react';
import { AlertTriangle, Check, Info, LineChart, ArrowLeft, Activity } from 'lucide-react';

function BMIResultsPanel({ height, weight, onReset }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBMIResults = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('http://localhost:3000/api/bmi/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            height: height,
            weight: weight
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to calculate BMI');
        }
        
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBMIResults();
  }, [height, weight]);
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-32 w-32 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded w-32"></div>
        </div>
        <p className="mt-4 text-gray-600">Calculating your BMI...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center text-red-500">
          <AlertTriangle size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">Error</h3>
          <p>{error}</p>
          <button
            onClick={onReset}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!results) return null;
  
  const { score, level, recommendations } = results;
  
  // Get appropriate background color based on BMI category
  const getCircularGaugeColor = () => {
    const category = level.category;
    if (category === 'Normal Weight') return 'bg-green-500';
    if (category === 'Underweight') return 'bg-blue-500';
    if (category === 'Overweight') return 'bg-yellow-500';
    return 'bg-red-500'; // Obesity categories
  };
  
  const getLevelIcon = () => {
    const category = level.category;
    if (category === 'Normal Weight') {
      return <Check size={24} className="text-green-500" />;
    } else if (category === 'Underweight') {
      return <Info size={24} className="text-blue-500" />;
    } else if (category === 'Overweight') {
      return <Info size={24} className="text-yellow-500" />;
    } else {
      return <AlertTriangle size={24} className="text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-700 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Body Mass Index Assessment</h2>
        <p className="text-blue-100">Based on your height and weight</p>
      </div>
      
      {/* Score Display - Fixed Circular Gauge */}
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <div className="text-center">
            {/* Circular gauge that clearly shows BMI value */}
            <div className="relative w-48 h-48 flex items-center justify-center mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gray-200"></div>
              <div className={`absolute inset-2 rounded-full ${getCircularGaugeColor()}`}></div>
              <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center flex-col">
                <span className="text-4xl font-bold">{score}</span>
                <span className="text-sm text-gray-600">BMI</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              {getLevelIcon()}
              <h3 className={`text-xl font-bold ml-2 ${level.color}`}>
                {level.category}
              </h3>
            </div>
          </div>
        </div>
        
        {/* BMI Range Scale */}
        <div className="mb-6">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-blue-500">Underweight<br/>&lt;18.5</span>
            <span className="text-green-500">Normal<br/>18.5-24.9</span>
            <span className="text-yellow-500">Overweight<br/>25-29.9</span>
            <span className="text-red-500">Obesity<br/>&gt;30</span>
          </div>
        </div>
        
        {/* Interpretation */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-blue-800 mb-2 flex items-center">
            <Activity size={18} className="mr-2" />
            BMI Interpretation
          </h3>
          <p className="text-gray-700">
            {level.category === 'Underweight' && 
              "Your BMI indicates you are underweight. This may be associated with certain health risks including nutritional deficiencies and a weakened immune system. Consider consulting with a healthcare provider."}
            {level.category === 'Normal Weight' && 
              "Your BMI is within the normal/healthy weight range. This is generally associated with lower health risks. Continue maintaining your healthy lifestyle habits."}
            {level.category === 'Overweight' && 
              "Your BMI indicates you are overweight. This may be associated with increased health risks including cardiovascular disease and diabetes. Consider implementing the recommendations below."}
            {level.category.includes('Obesity') && 
              "Your BMI indicates obesity. This is associated with increased health risks including cardiovascular disease, diabetes, and other conditions. It's important to address contributing factors with guidance from healthcare professionals."}
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
          <p><strong>Disclaimer:</strong> BMI is a screening tool and not a diagnostic of body fatness or health. BMI has limitations as it does not directly measure body fat or account for muscle mass, bone density, or ethnic differences. Please consult with a healthcare provider for a complete health assessment.</p>
        </div>
        
        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onReset}
            className="flex items-center justify-center mx-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Return to BMI Calculator
          </button>
        </div>
      </div>
    </div>
  );
}

export default BMIResultsPanel;