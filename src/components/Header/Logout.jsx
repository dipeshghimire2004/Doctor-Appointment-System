import React from 'react'
import Button from '../Button'
import { logout } from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import toast,{Toaster} from 'react-hot-toast'

const Logout = () => {
  const dispatch=useDispatch();
  const handleLogout=()=>{


    localStorage.removeItem('token');
    dispatch(logout());
    window.location.href='/login';
    toast.success("Logout Successfully!!")

  }
  return (
    <div>
      <Toaster/>
      <Button type='submit' onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Logout