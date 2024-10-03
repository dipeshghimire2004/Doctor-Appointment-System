import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Input from '../components/Input';
import { Button } from '../components';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  // Load data from local storage

  const userDetails=useSelector((state)=>state.auth.userData)
  console.log(userDetails);
  const profileInfo = {
    name: localStorage.getItem('name') || '',
    email: localStorage.getItem('email') || '',
    phone: localStorage.getItem('phone') || '',
    // address: localStorage.getItem('address') || '',
    // gender: localStorage.getItem('gender') || '',
    // dateOfBirth: localStorage.getItem('dateOfBirth') || '',
    profileImage: localStorage.getItem('profilePicture') || '',
  };

  const [profileImagePreview, setProfileImagePreview] = useState(profileInfo.profileImage);
  const [isEditing, setIsEditing] = useState(false); // Track if user is in edit mode
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: profileInfo.name,
      email: profileInfo.email,
      phone: profileInfo.phone,
    },
  });

  // Function to handle profile update submission
  const onSubmit = async (data) => {
    try {
      localStorage.setItem('profilePicture', profileImagePreview);
      localStorage.setItem('name', data.name);
      localStorage.setItem('phone', data.phone);

      // Send updated data to the server
      await axios.put('http://localhost:8080/api/edit-profile', {
        name: data.name,
        phone: data.phone,
        profileImage: profileImagePreview,
      });

      toast.success('Profile updated successfully');
      setIsEditing(false); // Exit edit mode after update
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile, please try again.');
    }
  };

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cancel editing, revert to original profile info
  const handleCancel = () => {
    reset(profileInfo); // Reset form to original profile data
    setProfileImagePreview(profileInfo.profileImage); // Reset profile image
    setIsEditing(false); // Exit edit mode
  };

  // Reset the form with local storage data when the page loads
  useEffect(() => {
    reset(profileInfo);
  }, [reset]);

  return (
    <div className="flex flex-col items-center bg-gray-50 py-8 px-4">
      <Toaster />
      {/* Header Section */}
      <h1 className="text-3xl font-semibold mb-4">User Profile</h1>

      {/* User Information Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-4">
          <img
            src={profileImagePreview || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>

        {!isEditing ? (
          <div>
            {/* Profile View Mode */}
            <div className="mb-4">
              <p className="text-gray-700"><strong>Name:</strong> {profileInfo.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Email:</strong> {profileInfo.email}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Phone:</strong> {profileInfo.phone}</p>
            </div>

            <Button onClick={() => setIsEditing(true)} className="w-full py-2 bg-blue-600 text-white rounded-md">
              Edit Profile
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Edit Mode */}
            <Input
              label="Name:"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}

            <Input
              label="Email (read-only):"
              type="email"
              value={profileInfo.email}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
              readOnly
            />

            <Input
              label="Phone:"
              type="tel"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Phone number must contain only numbers',
                },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

            <div className="mb-4">
              <label className="block text-gray-700">Profile Picture</label>
              <input type="file" onChange={handleImageUpload} className="w-full" />
              {profileImagePreview && (
                <img src={profileImagePreview} alt="Profile Preview" className="mt-4 h-32 w-32 rounded-full" />
              )}
            </div>

            {/* Action Buttons */} 
            <div className="flex justify-between">
              <Button type="submit" className="w-1/2 mr-2 py-2 bg-green-600 text-white rounded-md">
                Update
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                className="w-1/2 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
