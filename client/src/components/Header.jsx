import { Activity } from 'lucide-react';
import { useState } from 'react';

function Header({ onHomeClick, onAboutClick, onGetStarted }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
    setIsMenuOpen(false);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    onAboutClick();
    setIsMenuOpen(false);
  };

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    if (onGetStarted) {
      onGetStarted();
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        
        {/* Logo and Tagline */}
        <div className="flex items-center space-x-3">
          <Activity size={32} className="text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">OxiScan</h1>
            <p className="hidden md:block text-sm text-gray-500 font-medium">Oxidative Stress Assessment</p>
          </div>
        </div>
        
        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            <li>
              <a 
                href="#" 
                onClick={handleHomeClick}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#" 
                onClick={handleAboutClick}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                Resources
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:block">
          <button 
            onClick={handleGetStartedClick}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu (Responsive) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white/95 backdrop-blur-lg shadow-inner py-4 transition-all duration-300 ease-in-out`}>
        <ul className="flex flex-col items-center space-y-4">
          <li>
            <a 
              href="#" 
              onClick={handleHomeClick}
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg"
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              onClick={handleAboutClick}
              className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg"
            >
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg">Resources</a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg">Contact</a>
          </li>
          <li className="pt-2">
            <button 
              onClick={handleGetStartedClick}
              className="bg-blue-600 text-white font-semibold py-2 px-8 rounded-full shadow-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </li>
        </ul>
      </div>

    </header>
  );
}

export default Header;

