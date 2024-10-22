// resources/frontend/src/services/menuService.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetchMenus = async () => {
  const response = await api.get('/menus');
  return response.data;
};

export const fetchMenuById = async (id) => {
  const response = await api.get(`/menus/${id}`);
  return response.data;
};

// Add other CRUD operations as needed
