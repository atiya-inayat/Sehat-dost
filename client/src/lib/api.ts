import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
    bloodGroup?: string;
  }) => api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  
  getMe: () => api.get('/auth/me'),
  
  updateProfile: (data: Record<string, unknown>) => 
    api.put('/auth/profile', data),
  
  logout: () => api.post('/auth/logout')
};

export const doctorsAPI = {
  getAll: (params?: Record<string, string | number | boolean>) => 
    api.get('/doctors', { params }),
  
  getById: (id: string) => api.get(`/doctors/${id}`),
  
  getSpecialties: () => api.get('/doctors/specialties'),
  
  search: (params?: Record<string, string | number>) => 
    api.get('/doctors/search', { params })
};

export const appointmentsAPI = {
  create: (data: Record<string, unknown>) => 
    api.post('/appointments', data),
  
  getAll: (params?: Record<string, string | number>) => 
    api.get('/appointments', { params }),
  
  getById: (id: string) => api.get(`/appointments/${id}`),
  
  update: (id: string, data: Record<string, unknown>) => 
    api.put(`/appointments/${id}`, data),
  
  cancel: (id: string, reason: string) => 
    api.delete(`/appointments/${id}`, { data: { reason } })
};

export const questionsAPI = {
  create: (data: Record<string, unknown>) => 
    api.post('/questions', data),
  
  getAll: (params?: Record<string, string | number>) => 
    api.get('/questions', { params }),
  
  getById: (id: string) => api.get(`/questions/${id}`),
  
  answer: (id: string, data: { answer: string }) => 
    api.post(`/questions/${id}/answer`, data),
  
  getMyQuestions: () => api.get('/questions/my-questions')
};

export const hospitalsAPI = {
  getAll: (params?: Record<string, string | number>) => 
    api.get('/hospitals', { params }),
  
  getById: (id: string) => api.get(`/hospitals/${id}`),
  
  search: (params?: Record<string, string | number>) => 
    api.get('/hospitals/search', { params }),
  
  getCities: () => api.get('/hospitals/cities')
};

export const medicinesAPI = {
  getAll: (params?: Record<string, string | number>) => 
    api.get('/medicines', { params }),
  
  getById: (id: string) => api.get(`/medicines/${id}`),
  
  search: (params?: Record<string, string | number>) => 
    api.get('/medicines/search', { params }),
  
  getByName: (name: string) => api.get(`/medicines/name/${name}`),
  
  getClasses: () => api.get('/medicines/classes'),
  
  getManufacturers: () => api.get('/medicines/manufacturers')
};

export const bloodAPI = {
  createRequest: (data: Record<string, unknown>) => 
    api.post('/blood/requests', data),
  
  registerDonor: (data: Record<string, unknown>) => 
    api.post('/blood/donors', data),
  
  getRequests: (params?: Record<string, string | number>) => 
    api.get('/blood/requests', { params }),
  
  getRequestById: (id: string) => api.get(`/blood/requests/${id}`),
  
  fulfillRequest: (id: string, data: Record<string, unknown>) => 
    api.post(`/blood/requests/${id}/fulfill`, data),
  
  getDonors: (params?: Record<string, string | number>) => 
    api.get('/blood/donors', { params }),
  
  getBloodGroups: () => api.get('/blood/groups')
};

export const partnersAPI = {
  create: (data: Record<string, unknown>) => 
    api.post('/partners', data),
  
  getAll: (params?: Record<string, string | number>) => 
    api.get('/partners', { params }),
  
  getById: (id: string) => api.get(`/partners/${id}`),
  
  getFeatured: () => api.get('/partners/featured')
};

export const labsAPI = {
  getAll: (params?: Record<string, string | number>) => 
    api.get('/labs', { params }),
  
  getById: (id: string) => api.get(`/labs/${id}`),
  
  getTests: (id: string, params?: Record<string, string | number>) => 
    api.get(`/labs/${id}/tests`, { params }),
  
  search: (params?: Record<string, string | number>) => 
    api.get('/labs/search', { params }),
  
  getCategories: () => api.get('/labs/categories')
};

export default api;
