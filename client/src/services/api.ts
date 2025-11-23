/// <reference types="vite/client" />
import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // Priority 1: Use environment variable if set
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Priority 2: Runtime detection - check current location
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    // If we're NOT on localhost, we're in production - use Railway backend
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '0.0.0.0') {
      return 'https://attendo-production-e807.up.railway.app';
    }
  }
  
  // Priority 3: Check Vite production mode (always true in built app)
  if (import.meta.env.PROD) {
    return 'https://attendo-production-e807.up.railway.app';
  }
  
  // Priority 4: Check if not in dev mode
  if (import.meta.env.MODE !== 'development') {
    return 'https://attendo-production-e807.up.railway.app';
  }
  
  // Default: localhost for development
  return 'http://localhost:3001';
};

const API_BASE_URL = getApiUrl();

// Log for debugging
console.log('=== API Configuration ===');
console.log('API Base URL:', API_BASE_URL);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('PROD:', import.meta.env.PROD);
console.log('MODE:', import.meta.env.MODE);
console.log('Hostname:', typeof window !== 'undefined' ? window.location.hostname : 'N/A');
console.log('Protocol:', typeof window !== 'undefined' ? window.location.protocol : 'N/A');
console.log('========================');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Visit {
  id: number;
  name: string;
  time_in: string;
  time_out?: string;
  status: 'in' | 'out';
}

export interface SignInResponse {
  message: string;
  visit: Visit;
}

export interface SignOutResponse {
  message: string;
  visit: Visit;
}

export interface ActiveVisitsResponse {
  count: number;
  visits: Visit[];
}

export interface RecentVisitsResponse {
  count: number;
  visits: Visit[];
}

export const visitsApi = {
  signIn: async (name: string): Promise<SignInResponse> => {
    const response = await api.post<SignInResponse>('/api/visits/signin', { name });
    return response.data;
  },

  signOut: async (name: string): Promise<SignOutResponse> => {
    const response = await api.post<SignOutResponse>('/api/visits/signout', { name });
    return response.data;
  },

  getActive: async (): Promise<ActiveVisitsResponse> => {
    const response = await api.get<ActiveVisitsResponse>('/api/visits/active');
    return response.data;
  },

  getRecent: async (limit?: number): Promise<RecentVisitsResponse> => {
    const response = await api.get<RecentVisitsResponse>('/api/visits/recent', {
      params: { limit },
    });
    return response.data;
  },
};


