import { useState } from 'react'

import Home from './pages/Home'
import Service from './pages/Service'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Header from './components/Header/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Appointments from './pages/Appointments'
import AllDoctors from './pages/AllDoctors'
import AppointmentForm from './components/form/AppoinmentForm'
import DoctorDetail from './pages/DoctorDetail'
import Profile from './components/Profile'
import Login from './components/Login'
import SignUp from './components/SignUp'

import MyAppointments from './components/MyAppointments'
function App() {
  

  return (
    <Router>
      <Header /> {/* Ensure Header is included only once */}
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/all-doctors" element={<AllDoctors/>}/>
          <Route path='/appointment-form-section' element={<AppointmentForm/>}/>
          {/* <Route path='/appointment' element={<Appointments/>}/> */}
           <Route path='/doctor-detail' element={<DoctorDetail/>}/>
           <Route path='/profile' element={<Profile/>}/>
          <Route path='/my-appointments' element={<MyAppointments/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Signup' element={<SignUp/>}/>
        </Routes>
      </main>
      <Footer />
    </Router>
   
  )
}

export default App
