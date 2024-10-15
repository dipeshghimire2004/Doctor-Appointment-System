import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../Button';

const Header = () => {
  const [token, setToken] = useState(null);
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture'));
  const navigate = useNavigate();

  // Fetch token from localStorage and update state
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Watch for changes to profilePicture in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicture(localStorage.getItem('profilePicture'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange); // Cleanup
    };
  }, []);

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      <div className="text-2xl font-bold">Logo</div>
      <nav className="space-x-4">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-black"
        >
          Home
        </Link>
        <Link 
          to="/all-doctors" 
          className="text-gray-600 hover:text-black"
        >
          All Doctors
        </Link>
        
        <Link 
          to="/about" 
          className="text-gray-600 hover:text-black"
        >
          About
        </Link>

        <Link 
          to="/contact" 
          className="text-gray-600 hover:text-black"
        >
          Contact Us
        </Link>
      </nav>

      {token ? ( 
        <div className="relative group mr-16">
          <img 
            className="w-10 h-10 rounded-full" 
            src={profilePicture || 'default-profile-image-path.jpg'} 
            alt="profile" 
          />
          <div className="absolute text-sm hidden group-hover:block bg-white border rounded shadow-lg right-0">
            <div
              onClick={() => navigate('/user-profile')} 
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              My Profile
            </div>
            <div
              onClick={() => navigate('/my-appointments')} 
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              My Appointments
            </div>
            <div className="p-2">
              <Logout /> 
            </div>
          </div>
        </div>
      ) : (
        <div className="space-x-4">
          <Button onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button onClick={() => navigate('/signup')}> 
            Sign Up
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
