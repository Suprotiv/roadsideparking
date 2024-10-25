import React from 'react';

// Import your image (you can replace it with the path to the uploaded image) // Adjust this path based on your folder structure

const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-20 bg-white">
      {/* Left section with image */}
      <div className="md:w-1/2 w-full flex justify-center md:justify-start">
        <img 
          src='bg1.webp' 
          alt="Driver in a car" 
          className="object-cover w-[65vh] h-[65vh] rounded-md" 
        />
      </div>

      {/* Right section with text */}
      <div className="md:w-1/2 w-full mt-8 md:mt-0 flex flex-col justify-center items-start">
  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
    Find Parking Effortlessly, Park Conveniently
  </h1>
  <p className="text-lg text-gray-600 mb-6">
    Discover the nearest parking spots in real-time and get guided directions 
    to your destination. Whether you're in a busy city or just exploring, 
    we help you park without the hassle.
  </p>
  
  {/* Buttons */}
  <div className="flex space-x-4">
  
  </div>
</div>
    </section>
  );
}

export default About;
