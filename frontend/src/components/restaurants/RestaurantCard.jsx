import { MapPin, Clock, Star, Edit, Trash2 } from 'lucide-react';
import StarRating from '../common/StarRating';

const RestaurantCard = ({ restaurant, onEdit, onDelete, onViewDetails }) => {
  const {
    id,
    name,
    description,
    category,
    address,
    city,
    averageRating,
    openingHours,
    imageUrl,
    reviews = []
  } = restaurant;

  const reviewCount = reviews.length;
  const todayHours = openingHours?.find(hour => 
    hour.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  );

  return (
    <div className="card group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* Image */}
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gray-200">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-sm">No image available</span>
            </div>
          )}
          
          {/* Category Badge */}
          {category && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
              {name}
            </h3>
            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(restaurant);
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

          {description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
          )}

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
            </span>
          </div>

          {/* Location */}
          {(address || city) && (
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{address}{address && city ? ', ' : ''}{city}</span>
            </div>
          )}

          {/* Hours */}
          {todayHours && (
            <div className="flex items-center text-gray-600 text-sm mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>Today: {todayHours.openTime} - {todayHours.closeTime}</span>
            </div>
          )}

          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(restaurant)}
            className="mt-auto btn-primary w-full"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;