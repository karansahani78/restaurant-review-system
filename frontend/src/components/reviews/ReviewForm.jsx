import { useState, useEffect } from 'react';
import { restaurantService } from '../../services/restaurantService';
import { userService } from '../../services/userService';
import StarRating from '../common/StarRating';
import LoadingSpinner from '../common/LoadingSpinner';

const ReviewForm = ({ review, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    restaurantId: '',
    userId: '',
  });
  
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (review) {
      setFormData({
        rating: review.rating || 5,
        comment: review.comment || '',
        restaurantId: review.restaurant?.id || '',
        userId: review.user?.id || '',
      });
    }
  }, [review]);

  const fetchData = async () => {
    try {
      const [restaurantsData, usersData] = await Promise.all([
        restaurantService.getAllRestaurants(),
        userService.getAllUsers()
      ]);
      setRestaurants(restaurantsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loadingData) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant *
          </label>
          <select
            name="restaurantId"
            value={formData.restaurantId}
            onChange={handleChange}
            required
            className="input-field"
            disabled={!!review} // Disable if editing
          >
            <option value="">Select a restaurant</option>
            {restaurants.map(restaurant => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User *
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="input-field"
            disabled={!!review} // Disable if editing
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating *
        </label>
        <StarRating
          rating={formData.rating}
          size="lg"
          interactive={true}
          onRatingChange={handleRatingChange}
        />
        <p className="text-sm text-gray-500 mt-1">Click on stars to rate</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comment
        </label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows={4}
          className="input-field"
          placeholder="Share your experience..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : (review ? 'Update' : 'Submit')}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;