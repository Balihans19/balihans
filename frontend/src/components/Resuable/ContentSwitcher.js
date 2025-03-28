import { useState } from 'react';

/**
 * ContentSwitcher Component
 * 
 * This component provides an interactive content display with a navigation bar to switch 
 * between different slides. Each slide contains a title, description, and image. The 
 * component is styled for responsiveness and includes an optional "Read More" button.
 * 
 * props - The component props.
 *  props.slides - An array of slide objects. Each slide should have `title`, `description`, and `image` properties.
 *  props.title - The main heading displayed above the content.
 *  props.showButton - Determines whether the "Read More" button is displayed.
 * 
 */

const ContentSwitcher = ({
  slides, // Array of slides to display.
  title,  // Main heading for the component.
  showButton, // Whether to display the "Read More" button.
}) => {
  // State to track the currently active slide.
  const [activeSlide, setActiveSlide] = useState(slides[0]?.title || '');

  // Find the content for the currently active slide.
  const activeContent = slides.find(slide => slide.title === activeSlide);

  // If no slides are provided, render nothing.
  if (!slides.length) return null;

  return (
    <div className={'min-h-screen bg-[#f8f9fa] py-12 md:py-36'}>
      <div className="max-w-full px-8 lg:px-28 xl:px-36">
        {/* Main Heading */}
        <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-8 md:mb-16">{title}</h1>

        {/* Navigation Bar */}
        <div className="relative mb-8 md:mb-12 w-full">
          <div
            className="flex justify-between items-center pb-4 border-b border-gray-700 whitespace-nowrap 
                        overflow-x-auto scrollbar-hide"
          >
            {/* Navigation Buttons for Slides */}
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                onClick={() => setActiveSlide(slide.title)} // Update active slide on click.
                className={`${
                  index === 0 ? 'ml-0' : 'ml-4' // Add spacing between buttons.
                } ${
                  index === slides.length - 1 ? 'mr-0' : 'mr-4'
                } text-sm md:text-lg lg:text-xl xl:text-2xl font-bold transition-colors duration-300 
                pb-2 flex-shrink-0 ${
                  activeSlide === slide.title
                    ? 'text-black' // Highlight active slide.
                    : 'text-gray-400 hover:text-black' // Style for inactive slides.
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {activeContent && (
          <div className="grid md:grid-cols-[40%_60%] gap-4 items-center">
            {/* Description Section */}
            <div className="order-2 md:order-1">
              <p className="text-base md:text-xl leading-relaxed mb-6 w-full md:w-[60vh] max-w-full">
                {activeContent.description} {/* Display the description of the active slide. */}
              </p>
              {showButton && (
                <button className="border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300">
                  Read More {/* Optional "Read More" button for additional interactions. */}
                </button>
              )}
            </div>

            {/* Image Section */}
            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-lg w-full max-w-full aspect-[6/3]">
                <img
                  src={activeContent.image} // Display the image of the active slide.
                  alt={`Illustrating ${activeContent.title}`} // Accessibility description for the image.
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSwitcher;



