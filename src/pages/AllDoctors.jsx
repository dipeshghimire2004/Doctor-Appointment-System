import React from 'react'
import DoctorCard from '../components/DoctorCard';

const AllDoctors = () => {
  
    const allDoctors = [
        {
          id: 1,
          name: 'Dr. John Doe',
          specialization: 'Cardiologist',
          image: 'doctor1.jpg', // Placeholder image name or URL
          },
        {
          id: 2,
          name: 'Dr. Jane Smith',
          specialization: 'Dermatologist',
          image: 'doctor2.jpg', // Placeholder image name or URL
          },
        {
          id: 3,
          name: 'Dr. Alex Johnson',
          specialization: 'Pediatrician',
          image: 'doctor3.jpg', // Placeholder image name or URL
         
        },
        {
          id: 4,
          name: 'Dr. Emily Davis',
          specialization: 'Neurologist',
          image: 'doctor4.jpg', // Placeholder image name or URL
         
          
        },
        {
          id: 5,
          name: 'Dr. Michael Brown',
          specialization: 'Orthopedic Surgeon',
          image: 'doctor5.jpg', // Placeholder image name or URL
          
        },
      ];
      
  return (
    <section className="p-6 bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allDoctors.map((doctor,index)=>(
            <DoctorCard 
            key={index}
            id={doctor.id}
            name={doctor.name}
            specialization={doctor.specialization}
            image={doctor.image}
            />
        ))}
    </section>
  )
}

export default AllDoctors