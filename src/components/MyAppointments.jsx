import React from 'react';
import { useSelector } from 'react-redux';
// Sample data (you would typically fetch this from an API)
// const appointments = [
//   {
//     id: 1,
//     date: '2024-09-25',
//     time: '10:00',
//     doctorName: 'Dr. John Doe',
//     specialization:'Gyaneocologist',
//   },
//   {
//     id: 2,
//     date: '2024-09-26',
//     time: '14:30',
//     doctorName: 'Dr. Jane Smith',
//     specialization:'General Physician',
//   },
//   // Add more appointments as needed
// ];

const MyAppointments = () => {
  const appointments=useSelector((state)=>state.appointment.appointments)
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">You have no upcoming appointments.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map(appointment => (
            <li key={appointment.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">{new Date(appointment.date).toLocaleDateString()}</span>
                <span className="text-gray-600">{appointment.time}</span>

              </div>
              <div className="text-gray-700">{appointment.doctorName}-{appointment.specialization}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
