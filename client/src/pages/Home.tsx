import { Link } from 'react-router-dom';
import DigitalClock from '../components/DigitalClock';

const Home = () => {
  return (
    <div className="min-h-screen bg-attendo-neutral">
      {/* Header with Clock */}
      <div className="bg-white shadow-sm border-b border-attendo-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-attendo-primary rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16L5 12L6.41 10.59L9 13.17L17.59 4.58L19 6L9 16Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-attendo-text">Attendo</h1>
                <p className="text-xs text-gray-500">A simple and modern way to track presence</p>
              </div>
            </div>
            <div className="hidden md:block">
              <DigitalClock />
            </div>
          </div>
        </div>
      </div>

      {/* Main Welcome Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-4">
        <div className="text-center animate-fade-in max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold text-attendo-text mb-4 animate-slide-up">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Please sign in or out to continue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/signin"
              className="group relative w-full sm:w-64 px-8 py-6 bg-attendo-primary text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/signout"
              className="group w-full sm:w-64 px-8 py-6 bg-white text-attendo-text border-2 border-gray-300 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:border-attendo-primary transform hover:scale-105 transition-all duration-300"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


