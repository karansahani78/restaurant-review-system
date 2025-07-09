import api from '../utils/api';

export const categoryService = {
  // Create category
  createCategory: async (categoryData) => {
    const response = await api.post('/v1/categories/add', categoryData);
    return response.data;
  },

  // Get all categories
  getAllCategories: async () => {
    const response = await api.get('/v1/categories');
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (id) => {
    const response = await api.get(`/v1/categories/${id}`);
    return response.data;
  },

  // Get category by name
  getCategoryByName: async (name) => {
    const response = await api.get(`/v1/categories/name/${name}`);
    return response.data;
  },
};