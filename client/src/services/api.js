import axios from 'axios';

const api = axios.create({
  baseURL: 'https://inventory-system-5z75.onrender.com/api',
});

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getAnalytics = () => api.get('/products/analytics');
export const getLowStock = () => api.get('/products/low-stock');