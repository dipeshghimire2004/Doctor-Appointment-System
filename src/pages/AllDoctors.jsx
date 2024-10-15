import React, { useEffect, useState } from 'react'
import DoctorCard from '../components/DoctorCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AllDoctors = () => {

  const [doctors, setDoctors]=useState([]);
  const [loading, setLoading]=useState(true);
  const [error,setError]=useState(null);
  const location=useLocation();

  const navigate=useNavigate();

  useEffect(()=>{
    const fetchDoctors = async () => {
      // const {name,specialization,experience, image}=data;
      try{
        const response = await axios.get('http://localhost:8080/api/Doctor/getDoctor')
        setDoctors(response.data.data);
      }
      catch(error){
        setError(error.response? error.response.data.message:error.message);
      }
      finally{
        setLoading(false);
      }
    };
    fetchDoctors();
  },[]);
  

  if(loading) return <p>Loading doctors...</p>;
  if(error) return <p>Error:{error}</p>;

  //Get the specialization from the filter and doctors
      

    const specialization=location.state?.specialization;
    const filteredDoctors=specialization?doctors.filter((doctors)=>doctors.specialization===specialization): doctors;

  return (
    <section className="p-6 bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doctor)=>(
            <DoctorCard 
              key={doctor._id}
              id={doctor._id}
              image={doctor.userId.profilePicture}
              name={doctor.userId.name}
              specialization={doctor.specialization}
              onBookNow={()=>navigate('/book-doctor-appointment', {state:{selectedDoctor : doctor }})}   //Navigate to DoctorAppointment with doctor data
            />
           
        ))}
    </section>
  )
}

export default AllDoctors





// import doctor1 from "../assets/images/doctor1.jpg"
// import doctor2 from "../assets/images/doctor2.png"
// import doctor3 from "../assets/images/doctor3.png"
//experience={doctor.experience}

 // <img src={doctor.image} alt={doctor.name}/>
            
            // <div key={doctor.id} className='group relative overflow-hidden rounded-3xl flex flex-col'>
            //    <img src={doctor.image} alt={doctor.name} className='object-cover h-10 w-10'/>
            //    <div className='absolute inset-0 flex flex-col m-4'>
            //     <p className=''>{doctor.name}</p>
            //     <p className='mb-2'>{doctor.specialization}</p>
            //    </div>
            // </div>



// const allDoctors = [
    //     {
    //       id: 1,
    //       name: 'Dr. John Doe',
    //       specialization: 'Cardiologist',
    //       image:doctor1,
    //       experience:'2 yrs'
    //       },
    //     {
    //       id: 2,
    //       name: 'Dr. Jane Smith',
    //       specialization: 'Dermatologist',
    //       image: doctor2,
    //       experience:'2 yrs'
    //       },
    //     {
    //       id: 3,
    //       name: 'Dr. Alex Johnson',
    //       specialization: 'Pediatrician',
    //       image: doctor3, // Placeholder image name or URL
    //        experience:'3 yrs'
    //     },
    //     // {
    //     //   id: 4,
    //     //   name: 'Dr. Emily Davis',
    //     //   specialization: 'Neurologist',
    //     //   image: 'doctor4', // Placeholder image name or URL
         
          
    //     // },
    //     // {
    //     //   id: 5,
    //     //   name: 'Dr. Michael Brown',
    //     //   specialization: 'Orthopedic Surgeon',
    //     //   image: 'doctor5.jpg', // Placeholder image name or URL
          
    //     // },
    //   ];