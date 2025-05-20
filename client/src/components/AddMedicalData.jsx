// src/components/AddMedicalData.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AddMedicalData = () => {
  const [bmi, setBmi] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [lifestyleFactors, setLifestyleFactors] = useState('');
  const [calorieNeeds, setCalorieNeeds] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const medicalData = {
      bmi,
      blood_pressure: bloodPressure,
      lifestyle_factors: lifestyleFactors,
      calorie_needs: calorieNeeds,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/medicalData/addMedicalData', medicalData);
      console.log('Medical data added:', response.data);
      setSuccessMessage('Data added successfully!');
      setErrorMessage('');
      // Clear the fields
      setBmi('');
      setBloodPressure('');
      setLifestyleFactors('');
      setCalorieNeeds('');
    } catch (error) {
      console.error('Error adding medical data:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to add data. Check server or database connection.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Add Medical Data</h2>
      {successMessage && <p className="text-green-600 mb-2 text-center">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mb-2 text-center">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border border-gray-300 rounded-lg"
          type="text"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
          placeholder="BMI"
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-lg"
          type="text"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
          placeholder="Blood Pressure"
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-lg"
          type="text"
          value={lifestyleFactors}
          onChange={(e) => setLifestyleFactors(e.target.value)}
          placeholder="Lifestyle Factors"
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-lg"
          type="text"
          value={calorieNeeds}
          onChange={(e) => setCalorieNeeds(e.target.value)}
          placeholder="Calorie Needs"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit Data
        </button>
      </form>
    </div>
  );
};

export default AddMedicalData;
