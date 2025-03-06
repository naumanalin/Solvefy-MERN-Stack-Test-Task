import React, { useState, useEffect } from 'react';
import { CircleUser } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProfileInfo } from '../redux/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (error) {
        toast.error(error);
    }
  }, [error]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = { name, email };
    dispatch(updateProfileInfo(formData));
  }

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <fieldset className="border border-gray-300 rounded-lg p-6 bg-white shadow-md w-full">
        <legend className="text-lg font-semibold text-gray-700 px-3 flex items-center gap-2">
          <CircleUser className="w-5 h-5" />
          User Profile
        </legend>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-800 mb-2">
            <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600 text-sm">
            Last updated: {new Date(user.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </fieldset>
    </div>
  );
};

export default Profile;