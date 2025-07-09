import api from '../utils/api';

export const userService = {
  // Create user
  createUser: async (userData) => {
    const response = await api.post('/v1/users/admin/register', userData);
    return response.data;
  },

  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/v1/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/v1/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/v1/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    await api.delete(`/v1/users/${id}`);
  },
};