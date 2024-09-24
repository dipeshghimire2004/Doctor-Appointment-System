import React from 'react';
import doctor from '../assets/images/doctor1.jpg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between lg:items-center p-6">
      <div className="lg:w-1/2">
        <h1 className="text-4xl font-bold mb-4">Book Online For <br /> Doctor's <span className="text-orange-400">Appointment</span></h1>
        <p className="text-gray-600 mb-6">Health is Wealth</p>
        <button className="bg-orange-400 text-white py-3 px-8 rounded-full"><Link to='./all-doctors'>Book Appointment</Link></button>
      </div>
      <div className="mt-6 lg:mt-0 lg:w-1/2 flex justify-center">
        <img src={doctor} alt="Doctors" className="max-w-full h-auto w-1/3"  />
      </div>
    </section>
  );
};

export default HeroSection;
