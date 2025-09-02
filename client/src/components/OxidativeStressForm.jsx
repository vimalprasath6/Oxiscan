import React, { useState } from 'react';
import {
  Heart,
  Droplet,
  Scale,
  UserCircle,
  Cigarette,
  Wine,
  Activity as ActivityIcon,
  Utensils,
  Moon,
  Brain,
  Stethoscope,
  FlaskConical,
  Pill,
  Beaker
} from 'lucide-react';

function OxidativeStressForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    // Newly added fields
    name: '',
    mobileNumber: '',
    dob: '', // Date of Birth

    systolic: '',
    diastolic: '',
    bloodSugar: '',
    height: '',
    weight: '',
    bmi: '',
    age: '',
    gender: 'female',
    smoking: 'no',
    alcoholConsumption: 'none',
    physicalActivity: 'moderate',
    dietType: 'balanced',
    sleepHours: '',
    stressLevel: '3',
    chronicDiseases: [],

    // Lab parameters
    urea: '',
    creatine: '',
    sodium: '',
    potassium: '',
    tBilirubin: '',
    sgot: '',
    sgpt: '',
    alp: '',
    ggt: '',
    tProtein: '',
    albumin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };

      if (name === 'height' || name === 'weight') {
        const height = name === 'height' ? parseFloat(value) : parseFloat(prev.height);
        const weight = name === 'weight' ? parseFloat(value) : parseFloat(prev.weight);

        if (height && weight) {
          const heightInMeters = height / 100;
          const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(1);
          newData.bmi = calculatedBMI;
        }
      }

      return newData;
    });
  };

  const handleChronicDiseaseToggle = (disease) => {
    setFormData(prev => {
      const diseases = [...prev.chronicDiseases];
      const index = diseases.indexOf(disease);

      if (index === -1) {
        diseases.push(disease);
      } else {
        diseases.splice(index, 1);
      }

      return { ...prev, chronicDiseases: diseases };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Pass form data to parent
  };

  const diseases = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Autoimmune Disorder',
    'Cancer',
    'Respiratory Disease'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-black">Oxidative Stress Assessment</h2>
        <p className="text-black mt-2">
          Please provide your health information to evaluate oxidative stress levels
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Form Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Demographics Section */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center mb-4 text-black">
              <UserCircle className="mr-2 text-purple-700" size={20} />
              <h3 className="font-bold">Demographics</h3>
            </div>
            {/* New: Name Input */}
            <div className="mb-4">
              <label className="block text-sm text-black mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black"
                placeholder="John Doe"
                required
              />
            </div>
            {/* New: Mobile Number Input */}
            <div className="mb-4">
              <label className="block text-sm text-black mb-1">Mobile Number</label>
              <input
                type="tel" // Use type="tel" for telephone numbers
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black"
                placeholder="9876543210"
                pattern="[0-9]{10}" // Simple pattern for 10 digits
                required
              />
            </div>
            {/* New: Date of Birth Input */}
            <div className="mb-4">
              <label className="block text-sm text-black mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-black mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black"
                placeholder="35"
                required
              />
            </div>

            {/* Gender selection */}
            <div>
              <label className="block text-sm text-black mb-1">Gender</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-black">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-black">Male</span>
                </label>
              </div>
            </div>
          </div>

          {/* Blood Pressure Section */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-4 text-black">
              <Heart className="mr-2 text-blue-700" size={20} />
              <h3 className="font-bold">Blood Pressure (mmHg)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-black mb-1">Systolic</label>
                <input
                  type="number"
                  name="systolic"
                  value={formData.systolic}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="120"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">Diastolic</label>
                <input
                  type="number"
                  name="diastolic"
                  value={formData.diastolic}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="80"
                  required
                />
              </div>
            </div>
          </div>


          {/* Blood Sugar Section */}
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center mb-4 text-black">
              <Droplet className="mr-2 text-red-700" size={20} />
              <h3 className="font-bold">Blood Sugar (mg/dL)</h3>
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Fasting Blood Sugar</label>
              <input
                type="number"
                name="bloodSugar"
                value={formData.bloodSugar}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                placeholder="95"
                required
              />
            </div>
          </div>

          {/* Body Metrics Section */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-4 text-black">
              <Scale className="mr-2 text-green-700" size={20} />
              <h3 className="font-bold">Body Metrics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-black mb-1">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                  placeholder="170"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                  placeholder="70"
                  required
                />
              </div>
            </div>
          </div>

        </div>

        {/* Laboratory Parameters */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-black mb-4">Laboratory Parameters</h3>

          {/* Kidney Function Tests */}
          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-4 text-black">
              <Pill className="mr-2 text-yellow-700" size={20} />
              <h4 className="font-bold">Kidney Function Tests</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-black mb-1">Urea (mg/dL)</label>
                <input
                  type="number"
                  name="urea"
                  value={formData.urea}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                  placeholder="15"
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">Creatine (mg/dL)</label>
                <input
                  type="number"
                  name="creatine"
                  value={formData.creatine}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                  placeholder="0.9"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">Sodium (Na) (mEq/L)</label>
                <input
                  type="number"
                  name="sodium"
                  value={formData.sodium}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                  placeholder="140"
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">Potassium (K) (mEq/L)</label>
                <input
                  type="number"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                  placeholder="4.0"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* Liver Function Tests */}
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center mb-4 text-black">
              <Beaker className="mr-2 text-amber-700" size={20} />
              <h4 className="font-bold">Liver Function Tests</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-black mb-1">T. Bilirubin (mg/dL)</label>
                <input
                  type="number"
                  name="tBilirubin"
                  value={formData.tBilirubin}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-black"
                  placeholder="0.8"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">
                  SGOT (U/L)
                  <span className="block text-xs text-black">Serum Glutamic-Oxaloacetic Transaminase</span>
                </label>
                <input
                  type="number"
                  name="sgot"
                  value={formData.sgot}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-black"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">
                  SGPT (U/L)
                  <span className="block text-xs text-black">Serum Glutamic Pyruvic Transaminase</span>
                </label>
                <input
                  type="number"
                  name="sgpt"
                  value={formData.sgpt}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-black"
                  placeholder="30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-black mb-1">
                  ALP (U/L)
                  <span className="block text-xs text-black">Alkaline Phosphatase</span>
                </label>
                <input
                  type="number"
                  name="alp"
                  value={formData.alp}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-black"
                  placeholder="85"
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">
                  GGT (U/L)
                  <span className="block text-xs text-black">Gamma-Glutamyl Transferase</span>
                </label>
                <input
                  type="number"
                  name="ggt"
                  value={formData.ggt}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-black"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">T. Protein (g/dL)</label>
                <input
                  type="number"
                  name="tProtein"
                  value={formData.tProtein}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-black"
                  placeholder="7.0"
                  step="0.1"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-black mb-1">Albumin (g/dL)</label>
              <input
                type="number"
                name="albumin"
                value={formData.albumin}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-black"
                placeholder="4.0"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Lifestyle Factors */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-black mb-4">Lifestyle Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Smoking */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3 text-black">
                <Cigarette className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium">Smoking</h4>
              </div>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="smoking"
                    value="no"
                    checked={formData.smoking === 'no'}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-black">No</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="smoking"
                    value="yes"
                    checked={formData.smoking === 'yes'}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-black">Yes</span>
                </label>
              </div>
            </div>

            {/* Alcohol */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3 text-black">
                <Wine className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium">Alcohol Consumption</h4>
              </div>
              <select
                name="alcoholConsumption"
                value={formData.alcoholConsumption}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              >
                <option value="none">None</option>
                <option value="occasional">Occasional</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Physical Activity */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3 text-black">
                <ActivityIcon className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium">Physical Activity</h4>
              </div>
              <select
                name="physicalActivity"
                value={formData.physicalActivity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              >
                <option value="low">Low (Sedentary)</option>
                <option value="moderate">Moderate</option>
                <option value="high">High (Very Active)</option>
              </select>
            </div>

            {/* Diet */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3 text-black">
                <Utensils className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium">Diet Type</h4>
              </div>
              <select
                name="dietType"
                value={formData.dietType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              >
                <option value="balanced">Balanced</option>
                <option value="plant-based">Plant-based</option>
                <option value="high-protein">High Protein</option>
                <option value="unhealthy">Processed/Fast Food</option>
              </select>
            </div>

            {/* Sleep */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3 text-black">
                <Moon className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium">Sleep (hours/day)</h4>
              </div>
              <input
                type="number"
                name="sleepHours"
                value={formData.sleepHours}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="7"
                min="1"
                max="24"
                required
              />
            </div>

            {/* Stress Level */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3 text-black">
                <Brain className="mr-2 text-gray-700" size={18} />
                <h4 className="font-medium">Stress Level (1-5)</h4>
              </div>
              <input
                type="range"
                name="stressLevel"
                value={formData.stressLevel}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min="1"
                max="5"
                step="1"
              />
              <div className="flex justify-between text-xs text-black mt-1">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chronic Diseases */}
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <Stethoscope className="mr-2 text-gray-700" size={20} />
            <h3 className="text-lg font-bold text-black">Chronic Diseases</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {diseases.map(disease => (
                <label key={disease} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.chronicDiseases.includes(disease)}
                    onChange={() => handleChronicDiseaseToggle(disease)}
                    className="text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-black">{disease}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Calculate Oxidative Stress
          </button>
        </div>
      </form>
    </div>
  );
}

export default OxidativeStressForm;