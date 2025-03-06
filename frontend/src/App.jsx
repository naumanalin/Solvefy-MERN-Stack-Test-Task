import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoute from './utils/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Page404 from './pages/Page404'
import './index.css'
import GuestRoute from './utils/GuestRoute';
import ChangePassword from './pages/ChangePassword';

const App = () => {
  return (
    <>
    <Routes>

      <Route element={<GuestRoute />} >
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>

      {/* All Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/change/password' element={<ChangePassword/>} />
      </Route>
 
      <Route path="*" element={<Page404 />} />
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App