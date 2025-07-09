import { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { restaurantService } from '../services/restaurantService';
import { categoryService } from '../services/categoryService';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import RestaurantForm from '../components/restaurants/RestaurantForm';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [restaurants, searchTerm, selectedCategory]);

  const fetchData = async () => {
    try {
      const [restaurantsData, categoriesData] = await Promise.all([
        restaurantService.getAllRestaurants(),
        categoryService.getAllCategories()
      ]);
      setRestaurants(restaurantsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(restaurant =>
        restaurant.category?.id.toString() === selectedCategory
      );
    }

    setFilteredRestaurants(filtered);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingRestaurant) {
        await restaurantService.updateRestaurant(editingRestaurant.id, formData);
      } else {
        await restaurantService.createRestaurant(formData, formData.categoryId);
      }
      await fetchData();
      setIsModalOpen(false);
      setEditingRestaurant(null);
    } catch (error) {
      console.error('Error saving restaurant:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await restaurantService.deleteRestaurant(id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting restaurant:', error);
      }
    }
  };

  const handleViewDetails = (restaurant) => {
    // For now, just log the restaurant details
    // In a real app, you might navigate to a detailed view
    console.log('View details for:', restaurant);
  };

  const openCreateModal = () => {
    setEditingRestaurant(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRestaurant(null);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurants</h1>
            <p className="text-gray-600">Discover and manage amazing restaurants</p>
          </div>
          <button
            onClick={openCreateModal}
            className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Restaurant</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 input-field"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredRestaurants.length} of {restaurants.length} restaurants
          </p>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory
                ? 'Try adjusting your search criteria'
                : 'Get started by adding your first restaurant'}
            </p>
            {!searchTerm && !selectedCategory && (
              <button onClick={openCreateModal} className="btn-primary">
                Add Restaurant
              </button>
            )}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          maxWidth="max-w-2xl"
        >
          <RestaurantForm
            restaurant={editingRestaurant}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            isLoading={isSubmitting}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Restaurants;