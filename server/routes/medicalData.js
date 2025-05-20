const express = require('express');
const router = express.Router();
const { pool } = require('../db'); // Assuming you're using pg-pool for PostgreSQL connection

// Insert medical data into the database
router.post('/addMedicalData', async (req, res) => {
  const { bmi, bloodPressure, lifestyleFactors, calorieNeeds } = req.body;

  // Log the incoming data for debugging
  console.log('Received medical data:', req.body);

  // Validate incoming data
  if (!bmi || !bloodPressure || !lifestyleFactors || !calorieNeeds) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Insert medical data into the database
    const result = await pool.query(
      `INSERT INTO medical_data (bmi, bloodPressure, lifestyleFactors, calorieNeeds)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [bmi, bloodPressure, lifestyleFactors, calorieNeeds]
    );
    console.log('Data inserted successfully:', result.rows[0]); // Log the result

    // Respond with the inserted data
    res.status(201).json({
      message: 'Medical data added successfully',
      data: result.rows[0]
    });
  } catch (err) {
    // Log error and send appropriate response
    console.error('Error inserting medical data:', err);
    res.status(500).json({ message: 'Error adding medical data', error: err.message });
  }
});

// Fetch all medical data from the database
router.get('/getMedicalData', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM medical_data');
    console.log('Fetched medical data:', result.rows); // Log the fetched data
    res.json(result.rows); // Return the fetched data
  } catch (err) {
    // Log error and send appropriate response
    console.error('Error fetching medical data:', err);
    res.status(500).json({ message: 'Error fetching medical data', error: err.message });
  }
});

module.exports = router;
