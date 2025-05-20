// routes/bmi.js
const express = require('express');
const router = express.Router();
const { calculateBMI } = require('../utils/bmiCalculator');

/**
 * POST /api/bmi/calculate
 * Calculate BMI based on provided height and weight
 */
router.post('/calculate', (req, res) => {
  try {
    const { height, weight } = req.body;
    
    // Validate inputs
    if (!height || !weight) {
      return res.status(400).json({ 
        error: 'Both height (cm) and weight (kg) are required' 
      });
    }
    
    // Convert to numbers and validate
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    
    if (isNaN(heightNum) || isNaN(weightNum)) {
      return res.status(400).json({ 
        error: 'Height and weight must be valid numbers' 
      });
    }
    
    if (heightNum <= 0 || weightNum <= 0) {
      return res.status(400).json({ 
        error: 'Height and weight must be positive values' 
      });
    }
    
    // Calculate BMI
    const bmiResult = calculateBMI(heightNum, weightNum);
    
    // Return result
    res.json(bmiResult);
  } catch (error) {
    console.error('BMI calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate BMI' });
  }
});

module.exports = router;