import axios from 'axios';

const API_BASE_URL = 'https://backend-master-computer.onrender.com/api';
const IMAGE_BASE_URL = 'https://backend-master-computer.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/500x500?text=No+Image';
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.replace(/^\/+/, '');
  return `${IMAGE_BASE_URL}/${cleanPath}`;
};

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