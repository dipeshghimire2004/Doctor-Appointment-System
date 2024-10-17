import React, { useState } from 'react'
import toast,{Toaster} from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Input,Button} from '../index';
import { Link } from 'react-router-dom';

const CreateDoctor = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [showPassword, setShowPassword]=useState(false)

    const toggleVisibility=()=>{
        setShowPassword(!showPassword);
    }

    const{register, handleSubmit, reset, formState:{errors}}=useForm();
    // http://localhost:8080/api/doctor/createDoctor

    const onSubmit=async (data)=>{
        const {name, email, phone, password, specialization}=data;
        try {
            const response=await axios.post("http://localhost:8080/api/doctor/createDoctor",{
                name,
                email,
                phone,
                password,
                specialization,
            },{
               Headers:{
                'Content-Type':'application/json'
               }
            });
            if(response.status==200){
                reset();
                navigate('/managedoctor')
                toast.success("Doctor Created");
            }
            else{
                toast.error(response.data.message || "Something went wrong")
            }

        } catch (error) {
            toast.error(error.response?.data?.message||"Error occured. Please try again");
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <Toaster/>
        <div className='bg-white p-8 m-5 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>Add New Doctor</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='mb-4'>
                    <Input
                        lable="Doctor Name:"
                        id="name"
                        {...register("name", {required:"Name is required"})}
                        placeholder="Enter your name"
                    />
                    {errors.name && <span className='text-red-600 text-sm'>{errors.name.message}</span>}
                </div>

                <div className='mb-4'>
                    <Input
                        label="Email"
                        id:email
                        {...register("email",{required:"Email is required",
                            pattern:{
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address"
                            }

                        })}
                    />
                    {errors.email && <span className='text-red-600 text-sm'>{errors.email.message}</span>}
                </div>
                <div className="mb-4">
            <Input
              label="Phone"
              placeholder="Enter your phone number"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Phone number must contain only numbers',
                },
              })}
            />
            {errors.phone && <span className="text-red-600 text-sm">{errors.phone.message}</span>}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}  // Toggle type between text and password
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                })}
                placeholder="Enter your password"
            />
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={toggleVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
            </div>

            <div>
                <Input 
                    label="Specialization:"
                    id="specialixation"
                    {...register,('specialization',{required:'Specialization is required'})}
                    placeholder='Enter the specialization'
                />
                {errors.specialization && <span>{errors.specialization.message }</span>}
            </div>

            
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Create Doctor
            </Button>
          </div>

        
        </form>
        <div>
            <p>Already have an account? <Link to='/login'>Sign in</Link></p>
          </div>
        </div>
    </div>
  )
}

export default CreateDoctor