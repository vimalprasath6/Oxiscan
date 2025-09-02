import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Heart, Shield, FileText, Info } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-8 sm:py-10 mt-8 sm:mt-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="group text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4 sm:mb-5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-105 transition-transform duration-300">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-white text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                OxiScan
              </h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 max-w-xs mx-auto md:max-w-none md:mx-0">
              A comprehensive oxidative stress assessment tool designed to help you understand and manage your cellular health.
            </p>
            <div className="flex space-x-1 justify-center md:justify-start">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-60 animate-pulse" 
                  style={{ animationDelay: `${i * 0.3}s` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="group text-center md:text-left">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-5 flex items-center justify-center md:justify-start">
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3 sm:space-y-3.5">
              {[
                { icon: Info, text: "About Oxidative Stress", href: "#" },
                { icon: FileText, text: "Research", href: "#" },
                { icon: Shield, text: "Privacy Policy", href: "#" },
                { icon: FileText, text: "Terms of Service", href: "#" }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="inline-flex items-center text-gray-400 hover:text-blue-300 hover:translate-x-1 transition-all duration-300 group/link text-sm sm:text-base"
                  >
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5 sm:mr-3 text-blue-400 group-hover/link:text-blue-300" />
                    <span className="relative">
                      {item.text}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover/link:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="group">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-400" />
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group/contact hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300 -ml-3">
                <Mail className="w-5 h-5 mr-3 text-blue-400 mt-0.5 group-hover/contact:text-blue-300" />
                <div>
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Email</span>
                  <p className="text-gray-300 group-hover/contact:text-blue-300 transition-colors">
                    volvtamart@gmail.com
                  </p>
                </div>
              </li>
              <li className="flex items-start group/contact hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300 -ml-3">
                <Phone className="w-5 h-5 mr-3 text-blue-400 mt-0.5 group-hover/contact:text-blue-300" />
                <div>
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Phone</span>
                  <p className="text-gray-300 group-hover/contact:text-blue-300 transition-colors">
                    +91 7904559675
                  </p>
                </div>
              </li>
              <li className="flex items-start group/contact hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300 -ml-3">
                <MapPin className="w-5 h-5 mr-3 text-blue-400 mt-0.5 group-hover/contact:text-blue-300" />
                <div>
                  <span className="text-gray-500 text-xs uppercase tracking-wide">Address</span>
                  <p className="text-gray-300 group-hover/contact:text-blue-300 transition-colors">
                    Mirakle Health Center, Pollachi, Tamilnadu
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative mt-12 sm:mt-16 pt-8 sm:pt-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          
          <div className="flex flex-col items-center space-y-6 sm:space-y-8">
            <div className="text-center">
              <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center">
                <span className="mr-2">&copy; {new Date().getFullYear()} OxiScan. All rights reserved.</span>
                <Heart className="w-3 h-3 text-red-400 animate-pulse" />
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">System Operational</span>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-10 p-4 sm:p-5 bg-gray-800/30 rounded-lg border border-gray-700/50 backdrop-blur-sm">
            <p className="text-xs text-gray-400 text-center flex items-center justify-center">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2.5 text-yellow-400 flex-shrink-0" />
              <span className="leading-relaxed">
                This tool is intended for informational purposes only and is not a substitute for professional medical advice.
              </span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 right-4 sm:right-8 lg:right-10 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/2 right-8 sm:right-12 lg:right-20 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-3/4 right-6 sm:right-10 lg:right-16 w-1 h-1 bg-blue-500 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>
    </footer>
  );
}

export default Footer;
