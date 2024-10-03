import React from 'react';
import Button from '../Button';
import { logout } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Logout = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodes JWT payload
  console.log(localStorage.getItem('authStatus'))
  console.log(decodedToken.exp); // Token expiration time
  const handleLogout = async () => {
    try {
      // Make API call to backend logout route
      await axios.post(
        `http://localhost:8080/api/auth/logout`,
        {}, // Empty request body since backend only uses the token
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Send token in Authorization header
          },
          withCredentials: true, // Important to allow sending/clearing cookies
        }
      );

      // Remove token from localStorage
      localStorage.removeItem('token');
      
      // Dispatch logout action to update Redux state
      dispatch(logout());

      // Redirect to login page
      window.location.href = '/login';

      // Show success toast message
      toast.success("Logout Successfully!!");
    } catch (error) {
      // Show error toast message in case of failure
      toast.error("Failed to log out. Please try again.");
      console.error("Logout Error: ", error); // Log the error for debugging
    }
  };

  return (
    <div>
      <Toaster />
      <Button type='submit' onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
