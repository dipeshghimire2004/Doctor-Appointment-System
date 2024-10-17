import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addAppointment } from '../features/appointmentSlice';


const BookDoctorAppointment = ({ doctorId }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [day, setDay] = useState('Monday'); // Default to Monday
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedDoctor } = location.state || {};  // Ensure this comes from the previous page (All doctors page)

  console.log(selectedDoctor.userId.name);

  const token = localStorage.getItem('token');  // Assuming JWT token is stored in localStorage

  useEffect(() => {
    // Fetch booked slots for the selected doctor on the selected day
    const fetchBookedSlots = async () => {
      if (!selectedDoctor?._id) return;

      try {
        const response = await axios.get(`http://localhost:8080/api/doctor/view-availability/${doctorId}`, {
          params: { day },
          headers: {
            Authorization: `Bearer ${token}`,  // Add JWT token in headers
          }
        });
        console.log(response.data);
        setBookedSlots(response.data.bookedSlots || []);
        setAvailableSlots(response.data.availableSlots || []);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
        toast.error("Error fetching booked slots.");
      }
    };

    fetchBookedSlots();
  }, [doctorId, day, selectedDoctor, token]);

  // Submit the appointment form
  const onSubmit = async (data) => {
    if(!selectedDoctor?._id){
      toast.error("Doctor not selected or doctor is missing");
      return;
    }

    const { time } = data;
    const requestData = {
      doctorId: selectedDoctor._id,
      day,
      timeslot: time,
    };

    try {
      const response = await axios.post(`http://localhost:8080/api/appointment/${doctorId}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass JWT token
          'Content-Type': 'application/json',
        },
      });

      // Dispatch the new appointment to Redux store
      console.log(selectedDoctor.userId.name);
      dispatch(addAppointment({
        
        doctorName: selectedDoctor.userId.name,
        profilePicture: selectedDoctor.profilePicture,
        specialization: selectedDoctor.specialization,
        day,
        startTime: time,
        endTime: new Date(new Date(`1970-01-01T${time}:00`).setMinutes(new Date(`1970-01-01T${time}:00`).getMinutes() + 30))
          .toTimeString().substring(0, 5),  // Calculate end time (30 minutes after start time)
      }));

      toast.success('Appointment booked successfully!');
      navigate('/all-doctors');  // Redirect to 'All Doctors' page after booking
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Error booking appointment. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Book an Appointment with {selectedDoctor?.name}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Day (Weekday) Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Select Day:</label>
          <div className="grid grid-cols-5 gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((weekday) => (
              <button
                type="button"
                key={weekday}
                onClick={() => setDay(weekday)}  // Set the selected day
                className={`py-2 px-4 rounded-lg ${day === weekday ? 'bg-indigo-500' : 'bg-gray-300 hover:bg-gray-400'} text-white`}
              >
                {weekday}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="grid grid-cols-4 gap-2">
          {Array(10).fill(0).map((_, index) => {
            const timeSlot = `${index + 9}:00`; // For demo purposes, 9 AM to 6 PM time slots
            const isBooked = bookedSlots.includes(timeSlot);  // Check if the time slot is booked

            return (
              <button
                type="button"
                key={index}
                className={`py-2 px-4 rounded-lg ${isBooked ? 'bg-red-500' : 'bg-blue-500 hover:bg-gray-500'} text-white`}
                disabled={isBooked}  // Disable button if the slot is booked
                onClick={() => setValue('time', timeSlot)}  // Set form value when available time slot is clicked
              >
                {timeSlot}
              </button>
            );
          })}
        </div>

        {/* Hidden Time Input to be submitted */}
        <input type="hidden" {...register('time', { required: 'Time is required' })} />
        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}

        {/* Submit Button */}
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

export default BookDoctorAppointment;
