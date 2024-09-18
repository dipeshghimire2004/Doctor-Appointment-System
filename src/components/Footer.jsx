import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          
          {/* Logo Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">DoctorApp</h2>
            <p className="text-gray-400">Your health, our priority.</p>
          </div>
          
          {/* Quick Links Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <nav className="space-y-2">
              <NavLink to="/" className="text-gray-400 hover:text-white">Home</NavLink>
              <NavLink to="/service" className="text-gray-400 hover:text-white">Services</NavLink>
              <NavLink to="/about" className="text-gray-400 hover:text-white">About Us</NavLink>
              <NavLink to="/contact" className="text-gray-400 hover:text-white">Contact Us</NavLink>
              <NavLink to="/appointment" className="text-gray-400 hover:text-white">Book Appointment</NavLink>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
            <p className="text-gray-400">Email: info@doctorapp.com</p>
            <p className="text-gray-400">Address: 123 Health Street, City, Country</p>
          </div>

          {/* Social Media Links */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          &copy; {new Date().getFullYear()} DoctorApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
