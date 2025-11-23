import { useEffect, useState } from 'react';
import { visitsApi, Visit } from '../services/api';

const ActiveList = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActive = async () => {
    try {
      setLoading(true);
      const response = await visitsApi.getActive();
      setVisits(response.visits);
      setError(null);
    } catch (err) {
      setError('Failed to load active visitors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActive();
    const interval = setInterval(fetchActive, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-attendo-text mb-6">Currently Signed In</h2>
        <div className="text-center py-12 text-gray-500">
          <svg className="animate-spin h-8 w-8 mx-auto text-attendo-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-attendo-text mb-6">Currently Signed In</h2>
        <div className="text-center py-12 text-attendo-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-attendo-text">Currently Signed In</h2>
        <span className="bg-attendo-success text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          {visits.length}
        </span>
      </div>
      
      {visits.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p>No active visitors at the moment</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {/* Table Header */}
          <div className="grid grid-cols-2 gap-4 pb-3 border-b-2 border-gray-100 mb-3">
            <div className="text-sm font-semibold text-gray-600">Name</div>
            <div className="text-sm font-semibold text-gray-600 text-right">Time In</div>
          </div>
          
          {/* Table Rows */}
          {visits.map((visit, index) => (
            <div
              key={visit.id}
              className="grid grid-cols-2 gap-4 py-3 px-4 bg-attendo-secondary rounded-xl hover:bg-indigo-50 transition-all duration-300 transform hover:scale-[1.02] animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="font-semibold text-attendo-text">{visit.name}</div>
              <div className="text-sm text-gray-600 text-right">
                {new Date(visit.time_in).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Total Count Footer */}
      <div className="mt-6 bg-attendo-secondary rounded-xl p-4 text-center">
        <span className="text-attendo-text font-semibold">
          Total People Currently Signed In: <span className="text-attendo-primary text-xl">{visits.length}</span>
        </span>
      </div>
    </div>
  );
};

export default ActiveList;


