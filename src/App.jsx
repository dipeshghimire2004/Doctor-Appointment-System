import { useEffect, useState } from 'react'

import Home from './pages/Home'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Header from './components/Header/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllDoctors from './pages/AllDoctors'
import BookDoctorAppointment from './pages/BookDoctorAppointment'
import UserProfile from './pages/UserProfile'
import Login from './components/Login'
import SignUp from './components/SignUp'
import MyAppointments from './components/MyAppointments'

import { Navigate } from 'react-router-dom'
import{login, logout} from './features/authSlice';
import { useDispatch, useSelector } from 'react-redux'


function App() {
  const dispatch=useDispatch();

  const {status, userData}=useSelector((state)=>state.auth);

  //Effect to check for token in localStorage and rehydrate authentication state
  useEffect(()=>{
    const token=localStorage.getItem('token');
    const storedUser=localStorage.getItem('userData')
    //if the use is logged in dispatch login action to rehudrate state
    if(storedUser && token){
      dispatch(login({token, user:JSON.parse(storedUser)}));
    }else{
      dispatch(logout());
    }
  },[dispatch])

  const ProtectedRoute=({element})=>{
    return status ? element : <Navigate to='./login'/>;
  }
  

  return (
    <Router>
      <Header /> {/* Ensure Header is included only once */}
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/all-doctors" element={<AllDoctors/>}/>
          
          <Route path='/login' element={<Login/>}/>
          <Route path='/Signup' element={<SignUp/>}/>
          
          {/* <Route path='/appointment-form-section' element={<AppointmentForm/>}/> */}
           <Route path='/book-doctor-appointment' element={<BookDoctorAppointment/>}/>
           <Route path='/user-profile' element={<ProtectedRoute element={<UserProfile/>} />}/>
          <Route path='/my-appointments' element={<ProtectedRoute element={<MyAppointments/>} />} />

                    {/* <Route path='/appointment' element={<Appointments/>}/> */}
        </Routes>
      </main>
      <Footer />
    </Router>
   
  )
}

export default App
