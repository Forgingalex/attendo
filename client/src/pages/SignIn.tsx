import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { visitsApi } from '../services/api';
import ActiveList from '../components/ActiveList';
import DigitalClock from '../components/DigitalClock';

const SignIn = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    try {
      setLoading(true);
      const response = await visitsApi.signIn(name.trim());
      navigate('/success', {
        state: {
          message: `Welcome, ${response.visit.name}! You signed in at ${new Date(response.visit.time_in).toLocaleTimeString()}`,
          type: 'signin',
          name: response.visit.name,
          time: new Date(response.visit.time_in).toLocaleTimeString(),
        },
      });
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Failed to sign in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-attendo-neutral">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-attendo-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-attendo-primary rounded-xl flex items-center justify-center shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16L5 12L6.41 10.59L9 13.17L17.59 4.58L19 6L9 16Z" fill="white" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-attendo-text">Attendo</h1>
            </div>
            <div className="hidden md:block">
              <DigitalClock />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sign In Form - Left */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
            <h2 className="text-4xl font-bold text-attendo-text mb-3">
              Welcome to the Library
            </h2>
            <p className="text-gray-600 mb-8">
              Please enter your full name to sign in.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-attendo-text mb-3"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-attendo-primary focus:border-attendo-primary outline-none transition-all duration-300 text-lg"
                  placeholder="e.g., Jane Doe"
                  disabled={loading}
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-attendo-error text-attendo-error px-5 py-4 rounded-xl animate-slide-up">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="w-full bg-attendo-primary text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>

          {/* Active List - Right */}
          <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <ActiveList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;


