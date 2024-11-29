import React from "react";

const AIFuture = ({ imageUrl, quoteImageUrl }) => {
  return (
    <div className="min-h-screen text-white py-24 lg:py-24 px-6 lg:px-32 rounded-lg flex flex-col lg:flex-row gap-10 items-center justify-center max-w-full mx-auto">
      {/* Image Section */}
      <div className="w-full lg:w-[25%] flex-shrink-0 mb-12 lg:mb-0">
        <img
          src={imageUrl}
          alt="Background"
          className="w-full h-[300px] lg:h-[500px] object-cover rounded-md shadow-lg"
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-[70%] text-center lg:text-left">
        {/* Quote Image */}
        <img src={quoteImageUrl} alt="Quote" className="w-[100px] h-[100px] text-gray-400 text-5xl lg:text-8xl mb-8" />

        {/* Quote Text */}
        <p className="text-white text-2xl">
          Imagine a future where data-driven insights fuel innovation, where AI automates routine tasks, and where
          intelligent machines work alongside humans to solve complex problems. A future where businesses are empowered
          to make informed decisions, improve operational efficiency, and deliver exceptional customer experiences. This
          future is powered by AI.
        </p>

        <p className="mt-4 text-white text-2xl">
          Together, we can shape the future of AI, driving innovation and creating a better world.
        </p>

        {/* Author Section */}
        <div className="mt-10 border-t text-white pt-4">
          <h3 className="text-3xl mb-2 mt-6">Konstantin Koshechkin, PhD</h3>
          <p className=" text-2xl">Head of AI, Balihans</p>
        </div>
      </div>
    </div>
  );
};

export default AIFuture;