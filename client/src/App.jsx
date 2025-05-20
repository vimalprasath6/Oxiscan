import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import OxidativeStressForm from './components/OxidativeStressForm';
import ResultsPanel from './components/ResultsPanel';
import Home from './components/Home';
import axios from 'axios';
import { calculateCalories } from "../../server/routes/calorieCalculator";

// Utility functions
const calculateBMICategory = (bmiValue) => {
  if (bmiValue < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
  if (bmiValue < 25) return { category: 'Normal Weight', color: 'text-green-600' };
  if (bmiValue < 30) return { category: 'Overweight', color: 'text-yellow-600' };
  if (bmiValue < 35) return { category: 'Obesity Class I', color: 'text-red-600' };
  if (bmiValue < 40) return { category: 'Obesity Class II', color: 'text-red-600' };
  return { category: 'Obesity Class III', color: 'text-red-600' };
};

const calculateOxidativeStressScore = (data, bmiValue) => {
  let score = 0;
  const systolic = parseInt(data.systolic);
  const diastolic = parseInt(data.diastolic);

  if (systolic > 140 || diastolic > 90) score += 15;
  else if (systolic > 130 || diastolic > 85) score += 10;
  else if (systolic > 120 || diastolic > 80) score += 5;

  if (bmiValue >= 30) score += 15;
  else if (bmiValue >= 25) score += 10;
  else if (bmiValue < 18.5) score += 5;

  const bloodSugar = parseInt(data.bloodSugar);
  if (bloodSugar > 126) score += 15;
  else if (bloodSugar > 100) score += 10;
  else if (bloodSugar > 90) score += 5;

  if (data.smoking === 'yes') score += 20;

  if (data.alcoholConsumption === 'high') score += 15;
  else if (data.alcoholConsumption === 'moderate') score += 10;
  else if (data.alcoholConsumption === 'occasional') score += 5;

  if (data.physicalActivity === 'low') score += 10;

  if (data.dietType === 'unhealthy') score += 15;

  const sleepHours = parseInt(data.sleepHours);
  if (sleepHours < 5 || sleepHours > 9) score += 10;

  const stressLevel = parseInt(data.stressLevel);
  score += (stressLevel * 3);

  score += (data.chronicDiseases?.length || 0) * 5;

  return score;
};

const getOxidativeStressLevel = (score) => {
  if (score >= 70) return { category: 'Severe', color: 'text-red-600' };
  if (score >= 40) return { category: 'High', color: 'text-orange-600' };
  if (score >= 20) return { category: 'Moderate', color: 'text-yellow-600' };
  return { category: 'Low', color: 'text-green-600' };
};

const generateRecommendations = (data, bmiValue, systolic, diastolic, bloodSugar, sleepHours, stressLevel, calorieData) => {
  const recommendations = [];

  if (bmiValue >= 25) recommendations.push("Work towards achieving a healthy weight through a balanced diet and regular exercise.");
  if (systolic > 120 || diastolic > 80) recommendations.push("Monitor your blood pressure and reduce sodium intake.");
  if (bloodSugar > 100) recommendations.push("Monitor blood sugar and reduce simple carbohydrates.");
  if (data.smoking === 'yes') recommendations.push("Quit smoking to reduce oxidative stress.");
  if (['high', 'moderate'].includes(data.alcoholConsumption)) recommendations.push("Reduce alcohol consumption.");
  if (data.physicalActivity === 'low') recommendations.push("Increase physical activity to 150 mins/week.");
  if (['unhealthy', 'high-protein'].includes(data.dietType)) recommendations.push("Eat more antioxidant-rich foods.");
  if (sleepHours < 7 || sleepHours > 9) recommendations.push("Get 7-9 hours of sleep.");
  if (stressLevel >= 4) recommendations.push("Practice stress management like meditation or yoga.");

  if (bmiValue > 25 && calorieData?.goals?.length >= 3) {
    recommendations.push(`Follow a calorie target of ${calorieData.goals[2].calories} per day for weight loss.`);
  }

  if (recommendations.length < 3) {
    recommendations.push("Stay hydrated with at least 8 glasses of water.");
    recommendations.push("Eat antioxidant-rich foods like berries, greens, and nuts.");
    recommendations.push("Consider antioxidant supplements with medical advice.");
  }

  return recommendations;
};

function App() {
  const [assessmentData, setAssessmentData] = useState({
    results: null,
    formData: null,
    bmiData: null,
    calorieData: null
  });
  const [currentPage, setCurrentPage] = useState('home');

  const handleSubmit = async (data) => {
    if (!data || !data.bmi || !data.systolic || !data.diastolic || !data.bloodSugar) {
      console.error("Missing required data fields");
      return;
    }

    const bmiValue = parseFloat(data.bmi);
    const systolic = parseInt(data.systolic);
    const diastolic = parseInt(data.diastolic);
    const bloodSugar = parseInt(data.bloodSugar);
    const sleepHours = parseInt(data.sleepHours);
    const stressLevel = parseInt(data.stressLevel);

    const bmiCategory = calculateBMICategory(bmiValue);
    const calorieData = calculateCalories(data);
    const score = calculateOxidativeStressScore(data, bmiValue);
    const level = getOxidativeStressLevel(score);
    const recommendations = generateRecommendations(
      data, bmiValue, systolic, diastolic, bloodSugar, sleepHours, stressLevel, calorieData
    );

    // Send medical data to the backend
    try {
      await axios.post('http://localhost:3000/api/medicalData/addMedicalData', {
        bmi: bmiValue,
        blood_pressure: `${systolic}/${diastolic}`,
        lifestyle_factors: JSON.stringify({
          smoking: data.smoking,
          alcoholConsumption: data.alcoholConsumption,
          physicalActivity: data.physicalActivity,
          dietType: data.dietType,
          stressLevel: stressLevel,
          sleepHours: sleepHours
        }),
        calorie_needs: calorieData.goals?.[1]?.calories || 0 // maintenance goal as example
      });
    } catch (error) {
      console.error("Failed to send medical data to server:", error);
    }

    setAssessmentData({
      formData: data,
      bmiData: {
        bmiScore: bmiValue.toFixed(1),
        bmiLevel: bmiCategory
      },
      calorieData,
      results: {
        score,
        level,
        recommendations
      }
    });
    setCurrentPage('results');
  };

  const handleReset = () => {
    setAssessmentData({
      results: null,
      formData: null,
      bmiData: null,
      calorieData: null
    });
    setCurrentPage('form');
  };

  const handleGetStarted = () => {
    setCurrentPage('form');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setAssessmentData({
      results: null,
      formData: null,
      bmiData: null,
      calorieData: null
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onHomeClick={navigateToHome} />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl bg-white">
        {currentPage === 'home' && <Home onGetStarted={handleGetStarted} />}
        {currentPage === 'form' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <OxidativeStressForm onSubmit={handleSubmit} />
          </div>
        )}
        {currentPage === 'results' && assessmentData.results && (
          <ResultsPanel 
            results={assessmentData.results}
            bmiData={assessmentData.bmiData}
            calorieData={assessmentData.calorieData}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
