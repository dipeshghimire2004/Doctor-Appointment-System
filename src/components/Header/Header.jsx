import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import Profile from '../../assets/images/Profile.png'
import Button from '../Button';
// import Login from '../Login';
// import SignUp from '../SignUp'


const Header = () => {
  const [token, setToken]=useState(true);

   const navigate=useNavigate()
  // const handleAppointment=()=>{
  //   navigate("/appointment")
  // };
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
        className={({isActive})=>`text-gray-600 hover:text-black ${isActive ? 'font-bold' : ''}`}
        >
          All Doctors
        </NavLink>
        {/* <NavLink 
          to="/service" 
          className={({ isActive }) => `text-gray-600 hover:text-black ${isActive ? 'font-bold' : ''}`}
        >
          Service
        </NavLink> */}
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
        
        {/* <NavLink 
        to='/appointment'
        className={({isActive})=>`text-gray-600 hover:text-black ${isActive? 'font-bold':''} `}>
          Appointment
        </NavLink> */}
      </nav>
      {token ? (
  <div className='mr-20 min-w-10 group relative'>
    <img className='w-10' src={Profile} alt='profile' />

    <div className='absolute text-sm hidden group-hover:block bg-white border rounded shadow-lg right-0 '>
      <div
        onClick={() => navigate('./user-profile')}
        className='bg-gray-300 p-2 hover:text-red-500 cursor-pointer'
      >
        My Profile
      </div>
      <div
        onClick={() => navigate('./my-appointments')}
        className='bg-gray-300 p-2 hover:text-red-500 cursor-pointer'
      >
        My Appointments
      </div>
      <div className='p-2'>
        <Logout />
      </div>
    </div>
  </div>
) : (
  <div>
    <Button onClick={() => navigate('/login')}>
      Login
    </Button>
    <Button onClick={() => navigate('/signup')}>
    SignUp
  </Button>
  </div>
)}

      
    </header>
  );
};

export default Header;
