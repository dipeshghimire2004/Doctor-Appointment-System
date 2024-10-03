import React from 'react';
import Button from './Button'
// import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description,handleBookNow, specialization}) => {

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <Button type="button" onClick={()=>handleBookNow(specialization)}> Book Appointment
        </Button>
    </div>
  );
};

export default ServiceCard;

