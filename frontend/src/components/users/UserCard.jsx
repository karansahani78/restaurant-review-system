import { User, Mail, Shield, Star, Edit, Trash2 } from 'lucide-react';

const UserCard = ({ user, onEdit, onDelete }) => {
  const { id, name, email, role, reviews = [] } = user;
  const reviewCount = reviews.length;
  const isAdmin = role === 'ADMIN';

  return (
    <div className="card group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isAdmin ? 'bg-purple-100' : 'bg-primary-100'
            }`}>
              <User className={`h-6 w-6 ${isAdmin ? 'text-purple-600' : 'text-primary-600'}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                {name}
              </h3>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{email}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(user);
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

        {/* Role Badge */}
        <div className="flex items-center space-x-2">
          <Shield className={`h-4 w-4 ${isAdmin ? 'text-purple-600' : 'text-gray-600'}`} />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isAdmin 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {role}
          </span>
        </div>

        {/* Review Count */}
        <div className="flex items-center text-gray-600 text-sm">
          <Star className="h-4 w-4 mr-1" />
          <span>{reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;