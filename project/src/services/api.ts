const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth methods
  async register(userData: { email: string; password: string; username: string; walletAddress?: string }) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Tracks methods
  async getTracks() {
    return this.request('/tracks');
  }

  async getTrack(id: number) {
    return this.request(`/tracks/${id}`);
  }

  async getTrackStats(id: number) {
    return this.request(`/tracks/${id}/stats`);
  }

  // Simulation methods
  async runSimulation(trackId: number, inputData: any) {
    return this.request('/simulation/run', {
      method: 'POST',
      body: JSON.stringify({ trackId, inputData }),
    });
  }

  async getSimulationTemplate(trackId: number) {
    return this.request(`/simulation/templates/${trackId}`);
  }

  async getSimulations() {
    return this.request('/agents/simulations');
  }

  async saveSimulation(simulationData: any) {
    return this.request('/agents/simulations', {
      method: 'POST',
      body: JSON.stringify(simulationData),
    });
  }

  // Participants methods
  async registerForHackathon(registrationData: any) {
    return this.request('/participants/register', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });
  }

  async getParticipantInfo() {
    return this.request('/participants/me');
  }

  async updateSubmission(submissionData: any) {
    return this.request('/participants/submission', {
      method: 'PUT',
      body: JSON.stringify(submissionData),
    });
  }

  async getLeaderboard(trackId?: number) {
    const params = trackId ? `?trackId=${trackId}` : '';
    return this.request(`/participants/leaderboard${params}`);
  }

  // Statistics methods
  async getAgentStats() {
    return this.request('/agents/stats');
  }

  async getParticipantStats() {
    return this.request('/participants/stats');
  }

  isAuthenticated() {
    return !!this.token;
  }
}

export const apiService = new ApiService();