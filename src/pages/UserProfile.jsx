import React from 'react';
import Select from '../components/Select';
import { useForm } from 'react-hook-form';
import { Button } from '../components';
import doctor1 from "../assets/images/doctor1.jpg";
import { useSelector } from 'react-redux';

const UserProfile = () => {

    const user=useSelector((state)=>state.user.userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Handle form submission (e.g., send data to backend)
  };

  if(!user) return <p>Please Log in to view user Profile</p>
  
  return (
    <div className='flex flex-col items-center bg-gray-50 py-8 px-4'>
      {/* Header Section */}
      <h1 className='text-3xl font-semibold mb-4'>User Profile</h1>

      {/* Profile Image */}
      <div className='mb-6'>
        <img
          src={doctor1}
          alt='User'
          className='w-32 h-32 rounded-full border-2 border-blue-600'
        />
      </div>

      {/* User Information */}
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        <div className='mb-6'>
          <h2 className='text-xl font-bold'>{user.name || "DG"}</h2>
          <p className='text-gray-600'>Contact Information</p>
          <p className='text-gray-600'>Email: {user.email}</p>
          <p className='text-gray-600'>Phone: {user.phone}</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Gender Selection */}
          <div>
            <label
              htmlFor='gender'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Gender
            </label>
            <select
              id='gender'
              {...register('gender', { required: 'Please select your gender' })}
              className={`w-full p-2 border ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              } rounded-md bg-white`}
            >
              <option value=''>Select Gender</option>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
              <option value='others'>Others</option>
            </select>
            {errors.gender && (
              <p className='text-red-500 text-sm mt-1'>{errors.gender.message}</p>
            )}
          </div>

          {/* Date Selection */}
          <div>
            <label
              htmlFor='date'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Date of Birth
            </label>
            <input
              type='date'
              id='date'
              {...register('date', { required: 'Please select a date' })}
              className={`w-full p-2 border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
            />
            {errors.date && (
              <p className='text-red-500 text-sm mt-1'>{errors.date.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type='submit' className='w-full py-2 bg-blue-600 text-white rounded-md'>
            Edit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
