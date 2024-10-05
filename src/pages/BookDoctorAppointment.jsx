import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addAppointment } from '../features/appointmentSlice';

const BookDoctorAppointment = () => {
  const { register, handleSubmit, formState: { errors },setValue } = useForm();
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedDoctor } = location.state || {};  // Ensure this is coming from the previous page (All doctors page)

  const token = localStorage.getItem('token');  // Assuming JWT token is stored in localStorage

  // Fetch booked slots for the selected doctor on the selected date
  const fetchBookedSlots = async (date) => {
    if (!selectedDoctor?._id) return;

    try {
      const response = await axios.get(`http://localhost:8080/api/appointment/${selectedDoctor._id}/booked-slots`, {
        params: { date },
        headers: {
          Authorization: `Bearer ${token}`,  // Add JWT token in headers
        }
      });
      setBookedSlots(response.data);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      toast.error("Error fetching booked slots.");
    }
  };

  // Handle date change
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    fetchBookedSlots(date);  // Fetch slots when a date is selected
  };

  // Submit the appointment form
  const onSubmit = async (data) => {
    const { time, date } = data;
    const requestData = {
      doctorId: selectedDoctor._id,
      day: new Date(date).toLocaleDateString('en-GB', { weekday: 'long' }),
      timeslot: time,
    };

    try {
      // http://localhost:8080/api/appointment/:/doctorId/${selectedDoctor._id}`, requestData,
      const response = await axios.post(`http://localhost:8080/api/appointment/${doctorId}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass JWT token
          'Content-Type': 'application/json',
        },
      });

      // Dispatch the new appointment to Redux store
      dispatch(addAppointment({
        doctorName: selectedDoctor.userId.name,
        profilePicture: selectedDoctor.profilePicture,
        specialization: selectedDoctor.specialization,
        date,
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
        {/* Date Input */}
        <div>
          <input
            label="Date"
            type="date"
            {...register('date', { required: 'Date is required' })}
            onChange={handleDateChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
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
