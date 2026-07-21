import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (credentials) => api.post('/login', credentials);

// Contract APIs
export const uploadContract = (formData) =>
  api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      return percentCompleted;
    },
  });

export const getContracts = () => api.get('/contracts');
export const getContractById = (id) => api.get(`/contracts/${id}`);

// AI Analysis APIs
export const getSummary = (contractId) =>
  api.post('/summary', { contract_id: contractId });
export const getClauses = (contractId) =>
  api.post('/clauses', { contract_id: contractId });
export const getRiskAnalysis = (contractId) =>
  api.post('/risk', { contract_id: contractId });

// Compare APIs
export const compareContracts = (contractAId, contractBId) =>
  api.post('/compare', {
    contract_a_id: contractAId,
    contract_b_id: contractBId,
  });

// Chat API
export const sendChatMessage = (contractId, message) =>
  api.post('/chat', { contract_id: contractId, message });

// Report API
export const getComplianceReport = (contractId) =>
  api.get(`/report?contract_id=${contractId}`);

export default api;

