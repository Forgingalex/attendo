import { useEffect, useState } from 'react';
import { visitsApi, Visit } from '../services/api';

const RecentList = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoading(true);
        const response = await visitsApi.getRecent(20);
        setVisits(response.visits);
        setError(null);
      } catch (err) {
        setError('Failed to load recent sign outs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
    const interval = setInterval(fetchRecent, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-attendo-text mb-6">Recent Sign-Outs</h2>
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
        <h2 className="text-3xl font-bold text-attendo-text mb-6">Recent Sign-Outs</h2>
        <div className="text-center py-12 text-attendo-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-attendo-text mb-6">Recent Sign-Outs</h2>
      
      {visits.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No recent sign outs</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Table Header */}
          <div className="grid grid-cols-2 gap-4 pb-3 border-b-2 border-gray-100 mb-3">
            <div className="text-sm font-semibold text-gray-600">Name</div>
            <div className="text-sm font-semibold text-gray-600 text-right">Time Out</div>
          </div>
          
          {/* Table Rows */}
          {visits.map((visit, index) => (
            <div
              key={visit.id}
              className="grid grid-cols-2 gap-4 py-3 px-4 border-2 border-gray-100 rounded-xl hover:border-attendo-primary hover:bg-attendo-secondary transition-all duration-300 transform hover:scale-[1.01] animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="font-semibold text-attendo-text">{visit.name}</div>
              <div className="text-sm text-attendo-primary text-right font-medium">
                {visit.time_out
                  ? new Date(visit.time_out).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                  : 'N/A'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentList;


