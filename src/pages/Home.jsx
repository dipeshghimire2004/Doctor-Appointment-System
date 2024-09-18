import React from 'react';

import ServicesSection from '../components/ServicesSection';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';


const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <ServiceCard/>
    </div>
  );
}; 

export default Home;
