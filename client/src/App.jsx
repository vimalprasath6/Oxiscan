
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import OxidativeStressForm from './components/OxidativeStressForm';
import ResultsPanel from './components/ResultsPanel';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
// import LiverHealthAnalyzer from './components/LiverHealthAnalyzer'; // No longer directly used as a component to render
import axios from 'axios';
import { calculateCalories } from '../../server/routes/calorieCalculator'; // Assuming this utility is available client-side for the purpose of this integration

// --- Utility functions for calculations (extracted from App.jsx and LiverHealthAnalyzer.jsx) ---

// BMI Calculation (from original App.jsx)
const calculateBMICategory = (bmiValue) => {
  if (bmiValue < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
  if (bmiValue < 25) return { category: 'Normal Weight', color: 'text-green-600' };
  if (bmiValue < 30) return { category: 'Overweight', color: 'text-yellow-600' };
  if (bmiValue < 35) return { category: 'Obesity Class I', color: 'text-red-600' };
  if (bmiValue < 40) return { category: 'Obesity Class II', color: 'text-red-600' };
  return { category: 'Obesity Class III', color: 'text-red-600' };
};

// Oxidative Stress Score Calculation (from original App.jsx)
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

  return Math.min(100, score); // Cap score at 100
};

// Oxidative Stress Level (from original App.jsx)
const getOxidativeStressLevel = (score) => {
  if (score >= 70) return { category: 'Severe', color: 'text-red-600' };
  if (score >= 40) return { category: 'High', color: 'text-orange-600' };
  if (score >= 20) return { category: 'Moderate', color: 'text-yellow-600' };
  return { category: 'Low', color: 'text-green-600' };
};

// Oxidative Stress Recommendations (from original App.jsx)
const generateOxidativeStressRecommendations = (data, bmiValue, systolic, diastolic, bloodSugar, sleepHours, stressLevel, calorieData) => {
  const recommendations = [];

  if (bmiValue >= 25) recommendations.push("Work towards achieving a healthy weight through a balanced diet and regular exercise.");
  if (systolic > 120 || diastolic > 80) recommendations.push("Monitor your blood pressure and reduce sodium intake.");
  if (bloodSugar > 100) recommendations.push("Monitor blood sugar and reduce simple carbohydrates.");
  if (data.smoking === 'yes') recommendations.push("Quit smoking to reduce oxidative stress.");
  if (['high', 'moderate'].includes(data.alcoholConsumption)) recommendations.push("Reduce alcohol consumption.");
  if (data.physicalActivity === 'low') recommendations.push("Increase physical activity to at least 150 minutes of moderate-intensity activity per week.");
  if (['unhealthy', 'high-protein'].includes(data.dietType)) recommendations.push("Increase consumption of antioxidant-rich foods like fruits, vegetables, and whole grains.");
  if (sleepHours < 7 || sleepHours > 9) recommendations.push("Aim for 7-9 hours of quality sleep per night.");
  if (stressLevel >= 4) recommendations.push("Incorporate stress management techniques such as meditation, yoga, or deep breathing exercises.");

  if (bmiValue > 25 && calorieData?.calorieTargets?.moderateLoss?.calories) {
    recommendations.push(`For sustainable weight loss, consider a daily calorie target of approximately ${calorieData.calorieTargets.moderateLoss.calories} kcal.`);
  }

  // Ensure a minimum number of recommendations for low stress levels if not enough specific ones
  if (recommendations.length < 3) {
    recommendations.push("Stay well-hydrated by drinking at least 8 glasses of water daily.");
    recommendations.push("Include a wide variety of colorful fruits and vegetables in your diet for diverse antioxidants.");
    recommendations.push("Consider consulting a healthcare professional about potential antioxidant supplements after a proper assessment.");
  }

  return recommendations;
};

// --- Liver Health Calculation Logic (extracted from LiverHealthAnalyzer.jsx) ---
const liverReferenceRanges = { // Renamed to avoid conflict
    tBilirubin: { min: 0.2, max: 1.2, unit: 'mg/dL' },
    sgot: { min: 10, max: 40, unit: 'U/L' },
    sgpt: { min: 7, max: 56, unit: 'U/L' },
    alp: { min: 44, max: 147, unit: 'U/L' },
    ggt: { min: 9, max: 48, unit: 'U/L' },
    tProtein: { min: 6.0, max: 8.3, unit: 'g/dL' },
    albumin: { min: 3.5, max: 5.0, unit: 'g/dL' }
};

