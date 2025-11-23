import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { visitsApi } from '../services/api';
import RecentList from '../components/RecentList';
import DigitalClock from '../components/DigitalClock';

const SignOut = () => {
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
      const response = await visitsApi.signOut(name.trim());
      navigate('/success', {
        state: {
          message: `Successfully signed out, ${response.visit.name}!`,
          type: 'signout',
          name: response.visit.name,
          time: response.visit.time_out ? new Date(response.visit.time_out).toLocaleTimeString() : 'now',
        },
      });
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Failed to sign out. Please try again.'
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
            <h1 className="text-2xl font-bold text-attendo-text">Attendo</h1>
            <div className="hidden md:block">
              <DigitalClock />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-attendo-primary focus:border-attendo-primary outline-none transition-all duration-300 text-lg bg-white shadow-lg"
                placeholder="Search your name to sign out..."
                disabled={loading}
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="px-8 py-4 bg-attendo-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing out...
                  </span>
                ) : (
                  'Sign Out'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 border-2 border-attendo-error text-attendo-error px-5 py-4 rounded-xl animate-slide-up">
              {error}
            </div>
          )}
        </div>

        {/* Recent Sign Outs */}
        <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <RecentList />
        </div>
      </div>
    </div>
  );
};

export default SignOut;


