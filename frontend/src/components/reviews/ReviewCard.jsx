import { User, Calendar, Edit, Trash2 } from 'lucide-react';
import StarRating from '../common/StarRating';

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { id, rating, comment, createdAt, user, restaurant } = review;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{user?.name || 'Anonymous'}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(review);
              }}
              className="p-1 text-gray-400 hover:text-primary-600 transition-colors duration-200"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <StarRating rating={rating} />
          <span className="text-sm text-gray-600">({rating}/5)</span>
        </div>

        {/* Restaurant */}
        {restaurant && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Restaurant:</span> {restaurant.name}
          </div>
        )}

        {/* Comment */}
        {comment && (
          <div className="text-gray-700">
            <p className="leading-relaxed">{comment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;