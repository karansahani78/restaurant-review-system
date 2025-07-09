import api from '../utils/api';

export const reviewService = {
  // Create review
  createReview: async (reviewData, restaurantId, userId) => {
    const response = await api.post(`/reviews/add?restaurantId=${restaurantId}&userId=${userId}`, reviewData);
    return response.data;
  },

  // Get all reviews
  getAllReviews: async () => {
    const response = await api.get('/reviews');
    return response.data;
  },

  // Get review by ID
  getReviewById: async (id) => {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },

  // Update review
  updateReview: async (id, reviewData) => {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  },

  // Delete review
  deleteReview: async (id) => {
    await api.delete(`/reviews/${id}`);
  },
};