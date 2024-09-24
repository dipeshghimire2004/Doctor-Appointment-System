import React from 'react'
import doctor3 from '../assets/images/doctor3.png'

const ContactUs = () => {
  return (
    <div>
      <h1 className='font-semibold text-3xl flex justify-center mb-20'>Contact Us</h1>
      <div className='flex justify-center gap-24'>
        <div>
          <img src={doctor3} alt='doctorImage' className='w-72 h-72' />
        </div>
        <div>
          <h1 className='font-semibold mb-10'>Our Office</h1>
          <p>Baluwatar</p>
          <p>Phone: 9842931707</p>
        </div>
      </div>
    </div>
  )
}

export default ContactUs