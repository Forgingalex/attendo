import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import DigitalClock from '../components/DigitalClock';

const Success = () => {
  const location = useLocation();
  const [checkmarkVisible, setCheckmarkVisible] = useState(false);
  const type = location.state?.type || 'success';
  const name = location.state?.name || '';
  const time = location.state?.time || '';

  useEffect(() => {
    // Animate checkmark after a brief delay
    setTimeout(() => setCheckmarkVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-attendo-neutral">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-attendo-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-2xl font-bold text-attendo-text">Attendo</h1>
            <div className="hidden md:block">
              <DigitalClock />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 text-center animate-bounce-in">
          {/* Animated Checkmark */}
          <div className="mb-8 flex justify-center">
            <div className={`w-24 h-24 bg-attendo-success rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 ${checkmarkVisible ? 'scale-100' : 'scale-0'}`}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={checkmarkVisible ? 'checkmark-animation' : ''}
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>

          {/* Welcome Message */}
          <h1 className="text-4xl font-bold text-attendo-text mb-4 animate-slide-up">
            {type === 'signin' ? `Welcome, ${name}!` : 'Success!'}
          </h1>
          
          {type === 'signin' && time && (
            <p className="text-lg text-gray-600 mb-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Signed in at {time}
            </p>
          )}
          
          {type === 'signout' && time && (
            <p className="text-lg text-gray-600 mb-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Signed out at {time}
            </p>
          )}
          
          <p className="text-gray-500 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Thank you for visiting.
          </p>

          {/* Done Button */}
          <Link
            to="/"
            className="block w-full bg-attendo-primary text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <span className="relative z-10">Done</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          {/* Progress Bar */}
          <div className="mt-8 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-attendo-primary rounded-full animate-pulse-slow" style={{ width: '33%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;


