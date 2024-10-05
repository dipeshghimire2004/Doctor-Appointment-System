import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Input from '../components/Input';
import { Button } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../features/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  
  // Fetching userData from the Redux store
  const userData = useSelector((state) => state.auth.userData); 

  // Define states for profile image preview and edit mode
  const [profileImagePreview, setProfileImagePreview] = useState(userData?.profilePicture || '');
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form with react-hook-form and default values
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
    },
  });

  // Function to handle profile update submission
  const onSubmit = async (data) => {
    try {
      const updatedProfile = {
        ...userData,
        name: data.name,
        phone: data.phone,
        profilePicture: profileImagePreview,
      };
      console.log('Sending request to backend:', updatedProfile);
      const token=localStorage.getItem('token');
      // Send updated data to the server
      await axios.put('http://localhost:8080/api/user/edit-profile', {
        name: data.name,
        phone: data.phone,
        profilePicture:profileImagePreview,
      },{
          headers: {
            Authorization: `Bearer ${token}`,  // Add token in Authorization header
          },
      });

      // Update Redux state and local storage
      dispatch(updateUserData(updatedProfile));
      toast.success('Profile updated successfully');
      setIsEditing(false); // Exit edit mode after update
    } catch (error) {
      console.error('Error updating profile:', error.message);
      toast.error('Failed to update profile, please try again.');
    }
  };

    //Handle image upload and preview
    const handleImageUpload=(event)=>{
      const file=event.target.files[0];
      if(file){
        const reader= new FileReader();
        reader.onloadend=()=>{
          setProfileImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };


  // Cancel editing and revert to original profile info
  const handleCancel = () => {
    reset(userData); // Reset form to original profile data
    setProfileImagePreview(userData?.profilePicture || ''); // Reset profile image
    setIsEditing(false); // Exit edit mode
  };

  // Reset the form with userData when the page loads
  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [reset]);

  // Render a loading state if userData is not available
  if (!userData) {
    return <p>Loading...</p>; // You can customize the loading message here
  }

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
              <p className="text-gray-700"><strong>Name:</strong> {userData.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Email:</strong> {userData.email}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Phone:</strong> {userData.phone}</p>
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
              value={userData.email}
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
              <Button type="submit" 
              className="w-1/2 mr-2 py-2 bg-green-600 text-white rounded-md">
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
