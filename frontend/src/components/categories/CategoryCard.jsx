import { Restaurant, Edit, Trash2 } from 'lucide-react';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const { id, name, description, restaurants = [], imageUrl } = category;
  const restaurantCount = restaurants.length;

  return (
    <div className="card group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* Image */}
        <div className="relative h-32 mb-4 rounded-lg overflow-hidden bg-gray-200">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Restaurant className="h-8 w-8" />
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
                  onEdit(category);
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

          {/* Restaurant Count */}
          <div className="mt-auto">
            <div className="flex items-center text-gray-600 text-sm">
              <Restaurant className="h-4 w-4 mr-1" />
              <span>{restaurantCount} restaurant{restaurantCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;