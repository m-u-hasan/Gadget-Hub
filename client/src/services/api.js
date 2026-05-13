import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Add a request interceptor to include the token in all requests
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchProducts = (params) => API.get('/products', { params });
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const fetchMyOrders = () => API.get('/orders/user');

// Admin endpoints
export const fetchAllOrders = () => API.get('/orders');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });
export const addProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// User List endpoints
export const fetchWishlist = () => API.get('/users/wishlist');
export const addToWishlist = (productId) => API.put('/users/wishlist', { productId });
export const fetchCompareList = () => API.get('/users/compare');
export const addToCompare = (productId) => API.put('/users/compare', { productId });
export const removeFromUserList = (type, id) => API.delete(`/users/${type}/${id}`);

export default API;
