import { useState } from 'react';
import { Scale, Ruler, UserCircle } from 'lucide-react';
import BMIResultsPanel from './BMIResultsPanel';

function BMICalculator() {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
  });
  
  const [results, setResults] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store the height and weight to pass to the results panel
    setResults({
      height: formData.height,
      weight: formData.weight,
    });
  };
  
  const handleReset = () => {
    setResults(null);
  };
  
  if (results) {
    return <BMIResultsPanel 
      height={results.height} 
      weight={results.weight} 
      onReset={handleReset} 
    />;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-black">Body Mass Index Calculator</h2>
        <p className="text-black mt-2">
          Enter your height and weight to calculate your BMI
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="space-y-6">
          {/* Height Field */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-4 text-black">
              <Ruler className="mr-2 text-blue-700" size={20} />
              <h3 className="font-bold">Height</h3>
            </div>
            <div>
              <div className="flex">
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="170"
                  min="50"
                  max="250"
                  required
                />
                <span className="bg-gray-100 p-2 border border-l-0 border-gray-300 rounded-r-md text-gray-500">
                  cm
                </span>
              </div>
            </div>
          </div>
          
          {/* Weight Field */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-4 text-black">
              <Scale className="mr-2 text-green-700" size={20} />
              <h3 className="font-bold">Weight</h3>
            </div>
            <div>
              <div className="flex">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="70"
                  min="20"
                  max="300"
                  step="0.1"
                  required
                />
                <span className="bg-gray-100 p-2 border border-l-0 border-gray-300 rounded-r-md text-gray-500">
                  kg
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Calculate BMI
          </button>
        </div>
      </form>
    </div>
  );
}

export default BMICalculator;