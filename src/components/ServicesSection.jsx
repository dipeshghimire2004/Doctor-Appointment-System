import { useState } from 'react';
import ServiceCard from './ServiceCard';
import { useNavigate } from 'react-router-dom';

const ServicesSection = ({doctors}) => {

  const navigate=useNavigate();
  const handleBookNow=(specialization)=>{
    navigate('/all-doctors', {state:{specialization}});
  }

  
  const serviceCards = [
    {
      icon: "🧠",
      title: "Psychological",
      description: "Description...."
    },
    {
      icon: "❤️",
      title: "Cardiology",
      description: "Description...."
    },
    {
      icon: "⚕️",
      title: "Gynecology",
      description: "Description...."
    },
    {
      icon: "👶",
      title: "Pediatrician",
      description: "Description...."
    }
  ];

  return (
    <section className="p-6 bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {serviceCards.map((service, index) => (
        <ServiceCard 
          key={index} 
          icon={service.icon} 
          title={service.title} 
          description={service.description} 
          handleBookNow={handleBookNow}
          specialization={service.specialization}
        />
      ))}
    </section>
  );
};

export default ServicesSection;
