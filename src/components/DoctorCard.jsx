import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ image, name,specialization,aboutDoctor,experience,AppointmentFee,...props}) => {
  const navigate=useNavigate();
  const handleNavigate=(e)=>{
    e.preventDefault()
    navigate("/doctor-detail")
  }
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <div className="text-5xl mb-4">{image}</div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{specialization}</p>
      <p className="text-gray-600">{aboutDoctor}</p>
      <p className="text-gray-600">{experience}</p>
      <p className="text-gray-600">{AppointmentFee}</p>
      {/* <button className="bg-orange-400 text-white py-2 px-6 rounded-full">Appointment</button> */}
      <Button onClick={handleNavigate} >
        Book Now</Button>
    </div>
  );
};

export default DoctorCard;

