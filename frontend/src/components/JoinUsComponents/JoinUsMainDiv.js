import React from "react";
import { MoveRight } from 'lucide-react'; // Icon for indicating forward navigation

// JoinUsMainDiv Component
// A full-screen section featuring a grayscale background, heading, description, and clickable values list
const JoinUsMainDiv = ({
  backgroundImageUrl, // URL of the background image
  heading,            // Heading displayed at the top
  description,        // Text description displayed under the heading
  values = []         // Array of objects containing title and optional href for values section
}) => {
  return (
    <div className="relative min-h-screen lg:min-h-[850px] text-white w-full">
      {/* Grayscale background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`, // Apply the passed background image
          filter: 'grayscale(100%)',                   // Set grayscale filter
          backgroundSize: 'cover',                     // Ensure image covers entire background
          backgroundPosition: 'center',                // Center the background image
          zIndex: 0                                    // Place it at the lowest layer
        }}
      />

      {/* Gradient overlay for better readability */}
      <div
        className="absolute inset-0 bg-gradient-to-l from-black to-transparent"
        style={{ zIndex: 1 }} // Gradient appears above the background
      ></div>

      {/* Main content area */}
      <div className="relative z-10 max-w-full mt-12 lg:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Heading section */}
        <div className="flex justify-end items-start">
          <div className="max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl w-full">
            <div className="flex gap-12 text-left font-bold text-base sm:text-lg lg:text-2xl">
              <h1>{heading}</h1> {/* Render the main heading */}
            </div>
          </div>
        </div>

        {/* Horizontal divider */}
        <div className="flex justify-end items-start">
          <hr className="w-full my-6" /> {/* Decorative line */}
        </div>

        {/* Description section */}
        <div className="flex justify-end items-start">
          <div className="text-left max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl w-full">
            <p className="text-base text-justify sm:text-xl lg:text-xl mb-8">
              {description} {/* Render the description */}
            </p>
          </div>
        </div>

        {/* Values section */}
        <div className="flex justify-end items-start">
          <div className="max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl w-full">
            {values.map((item, index) => (
              <a
                key={item.href || index} // Use `href` as a unique key, fallback to `index` if not provided
                href={item.href}         // Link associated with the value
                className="group flex items-center justify-between border-b-4 border-[#add9f2] py-4 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <span className="text-sm xs:text-lg sm:text-xl md:text-2xl">
                  {item.title} {/* Display the title of the value */}
                </span>
                <MoveRight
                  color="#add9f2" // Icon color matching border
                  className="w-8 sm:w-10 h-8 sm:h-10 transform group-hover:translate-x-2 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsMainDiv;
