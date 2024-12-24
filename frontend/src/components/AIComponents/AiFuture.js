import React from "react";

// Functional component to render a future-oriented AI section with an image, quote, and author details
const AIFuture = ({ imageUrl, quoteImageUrl }) => {
  return (
    <div className="min-h-screen text-white py-12 sm:py-16 md:py-24 lg:py-24 px-4 sm:px-6 lg:px-32 rounded-lg flex flex-col lg:flex-row gap-10 items-center justify-center max-w-full mx-auto">
      {/* Image Section */}
      <div className="w-full lg:w-[25%] flex-shrink-0 mb-8 sm:mb-12 lg:mb-0">
        <div className="relative h-[500px] overflow-hidden">
          {/* Renders the main image, typically a visual representation of AI */}
          <img
            src={imageUrl} // URL for the main image
            alt="Background" // Alt text for accessibility
            className="absolute inset-0 w-full h-full object-cover" // Ensures the image fully covers the container
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-[70%] text-center lg:text-left">
        {/* Quote Image */}
        <img
          src={quoteImageUrl} // URL for the quote-related image (e.g., quotation marks)
          alt="Quote" // Alt text for accessibility
          className="w-[100px] h-[100px] text-gray-400 mb-6 sm:mb-8" // Sets the size and styling of the quote image
        />

        {/* Main Quote Text */}
        <p className="text-white text-lg sm:text-xl md:text-2xl">
          Imagine a future where data-driven insights fuel innovation, where AI
          automates routine tasks, and where intelligent machines work alongside
          humans to solve complex problems. A future where businesses are
          empowered to make informed decisions, improve operational efficiency,
          and deliver exceptional customer experiences. This future is powered
          by AI.
        </p>

        {/* Supporting Quote Text */}
        <p className="mt-4 text-white text-lg sm:text-xl md:text-2xl">
          Together, we can shape the future of AI, driving innovation and
          creating a better world.
        </p>

        {/* Author Section */}
        <div className="mt-8 sm:mt-10 border-t border-gray-700 pt-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl mb-2 mt-4 sm:mt-6">
            Konstantin Koshechkin, PhD
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl">
            Head of AI, Balihans
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIFuture;


