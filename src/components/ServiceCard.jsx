import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ icon, title, description}) => {
  const navigate=useNavigate();
  const handleNavigate=(e)=>{
    e.preventDefault()
    navigate("/all-doctors")
  }
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {/* <button className="bg-orange-400 text-white py-2 px-6 rounded-full">Appointment</button> */}
      <Button onClick={handleNavigate} >
        Book Now</Button>
    </div>
  );
};

export default ServiceCard;

