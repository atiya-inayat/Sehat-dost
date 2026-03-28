import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  logout: () => api.post('/auth/logout')
};

export const doctorsAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getSpecialties: () => api.get('/doctors/specialties'),
  search: (params) => api.get('/doctors/search', { params })
};

export const appointmentsAPI = {
  create: (data) => api.post('/appointments', data),
  getAll: (params) => api.get('/appointments', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  cancel: (id, reason) => api.delete(`/appointments/${id}`, { data: { reason } }),
  getDoctorAppointments: (params) => api.get('/appointments/doctor', { params })
};

export const questionsAPI = {
  create: (data) => api.post('/questions', data),
  getAll: (params) => api.get('/questions', { params }),
  getById: (id) => api.get(`/questions/${id}`),
  answer: (id, data) => api.post(`/questions/${id}/answer`, data),
  vote: (id, data) => api.post(`/questions/${id}/vote`, data),
  close: (id, reason) => api.post(`/questions/${id}/close`, { reason }),
  getMyQuestions: () => api.get('/questions/my-questions')
};

export const hospitalsAPI = {
  getAll: (params) => api.get('/hospitals', { params }),
  getById: (id) => api.get(`/hospitals/${id}`),
  search: (params) => api.get('/hospitals/search', { params }),
  getCities: () => api.get('/hospitals/cities')
};

export const medicinesAPI = {
  getAll: (params) => api.get('/medicines', { params }),
  getById: (id) => api.get(`/medicines/${id}`),
  search: (params) => api.get('/medicines/search', { params }),
  getByName: (name) => api.get(`/medicines/name/${name}`),
  getClasses: () => api.get('/medicines/classes'),
  getManufacturers: () => api.get('/medicines/manufacturers')
};

export const bloodAPI = {
  createRequest: (data) => api.post('/blood/requests', data),
  registerDonor: (data) => api.post('/blood/donors', data),
  getRequests: (params) => api.get('/blood/requests', { params }),
  getRequestById: (id) => api.get(`/blood/requests/${id}`),
  fulfillRequest: (id, data) => api.post(`/blood/requests/${id}/fulfill`, data),
  getDonors: (params) => api.get('/blood/donors', { params }),
  getBloodGroups: () => api.get('/blood/groups')
};

export const partnersAPI = {
  create: (data) => api.post('/partners', data),
  getAll: (params) => api.get('/partners', { params }),
  getById: (id) => api.get(`/partners/${id}`),
  getFeatured: () => api.get('/partners/featured')
};

export const labsAPI = {
  getAll: (params) => api.get('/labs', { params }),
  getById: (id) => api.get(`/labs/${id}`),
  getTests: (id, params) => api.get(`/labs/${id}/tests`, { params }),
  search: (params) => api.get('/labs/search', { params }),
  getCategories: () => api.get('/labs/categories')
};

export default api;
