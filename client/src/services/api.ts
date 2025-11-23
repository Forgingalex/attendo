/// <reference types="vite/client" />
import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // Check if we have the env variable (set during build)
  if (import.meta.env.VITE_API_URL) {
    console.log('Using VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  // Check if we're in production mode (Vite built-in)
  if (import.meta.env.PROD) {
    console.log('Production mode detected, using Railway backend');
    return 'https://attendo-production-e807.up.railway.app';
  }
  
  // Check if we're hosted on Railway (by hostname)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    console.log('Hostname:', hostname, 'Protocol:', protocol);
    
    // If not localhost and not 127.0.0.1, assume production
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && protocol === 'https:') {
      console.log('Non-localhost HTTPS detected, using Railway backend');
      return 'https://attendo-production-e807.up.railway.app';
    }
    
    // Explicit Railway domain check
    if (hostname.includes('railway.app') || hostname.includes('up.railway.app')) {
      console.log('Railway domain detected, using Railway backend');
      return 'https://attendo-production-e807.up.railway.app';
    }
  }
  
  // Default to localhost for development
  console.log('Development mode, using localhost');
  return 'http://localhost:3001';
};

const API_BASE_URL = getApiUrl();

// Log for debugging
console.log('=== API Configuration ===');
console.log('API Base URL:', API_BASE_URL);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('PROD mode:', import.meta.env.PROD);
console.log('MODE:', import.meta.env.MODE);
if (typeof window !== 'undefined') {
  console.log('Current URL:', window.location.href);
  console.log('Hostname:', window.location.hostname);
}
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


