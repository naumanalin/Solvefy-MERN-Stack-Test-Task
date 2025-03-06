import React, { useState } from 'react';
import { Lock, CircleUser } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            return toast.error('All fields are required');
        }

        if (newPassword !== confirmPassword) {
            return toast.error('New passwords do not match');
        }

        try {
            setLoading(true);
            const formData = {
                password: currentPassword,
                newPassword: newPassword,
                confPassword: confirmPassword
            };

            const response = await axios.post('http://localhost:3000/api/change/password', formData, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                },
                withCredentials: true
            });

            if (response.data.success) {
                toast.success('Password updated successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Password update failed';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <fieldset className="border border-gray-300 rounded-lg p-6 bg-white shadow-md w-full">
                <legend className="text-lg font-semibold text-gray-700 px-3 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Change Password
                </legend>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
                            Current Password
                        </label>
                        <input 
                            type="password" 
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <input 
                            type="password" 
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Updating...' : 'Change Password'}
                    </button>
                </form>

            </fieldset>
        </div>
    );
};

export default ChangePassword;