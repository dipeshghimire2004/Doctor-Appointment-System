import React from 'react'
import DoctorCard from '../components/DoctorCard'


 const doctorDetails = [
        {
          id: 1,
          name: 'Dr. John Doe',
          specialization: 'Cardiologist',
          image: 'doctor1.jpg', // Placeholder image name or URL
          },
        ]
const DoctorDetail = () => {
  return (
    <div>
        <DoctorCard>
            
        </DoctorCard>
    </div>
  )
}

export default DoctorDetail