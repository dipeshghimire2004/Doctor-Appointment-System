import React, { useState, useEffect } from 'react'; // Added useEffect for token management
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import Profile from '../../assets/images/Profile.png';
import Button from '../Button';

const Header = () => {
  const [token, setToken] = useState(null); // Set token default value to null for logged-out state
  const navigate = useNavigate();

  // useEffect to simulate checking if user is logged in by fetching the token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Replace with actual authentication check
    if (storedToken) {
      setToken(storedToken); // Set token if it's found in localStorage (user is logged in)
    }
  }, []); // Empty dependency array ensures this runs only on component mount

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      <div className="text-2xl font-bold">Logo</div>
      <nav className="space-x-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => `text-gray-600 hover:text-black ${isActive ? 'font-bold' : ''}`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/all-doctors" 
          className={({ isActive }) => `text-gray-600 hover:text-black ${isActive ? 'font-bold' : ''}`}
        >
          All Doctors
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => `text-gray-600 hover:text-black ${isActive ? 'font-bold' : ''}`}
        >
          About
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => `text-gray-600 hover:text-black ${isActive ? 'font-bold' : ''}`}
        >
          Contact Us
        </NavLink>
      </nav>

      {token ? ( // If token exists, show logged-in options
        <div className="relative group mr-16">
          <img className="w-10 h-10 rounded-full" src={Profile} alt="profile" />
          <div className="absolute text-sm hidden group-hover:block bg-white border rounded shadow-lg right-0 ">
            <div
              onClick={() => navigate('/user-profile')} // Navigate to user profile
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              My Profile
            </div>
            <div
              onClick={() => navigate('/my-appointments')} // Navigate to appointments
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              My Appointments
            </div>
            <div className="p-2">
              <Logout /> {/* Logout component */}
            </div>
          </div>
        </div>
      ) : ( // If token doesn't exist, show login and signup buttons
        <div className="space-x-4">
          <Button onClick={() => navigate('/login')}> {/* Navigate to login */}
            Login
          </Button>
          <Button onClick={() => navigate('/signup')}> {/* Navigate to signup */}
            Sign Up
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
