import { Link, useLocation } from 'react-router-dom';
import { Restaurant, Users, Star, Grid3X3 } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Restaurant },
    { path: '/restaurants', label: 'Restaurants', icon: Restaurant },
    { path: '/categories', label: 'Categories', icon: Grid3X3 },
    { path: '/reviews', label: 'Reviews', icon: Star },
    { path: '/users', label: 'Users', icon: Users },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Restaurant className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">FoodieReview</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;