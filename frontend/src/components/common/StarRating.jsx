import { Star } from 'lucide-react';

const StarRating = ({ rating, maxRating = 5, size = 'sm', interactive = false, onRatingChange }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleStarClick = (starRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="rating-stars">
      {[...Array(maxRating)].map((_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= rating;
        
        return (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''} transition-colors duration-150`}
            onClick={() => handleStarClick(starRating)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;