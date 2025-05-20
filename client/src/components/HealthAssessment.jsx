import { useState } from 'react';
import OxidativeStressForm from './OxidativeStressForm';
import ResultsPanel from './ResultsPanel';
import { calculateCalories } from '../../../server/routes/calorieCalculator'; // Import the new function

function HealthAssessment() {
  const [formData, setFormData] = useState(null);
  const [results, setResults] = useState(null);
  const [bmiData, setBmiData] = useState(null);
  const [calorieData, setCalorieData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    
    // Calculate oxidative stress score (your existing logic)
    const calculatedResults = calculateResults(data);
    setResults(calculatedResults);
    
    // Calculate BMI data (your existing logic)
    const calculatedBMI = calculateBMI(data);
    setBmiData(calculatedBMI);
    
    // New: Calculate calorie data
    const calculatedCalorieData = calculateCalories(data);
    setCalorieData(calculatedCalorieData);
  };

  const handleReset = () => {
    setResults(null);
    setBmiData(null);
    setCalorieData(null);
    setFormData(null);
  };

  // Your existing calculation functions
  const calculateResults = (data) => {
    // Your existing oxidative stress calculation logic
    // ...
  };

  const calculateBMI = (data) => {
    // Your existing BMI calculation logic
    // ...
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {results ? (
        <ResultsPanel 
          results={results} 
          bmiData={bmiData} 
          calorieData={calorieData}  // Pass calorie data to ResultsPanel
          onReset={handleReset} 
        />
      ) : (
        <OxidativeStressForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default HealthAssessment;
