import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Restaurant, Users, Star, Grid3X3, TrendingUp, Award } from 'lucide-react';
import { restaurantService } from '../services/restaurantService';
import { userService } from '../services/userService';
import { reviewService } from '../services/reviewService';
import { categoryService } from '../services/categoryService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StarRating from '../components/common/StarRating';

const Home = () => {
  const [stats, setStats] = useState({
    restaurants: 0,
    users: 0,
    reviews: 0,
    categories: 0,
  });
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [restaurants, users, reviews, categories] = await Promise.all([
        restaurantService.getAllRestaurants(),
        userService.getAllUsers(),
        reviewService.getAllReviews(),
        categoryService.getAllCategories(),
      ]);

      setStats({
        restaurants: restaurants.length,
        users: users.length,
        reviews: reviews.length,
        categories: categories.length,
      });

      // Get top 3 restaurants by rating
      const topRestaurants = restaurants
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 3);
      setFeaturedRestaurants(topRestaurants);

      // Get 3 most recent reviews
      const sortedReviews = reviews
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setRecentReviews(sortedReviews);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Restaurants',
      value: stats.restaurants,
      icon: Restaurant,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      link: '/restaurants',
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: Grid3X3,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      link: '/categories',
    },
    {
      title: 'Reviews',
      value: stats.reviews,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      link: '/reviews',
    },
    {
      title: 'Users',
      value: stats.users,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/users',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Welcome to FoodieReview
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 animate-slide-up">
              Discover amazing restaurants and share your dining experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/restaurants"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Explore Restaurants
              </Link>
              <Link
                to="/reviews"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Read Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map(({ title, value, icon: Icon, color, bgColor, link }) => (
            <Link
              key={title}
              to={link}
              className="card hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center">
                <div className={`${bgColor} p-3 rounded-lg mr-4`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{title}</p>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {value}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Restaurants */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Award className="h-6 w-6 text-primary-600 mr-2" />
              Top Rated Restaurants
            </h2>
            <Link
              to="/restaurants"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="card group hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    {restaurant.imageUrl ? (
                      <img
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Restaurant className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {restaurant.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <StarRating rating={Math.round(restaurant.averageRating)} />
                      <span className="text-sm text-gray-600">
                        {restaurant.averageRating.toFixed(1)}
                      </span>
                    </div>
                    
                    {restaurant.category && (
                      <span className="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                        {restaurant.category.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Reviews */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="h-6 w-6 text-primary-600 mr-2" />
              Recent Reviews
            </h2>
            <Link
              to="/reviews"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReviews.map((review) => (
              <div key={review.id} className="card">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {review.user?.name || 'Anonymous'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {review.restaurant?.name}
                    </p>
                  </div>
                </div>
                
                <div className="mb-2">
                  <StarRating rating={review.rating} />
                </div>
                
                {review.comment && (
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;