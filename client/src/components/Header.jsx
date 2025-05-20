import { Activity } from 'lucide-react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity size={28} className="text-blue-200" />
            <div>
              <h1 className="text-2xl font-bold">OxiScan</h1>
              <p className="text-sm text-blue-200">Oxidative Stress Assessment</p>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-blue-200 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Resources</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Header;