const getLiverParameterStatus = (value, range) => { // Renamed
    if (!value || value === '') return { status: 'not-provided', level: 'Unknown' };
    const numValue = parseFloat(value);
    if (numValue < range.min) return { status: 'low', level: 'Low' };
    if (numValue > range.max) return { status: 'high', level: 'High' };
    return { status: 'normal', level: 'Normal' };
};

const calculateLiverHealthScore = (formData) => { // Passed formData explicitly
    let score = 100;
    const parameters = ['tBilirubin', 'sgot', 'sgpt', 'alp', 'ggt', 'tProtein', 'albumin'];

    parameters.forEach(param => {
        const value = formData[param];
        if (value && value !== '') {
            const status = getLiverParameterStatus(value, liverReferenceRanges[param]); // Using liverReferenceRanges
            if (status.status === 'high') {
                if (param === 'sgot' || param === 'sgpt') {
                    const numValue = parseFloat(value);
                    const maxNormal = liverReferenceRanges[param].max;
                    if (numValue > maxNormal * 2) score -= 20;
                    else if (numValue > maxNormal * 1.5) score -= 15;
                    else score -= 10;
                } else if (param === 'tBilirubin') {
                    score -= 15;
                } else if (param === 'ggt') {
                    score -= 12;
                } else if (param === 'alp') {
                    score -= 10;
                }
            } else if (status.status === 'low') {
                if (param === 'albumin' || param === 'tProtein') {
                    score -= 15; // Low protein/albumin is concerning
                } else {
                    score -= 5;
                }
            }
        }
    });

    // Additional factors affecting liver health
    if (formData.alcoholConsumption === 'high') score -= 15;
    else if (formData.alcoholConsumption === 'moderate') score -= 8;
    
    if (formData.smoking === 'yes') score -= 10;
    
    if (formData.chronicDiseases?.includes('Diabetes')) score -= 10;
    if (formData.chronicDiseases?.includes('Hypertension')) score -= 5;
    
    if (formData.dietType === 'unhealthy') score -= 10;
    if (formData.physicalActivity === 'low') score -= 8;
    
    const currentBmi = parseFloat(formData.bmi);
    if (currentBmi >= 30) score -= 12;
    else if (currentBmi >= 25) score -= 6;

    return Math.max(0, Math.min(100, score));
};

const getLiverHealthLevel = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 55) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Critical';
};

const getLiverRiskLevel = (score) => {
    if (score >= 80) return 'Low';
    if (score >= 60) return 'Moderate';
    return 'High';
};

const generateLiverRecommendations = (score, level, formData) => { // Passed formData for specific checks
    const recommendations = [];
    
    const sgotStatus = getLiverParameterStatus(formData.sgot, liverReferenceRanges.sgot);
    const sgptStatus = getLiverParameterStatus(formData.sgpt, liverReferenceRanges.sgpt);
    const bilirubinStatus = getLiverParameterStatus(formData.tBilirubin, liverReferenceRanges.tBilirubin);
    const ggtStatus = getLiverParameterStatus(formData.ggt, liverReferenceRanges.ggt);
    const albuminStatus = getLiverParameterStatus(formData.albumin, liverReferenceRanges.albumin);

    if (sgotStatus.status === 'high' || sgptStatus.status === 'high') {
        recommendations.push("Elevated liver enzymes (SGOT/SGPT) detected. Consider reducing alcohol consumption and avoiding hepatotoxic medications. Follow up with a hepatologist for further evaluation.");
    }
    if (bilirubinStatus.status === 'high') {
        recommendations.push("Elevated bilirubin may indicate liver dysfunction or bile duct issues. Medical evaluation recommended.");
    }
    if (ggtStatus.status === 'high') {
        recommendations.push("Elevated GGT suggests possible alcohol-related liver damage or bile duct problems.");
    }
    if (albuminStatus.status === 'low') {
        recommendations.push("Low albumin may indicate impaired liver protein synthesis. Nutritional assessment recommended.");
    }

    if (formData.alcoholConsumption === 'high' || formData.alcoholConsumption === 'moderate') {
        recommendations.push("Consider significantly reducing or eliminating alcohol consumption to support liver health.");
    }
    if (formData.smoking === 'yes') {
        recommendations.push("Smoking cessation can significantly improve overall liver health and reduce oxidative stress.");
    }
    if (formData.dietType === 'unhealthy') {
        recommendations.push("Adopt a liver-friendly diet rich in antioxidants, lean proteins, and healthy fats, while limiting processed foods and refined sugars.");
    }
    if (parseFloat(formData.bmi) >= 25) {
        recommendations.push("Weight management through diet and exercise can help reduce fatty liver risk and improve liver function.");
    }
    if (formData.physicalActivity === 'low') {
        recommendations.push("Regular physical activity helps prevent fatty liver disease and improves overall liver health.");
    }

    if (score < 70) {
        recommendations.push("Explore hepatic antioxidant supplements like milk thistle, N-acetylcysteine, or vitamin E (always consult your doctor first).");
        recommendations.push("Stay hydrated and strictly avoid processed foods high in sugar and trans fats.");
    }
    if (score < 55) {
        recommendations.push("Schedule regular liver function monitoring with your healthcare provider.");
        recommendations.push("Consider consultation with a hepatologist for comprehensive liver health assessment and management.");
    }

    return recommendations.length > 0 ? recommendations : [
        "Maintain current healthy lifestyle habits to preserve excellent liver function.",
        "Continue regular health check-ups, including liver function tests, as part of your preventive care.",
        "Stay hydrated and maintain a balanced diet rich in whole foods and antioxidants."
    ];
};

