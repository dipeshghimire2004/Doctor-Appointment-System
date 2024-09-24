import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Select } from '../components';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import { addAppointment } from '../features/appointmentSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const BookDoctorAppointment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const now = new Date().toISOString().substring(0, 16);
  const navigate=useNavigate();
  const dispatch=useDispatch();//should be outside of the onSubmit function to avoid re-creating
  const location=useLocation();

  const {selectedDoctor}=location.state || {};    //Get the doctor data passed from the previous page
  const [bookedSlots, setBookedSlots]=useState([]);


  const fetchBookedSlots=async(date)=>{
    try{
      const response=await axios.get(`http://localhost:8080/api/appointment/${selectedDoctor._id}/ booked-slots`,{
        params:{date},
      });
      setBookedSlots(response.data);
    }
    catch(error){
      console.error("Error fectching booked slots:", error);
    }
  };

  const handleChange=(event)=>{
    const selectedDate=event.target.value;
    fetchBookedSlots(selectedDate);
  };

  const onSubmit=async(data)=>{
  const { time, date}=data;

  // Assuming the user selects date as a day string and time as start time
  const startTime=time;
  const endTime = new Date(new Date(`1970-01-01T${time}:00`).setMinutes(new Date(`1970-01-01T${time}:00`).getMinutes() + 30))
  .toTimeString()
  .substring(0, 5); // 30 mins after startTime

// const endTime=new Date(new Date())
const requestData={
  doctorId:selectedDoctor._id,      //pass selected doctor's ID
  day:new Date(date).toLocaleDateString('en-GB', {weekday:'long'}),
  startTime,
  endTime
};


  try {
    // const response=await axios.post(`http://localhost:8080/api/appointment/:doctorId/:userId",{data},{
     
    const response=await axios.post(`http://localhost:8080/api/appointment/${selectedDoctor._id}/availability`,
      requestData,{
      headers:{
        'content-Type':'application/json',
      },
      
    });

    dispatch(addAppointment({
      doctorName:selectedDoctor.userId.name,
      profilePicture:selectedDoctor.profilePicture,
      specialization:selectedDoctor.specialization,
      date,
      startTime,
      endTime,
    }));

    
    localStorage.setItem('requestData', JSON.stringify(requestData))
    navigate('/all-doctors'); 
    toast.success('Appointment booked successfully!')
  } catch (error) {
    toast.error('Error booking appointment. Please try again.');
    console.error('Error booking appointment:', error);
  }
 }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
     <Toaster/>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Book an Appointment with {selectedDoctor?.name}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            label="Date"
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        <div>
          <Select 
            label="Time"
            type="time"  
            defaultValue={now}
            {...register('time', { required: 'Time is required' })}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
          {startTime && startTime ? "bg-red" : "blue"}
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>

    </div>
  );
};


export default BookDoctorAppointment
