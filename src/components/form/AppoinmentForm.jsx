import React,{useState} from 'react'
// import {Button, Input, Select} from '../index';
import Button from '../index';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
    const timeSlots = [
        "7:00 AM - 7:30 AM",
        "7:30 AM - 8:00 AM",
        "8:00 AM - 8:30 AM",
        "8:30 AM - 9:00 AM",
        "9:00 AM - 9:30 AM",
        "9:30 AM - 10:00 AM",
        "10:00 AM - 10:30 AM",
        "10:30 AM - 11:00 AM",
        "11:00 AM - 11:30 AM",
        "11:30 AM - 12:00 PM",
        "12:00 PM - 12:30 PM",
        "12:30 PM - 1:00 PM",
        "1:00 PM - 1:30 PM",
        "1:30 PM - 2:00 PM",
        "2:00 PM - 2:30 PM",
        "2:30 PM - 3:00 PM",
        "3:00 PM - 3:30 PM",
        "3:30 PM - 4:00 PM",
        "4:00 PM - 4:30 PM",
        "4:30 PM - 5:00 PM"
      ];
    
      const [date, setDate]=useState('');
      const [time,setTime]=useState('');
      const [name, setName]=useState('');
      const [email, setEmail]=useState('');
    
      const navigate=useNavigate();  
      const{
            register,
            handleSubmit,
            formState:{errors}
            }=useForm();
            const onSubmit=(formData)=>{
              console.log(formData);
              navigate("")
            }
      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type='date' value={date} 
            onChange={(e)=>setDate(e.target.value)} {...register('date')} className={``}
            />
            {errors.date && <p className='text-red-5000'>Date id required</p>}
    
            <Select {...register('time',{required:true})}
              onChange={(e) => setTime(e.target.value)}
              value={time}
              options={timeSlots}
            >
              {/* <option>
                {timeSlots.map((slot,index)=>(
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
                
              </option> */}
            </Select>
            {errors.time && <p className='text-red-500'>Time is required</p>}
         
          
             <Input 
                label="Full Name"
                placeholder="Full Name"
                value={name}
                className="mb-4"
                type="text"
                {...register("name",{required:true})}
             />
             {errors.name && <p className='text-red-500'>Name is required</p>}
             
             <Input 
             label="Email"
             placeholder="Email"
             value={email}
             type="email"
             className="mb-4"
             {...register("email",{required:true})}
             />
             {errors.email && <p className='text-red-500'>Email is required</p>}
          
            <Button label="Appointment" type='submit'/>
          </form>
        </div>
  )
}

export default AppointmentForm