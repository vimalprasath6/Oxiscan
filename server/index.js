const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Existing routes
const bmiRoutes = require('./routes/bmi');

// New: PostgreSQL connection and medical data routes
const { pool } = require('./db'); // Assuming you're using pg-pool for PostgreSQL connection
const medicalDataRoutes = require('./routes/medicalData'); // Medical data routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Existing BMI route
app.use('/api/bmi', bmiRoutes);

// New: Medical data routes
app.use('/api/medicalData', medicalDataRoutes);

// Health check route (optional for quick testing)
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running smoothly!' });
});

// New route for adding medical data
app.post('/api/medicalData/addMedicalData', async (req, res) => {
  const { bmi, bloodPressure, lifestyleFactors, calorieNeeds } = req.body;

  // Log the incoming data for verification
  console.log('Received medical data:', req.body);

  if (!bmi || !bloodPressure || !lifestyleFactors || !calorieNeeds) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Insert medical data into the database
    const result = await pool.query(
      'INSERT INTO medical_data (bmi, bloodPressure, lifestyleFactors, calorieNeeds) VALUES ($1, $2, $3, $4) RETURNING *',
      [bmi, bloodPressure, lifestyleFactors, calorieNeeds]
    );
    console.log('Database result:', result.rows[0]); // Log the result
    res.status(200).json({ message: 'Medical data added successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting data:', error); // Log any errors
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
