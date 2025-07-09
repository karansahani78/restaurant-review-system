import api from '../utils/api';

export const restaurantService = {
  // Create restaurant
  createRestaurant: async (restaurantData, categoryId) => {
    const response = await api.post(`/v1/restaurants/add/${categoryId}`, restaurantData);
    return response.data;
  },

  // Get all restaurants
  getAllRestaurants: async () => {
    const response = await api.get('/v1/restaurants');
    return response.data;
  },

  // Get restaurant by ID
  getRestaurantById: async (id) => {
    const response = await api.get(`/v1/restaurants/${id}`);
    return response.data;
  },

  // Update restaurant
  updateRestaurant: async (id, restaurantData) => {
    const response = await api.put(`/v1/restaurants/${id}`, restaurantData);
    return response.data;
  },

  // Delete restaurant
  deleteRestaurant: async (id) => {
    await api.delete(`/v1/restaurants/${id}`);
  },
};