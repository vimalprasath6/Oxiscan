import React from 'react';
import { Activity, Heart, Scale, Brain, Shield, FlaskConical } from 'lucide-react';

const Home = ({ onGetStarted }) => {
  return (
    <div className="bg-white min-h-screen w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 w-full">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Oxidative Stress Prediction Platform
          </h1>
          <p className="text-xl mb-8">
            Understand your oxidative stress levels and receive personalized recommendations
            for a healthier lifestyle.
          </p>
          <button 
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              style={{ backgroundColor: 'white', color: '#2563EB' }}>Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 w-full">
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Discover</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <FlaskConical size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Oxidative Stress Score</h3>
              <p className="text-gray-600">Get a comprehensive assessment of your oxidative stress levels based on multiple health factors.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <Scale size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">BMI Calculation</h3>
              <p className="text-gray-600">Calculate your Body Mass Index and understand its impact on your overall health.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <Brain size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
              <p className="text-gray-600">Receive tailored advice to reduce oxidative stress and improve your well-being.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20 w-screen">
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:space-x-12">
              <div className="flex-1 mb-8 md:mb-0">
                <div className="flex items-start mb-6">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-black">Complete the Assessment</h3>
                    <p className="text-gray-600">Fill out our comprehensive health questionnaire including blood pressure, diet, lifestyle habits, and more.</p>
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-black">Get Your Results</h3>
                    <p className="text-gray-600">Receive instant analysis of your oxidative stress levels, BMI, and calorie needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-black">Take Action</h3>
                    <p className="text-gray-600">Follow personalized recommendations to improve your health and reduce oxidative stress.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Oxidative Stress Matters Section */}
      <section className="py-20 w-full">
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Oxidative Stress Matters</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Heart className="text-red-500 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-black">Heart Health</h3>
                </div>
                <p className="text-gray-600">High oxidative stress can lead to cardiovascular issues and increased risk of heart disease.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Shield className="text-green-500 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-black">Immune System</h3>
                </div>
                <p className="text-gray-600">Managing oxidative stress helps maintain a strong immune system and disease resistance.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Brain className="text-purple-500 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-black">Brain Function</h3>
                </div>
                <p className="text-gray-600">Reduced oxidative stress supports better cognitive function and mental clarity.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Activity className="text-orange-500 mr-2" size={24} />
                  <h3 className="text-lg font-semibold text-black">Healthy Aging</h3>
                </div>
                <p className="text-gray-600">Lower oxidative stress levels are associated with healthier aging and longevity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 w-full">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-8">Start your journey to better health by understanding your oxidative stress levels today.</p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            style={{ backgroundColor: 'white', color: '#2563EB' }}            
            >
            Begin Assessment
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;