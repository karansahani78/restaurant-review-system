import { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { reviewService } from '../services/reviewService';
import { restaurantService } from '../services/restaurantService';
import ReviewCard from '../components/reviews/ReviewCard';
import ReviewForm from '../components/reviews/ReviewForm';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [reviews, searchTerm, selectedRestaurant, selectedRating]);

  const fetchData = async () => {
    try {
      const [reviewsData, restaurantsData] = await Promise.all([
        reviewService.getAllReviews(),
        restaurantService.getAllRestaurants()
      ]);
      setReviews(reviewsData);
      setRestaurants(restaurantsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReviews = () => {
    let filtered = reviews;

    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.restaurant?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRestaurant) {
      filtered = filtered.filter(review =>
        review.restaurant?.id.toString() === selectedRestaurant
      );
    }

    if (selectedRating) {
      filtered = filtered.filter(review =>
        review.rating.toString() === selectedRating
      );
    }

    setFilteredReviews(filtered);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingReview) {
        await reviewService.updateReview(editingReview.id, {
          rating: formData.rating,
          comment: formData.comment
        });
      } else {
        await reviewService.createReview(
          {
            rating: formData.rating,
            comment: formData.comment
          },
          formData.restaurantId,
          formData.userId
        );
      }
      await fetchData();
      setIsModalOpen(false);
      setEditingReview(null);
    } catch (error) {
      console.error('Error saving review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingReview(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h1>
            <p className="text-gray-600">Read and manage restaurant reviews</p>
          </div>
          <button
            onClick={openCreateModal}
            className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Review</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="pl-10 input-field"
              >
                <option value="">All Restaurants</option>
                {restaurants.map(restaurant => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="pl-10 input-field"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </p>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedRestaurant || selectedRating
                ? 'Try adjusting your search criteria'
                : 'Get started by adding your first review'}
            </p>
            {!searchTerm && !selectedRestaurant && !selectedRating && (
              <button onClick={openCreateModal} className="btn-primary">
                Add Review
              </button>
            )}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingReview ? 'Edit Review' : 'Add New Review'}
          maxWidth="max-w-lg"
        >
          <ReviewForm
            review={editingReview}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            isLoading={isSubmitting}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Reviews;