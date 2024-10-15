import { useEffect } from 'react'

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

  const status=useSelector((state)=>state.auth);
  const userData=useSelector((state)=>state.auth.userData)
 
  //Effect to check for token in localStorage and rehydrate authentication state

  useEffect(()=>{
    const token=localStorage.getItem('token');
    const storedUser=localStorage.getItem('userData');
    // console.log(storedUser)
    //if the user is logged in dispatch login action to rehydrate state
    if(storedUser && token){
      try {
        const userData=JSON.parse(storedUser)
        dispatch(login({token, userData}));
      } catch (error) {
        
      }
     
    }else{
      dispatch(logout());
    }
  },[dispatch])

  const ProtectedRoute=({element})=>{
    return status ? element : <Navigate to='/login'/>;
  }
  

  return (
    <div>
      <Header /> {/* Ensure Header is included only once */}
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/all-doctors" element={<AllDoctors/>}/>
          
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>     
          {/* //path chnages from "Signup" to "signup" */}
          
          {/* <Route path='/appointment-form-section' element={<AppointmentForm/>}/> */}
           <Route path='/book-doctor-appointment' element={<BookDoctorAppointment/>}/>
           <Route path='/user-profile' element={<ProtectedRoute element={<UserProfile/>} />}/>
          <Route path='/my-appointments' element={<ProtectedRoute element={<MyAppointments/>} />} />

                    {/* <Route path='/appointment' element={<Appointments/>}/> */}
        </Routes>
      </main>
      <Footer />
    </div>
   
  )
}

export default App
