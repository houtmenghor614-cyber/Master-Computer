import axios from 'axios';

// Use Render backend URL for all environments
const API_BASE_URL = 'https://backend-master-computer.onrender.com/api';
const IMAGE_BASE_URL = 'https://backend-master-computer.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Helper function to get image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/500x500?text=No+Image';
  if (imagePath.startsWith('http')) return imagePath;
  
  // Remove leading slashes
  let cleanPath = imagePath.replace(/^\/+/, '');
  
  // Return full URL to Render backend
  return `${IMAGE_BASE_URL}/${cleanPath}`;
};

// Product API
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get('/categories'),
};

// Order API
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
};

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;