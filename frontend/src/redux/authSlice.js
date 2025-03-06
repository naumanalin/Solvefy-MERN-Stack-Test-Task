import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const base_URL = 'http://localhost:3000';

// Login User
export const loginUser = createAsyncThunk(
    'user/loginUser', 
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_URL}/api/login`, formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

// Signup User
export const signupUser = createAsyncThunk(
    'user/signupUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_URL}/api/signup`, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Signup failed");
        }
    }
);

// Update Profile
export const updateProfileInfo = createAsyncThunk(
    'user/updateInfo',
    async (formData) => {
        const response = await axios.post(`${base_URL}/api/update/profile`, formData, {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            },
            withCredentials: true
        });
        // Update local storage with new user data
        const updatedUser = { ...JSON.parse(localStorage.getItem('user')), ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
    }
);

const initialSidebarState = window.innerWidth >= 768;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        error: null,
        isAuthenticated: !!localStorage.getItem('token'),
        sideBarStatus: initialSidebarState,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.user = null;
            state.isAuthenticated = false;
            state.sideBarStatus = window.innerWidth >= 768; // Reset sidebar based on screen size
        },
        sideBarStatus: (state) => {
            state.sideBarStatus = !state.sideBarStatus;
        }
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        });

        // Signup
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signupUser.fulfilled, (state) => {
            state.loading = false;
            toast.success('Registration successful! Please login.');
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        });

        // Update Profile
        builder.addCase(updateProfileInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProfileInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            toast.success('Profile updated successfully!');
        });
        builder.addCase(updateProfileInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error(action.error.message);
        });
    }
});

export const { logout, sideBarStatus } = userSlice.actions;
export default userSlice.reducer;
