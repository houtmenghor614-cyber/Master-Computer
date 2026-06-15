import axios from 'axios';

// Update to your Render backend URL
const API_BASE_URL = 'https://backend-master-computer.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
};

export const categoryAPI = {
  getAll: () => api.get('/categories'),
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
};

export default api;