const getLiverFunctionResults = (formData) => {
    const results = {};
    Object.entries(liverReferenceRanges).forEach(([param, range]) => { // Using liverReferenceRanges
        const value = formData[param];
        const status = getLiverParameterStatus(value, range);
        const displayName = {
            tBilirubin: 'Total Bilirubin',
            sgot: 'SGOT (AST)',
            sgpt: 'SGPT (ALT)',
            alp: 'ALP',
            ggt: 'GGT',
            tProtein: 'Total Protein',
            albumin: 'Albumin'
        }[param];

        results[param] = {
            name: displayName,
            value: value || 'Not provided',
            unit: range.unit,
            status: status.status,
            level: status.level,
            normalRange: `${range.min}-${range.max} ${range.unit}`
        };
    });
    return results;
};
// --- End Liver Health Calculation Logic ---


function App() {
  const [assessmentData, setAssessmentData] = useState({
    results: null, // Oxidative Stress results
    formData: null,
    bmiData: null,
    calorieData: null,
    liverHealthData: null // New state for liver health
  });

  
  const [currentPage, setCurrentPage] = useState('home');

  const handleSubmit = async (data) => {
    // Basic validation to ensure crucial numeric fields are present
    const requiredFields = ['bmi', 'systolic', 'diastolic', 'bloodSugar', 'sleepHours', 'age', 'height', 'weight'];
    const missingFields = requiredFields.filter(field => !data[field] || isNaN(parseFloat(data[field])));

    if (missingFields.length > 0) {
      alert(`Please ensure all required fields are filled and valid. Missing/Invalid: ${missingFields.join(', ')}`);
      console.error("Missing/Invalid required data fields:", missingFields);
      return;
    }

    const bmiValue = parseFloat(data.bmi);
    const systolic = parseInt(data.systolic);
    const diastolic = parseInt(data.diastolic);
    const bloodSugar = parseInt(data.bloodSugar);
    const sleepHours = parseInt(data.sleepHours);
    const stressLevel = parseInt(data.stressLevel);

    const bmiCategory = calculateBMICategory(bmiValue);
    const calorieInfo = calculateCalories(data); // Assuming calculateCalories function is available

    // --- Oxidative Stress Calculation ---
    const oxidativeStressScore = calculateOxidativeStressScore(data, bmiValue);
    const oxidativeStressLevel = getOxidativeStressLevel(oxidativeStressScore);
    const oxidativeStressRecommendations = generateOxidativeStressRecommendations(
      data, bmiValue, systolic, diastolic, bloodSugar, sleepHours, stressLevel, calorieInfo
    );

    // --- Liver Health Calculation (using extracted logic) ---
    const liverScore = calculateLiverHealthScore(data); // Pass full formData
    const liverHealthLevel = getLiverHealthLevel(liverScore);
    const liverRiskLevel = getLiverRiskLevel(liverScore);
    const liverRecommendations = generateLiverRecommendations(liverScore, liverHealthLevel, data); // Pass formData
    const liverFunctionResults = getLiverFunctionResults(data); // Pass formData

    const calculatedLiverHealthData = {
        overallScore: liverScore,
        healthLevel: liverHealthLevel,
        riskLevel: liverRiskLevel,
        recommendations: liverRecommendations,
        liverFunctionResults: liverFunctionResults,
        factors: {
            alcohol: data.alcoholConsumption || 'Not specified',
            diet: data.dietType?.replace('-', ' ') || 'Not specified',
            exercise: data.physicalActivity || 'Not specified',
            smoking: data.smoking === 'yes' ? 'Smoker' : 'Non-smoker',
            bmi: data.bmi || 'Not specified'
        }
    };
    // End Liver Health Calculation

    // Send medical data to the backend (adjust endpoint and data structure as per your backend)
    try {
      await axios.post('http://localhost:3000/api/medicalData/addMedicalData', {
        bmi: bmiValue,
        blood_pressure: `${systolic}/${diastolic}`,
        blood_sugar: bloodSugar,
        age: data.age,
        gender: data.gender,
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        sleepHours: sleepHours,
        stressLevel: stressLevel,
        chronicDiseases: data.chronicDiseases,
        
        // Lab parameters
        urea: parseFloat(data.urea) || null,
        creatine: parseFloat(data.creatine) || null,
        sodium: parseFloat(data.sodium) || null,
        potassium: parseFloat(data.potassium) || null,
        tBilirubin: parseFloat(data.tBilirubin) || null,
        sgot: parseFloat(data.sgot) || null,
        sgpt: parseFloat(data.sgpt) || null,
        alp: parseFloat(data.alp) || null,
        ggt: parseFloat(data.ggt) || null,
        tProtein: parseFloat(data.tProtein) || null,
        albumin: parseFloat(data.albumin) || null,

        // Lifestyle factors as an object (backend might stringify)
        lifestyle_factors: {
          smoking: data.smoking,
          alcoholConsumption: data.alcoholConsumption,
          physicalActivity: data.physicalActivity,
          dietType: data.dietType
        },
        calorie_needs: calorieInfo.calorieTargets?.maintenance?.calories || 0, // Sending maintenance calories
        oxidative_stress_score: oxidativeStressScore,
        liver_health_score: liverScore
      });
      console.log("Medical data sent successfully!");
    } catch (error) {
      console.error("Failed to send medical data to server:", error);
      // alert("Failed to save data to server. Check console for details."); // Uncomment for user feedback
    }

    setAssessmentData({
      formData: data,
      bmiData: {
        bmiScore: bmiValue.toFixed(1),
        bmiLevel: bmiCategory
      },
      calorieData: calorieInfo,
      results: { // Oxidative Stress Results
        score: oxidativeStressScore,
        level: oxidativeStressLevel,
        recommendations: oxidativeStressRecommendations
      },
      liverHealthData: calculatedLiverHealthData // Set liver health data
    });
    setCurrentPage('results');
  };

  const handleReset = () => {
    setAssessmentData({
      results: null,
      formData: null,
      bmiData: null,
      calorieData: null,
      liverHealthData: null
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
      calorieData: null,
      liverHealthData: null
    });
  };

  const navigateToAbout = () => {
    setCurrentPage('about');
  };

  return (
        <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 sm:pt-28 overflow-x-hidden">
      {/* Header */}
      <Header
        onHomeClick={() => setCurrentPage("home")}
        onAboutClick={() => setCurrentPage("about")}
        onGetStarted={() => setCurrentPage("oxidative-stress-form")}
      />

      <main className="flex-grow w-screen px-0 sm:px-0 py-4 sm:py-6 lg:py-8 pt-20 sm:pt-24">
        {currentPage === 'home' && <Home onGetStarted={handleGetStarted} />}
        {currentPage === 'about' && <AboutUs />}
        {currentPage === 'form' && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 lg:p-8 w-full">
            <OxidativeStressForm onSubmit={handleSubmit} />
          </div>
        )}
        {currentPage === 'results' && assessmentData.results && (
          <div className="w-full">
            <ResultsPanel 
              results={assessmentData.results} // Oxidative Stress
              bmiData={assessmentData.bmiData}
              calorieData={assessmentData.calorieData}
              liverHealthData={assessmentData.liverHealthData} // Pass liver health data
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
