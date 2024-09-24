import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyAppointments = () => {
  const reduxAppointments = useSelector((state) => state.appointment.appointments);
  const [appointments, setAppointments] = useState([]);

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      setAppointments(reduxAppointments);
    }
  }, [reduxAppointments]); // Sync redux state to local storage

  // Save to localStorage whenever appointments change
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    }
  }, [appointments]);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  // };

    const formatDate=(dateString)=>{
      const date=new Date(dateString);
      return isNaN(date.getTime())? "Invalid Date" : date.toLocaleDateString();
    }
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">You have no upcoming appointments.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <div>
              {appointment.profilePicture && (
                <div className="mb-2">
                  <img
                    src={appointment.profilePicture}
                    alt={`${appointment.doctorName}'s profile`}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              )}
              </div>
              <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">
                  {formatDate(appointment.date)}
                </span>
                <span className="text-gray-600">{appointment.startTime}</span>
              </div>
              <div className="text-gray-700">
                {appointment.doctorName} - {appointment.specialization}
              </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
