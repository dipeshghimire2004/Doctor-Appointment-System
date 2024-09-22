import React from 'react';
// import DoctorCard from '../components/DoctorCard';
import { useForm } from 'react-hook-form';
import { Header, Select } from '../components';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import { addAppointment } from '../features/appointmentSlice';
import { useDispatch } from 'react-redux';

const DoctorDetail = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const now = new Date().toISOString().substring(0, 16);

 const onSubmit=async(data)=>{
  const { time, date}=data;

  const dispatch=useDispatch();
  // Assuming the user selects date as a day string and time as start time
  const startTime=time;
  const endTime = new Date(new Date(`1970-01-01T${time}:00`).setMinutes(new Date(`1970-01-01T${time}:00`).getMinutes() + 30)).toTimeString().substring(0, 5); // 30 mins after startTime

// const endTime=new Date(new Date())
const requestData={
  day:new Date(date).toLocaleDateString('en-GB', {weekday:'long'}),
  startTime,
  endTime
};


  try {
    // const response=await axios.post(`http://localhost:8080/api/appointment/:doctorId/:userId",{data},{
     
    const response=await axios.post(`http://localhost:8080/api/appointment/:doctorId/availability`,requestData,{
      headers:{
        'content-Type':'application/json',
      },
      
    });
    dispatch.addAppointment(response.data);
    toast.success('Form subitted successfully!')
  } catch (error) {
    toast.error('Error booking appointment. Please try again.');
    console.error('Error booking appointment:', error);
  }
 }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <Toaster/>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Book an Appointment</h1>

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
            defaultValue={now}
            {...register('time', { required: 'Time is required' })}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
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


export default DoctorDetail
