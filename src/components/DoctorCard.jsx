import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ image, name,specialization,experience,...props}) => {
  const navigate=useNavigate();
  const handleNavigate=(e)=>{
    e.preventDefault()
    navigate("/doctor-detail")
  }
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray w-20 mb-4">
        <img src={image}
        alt={name} className='object-cover'/>
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className='flex justify-center gap-auto bg-gray-200 p-4 rounded-lg'>
        
        <div className='pr-16'>
          <p className=" text-gray-600">{specialization}</p>
          <p className="text-gray-600 ">{experience}</p>
        </div>
        <div>
        <Button onClick={handleNavigate} >
          Book Now</Button>
         
      </div>
      </div>
      
      {/* <p className="text-gray-600">{aboutDoctor}</p> */}
      {/* <p className="text-gray-600">{AppointmentFee}</p> */}
      {/* <button className="bg-orange-400 text-white py-2 px-6 rounded-full">Appointment</button> */}
     
    </div>
  );
};

export default DoctorCard;

