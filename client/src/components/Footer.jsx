function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">OxiScan</h3>
            <p className="text-sm">
              A comprehensive oxidative stress assessment tool designed to help you understand and manage your cellular health.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-300 transition-colors">About Oxidative Stress</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: volvtamart@gmail.com</li>
              <li>Phone: +91 7904559675</li>
              <li>Address: Mirakle Health Center, Pollachi, Tamilnadu</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} OxiScan. All rights reserved.</p>
          <p className="mt-2 text-gray-400">
            This tool is intended for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
