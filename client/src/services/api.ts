import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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


