import React from 'react';
import { MoveRight } from 'lucide-react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook


/**
 * AboutSection Component
 * A responsive section with dynamic navigation links that filter based on current route
 * 
 * @component
 * props
 *  props.backgroundImageUrl - URL for the background image
 */

const AboutSection = ({ backgroundImageUrl }) => {
  const location = useLocation(); // Get current route using useLocation hook

  // Define navigation items
  const navigationItems = [
    { title: 'Leadership', href: '#leadership' },
    { title: 'Our Brand', href: '#brand' },
    { title: 'Corporate Sustainability', href: '#sustainability' },
    { title: 'Diversity, Equity, and Inclusion', href: '#dei' },
    { title: 'Recognition', href: '#recognition' },
    { title: 'Customer Speak', href: '#customers' },
  ];

  // Define conditions for each page where an item should be excluded
  const excludedItems = {
    '/leadership': ['Leadership'], // Remove 'Leadership' item when on /leadership
    '/brand': ['Our Brand'], // Remove 'Our Brand' item when on /brand
    '/sustainability': ['Corporate Sustainability'], // Remove 'Corporate Sustainability' when on /sustainability
    '/diversity': ['Diversity, Equity, and Inclusion'], // Remove 'Diversity, Equity, and Inclusion' when on /dei
    '/recognition': ['Recognition'], // Remove 'Recognition' when on /recognition
  };

  // Get the current page's path
  const currentPath = location.pathname;

  // Filter out the items based on the current page
  const filteredItems = navigationItems.filter(item => {
    // Check if current page is in the excludedItems object and exclude the current item
    const excludedForPage = excludedItems[currentPath];
    return !excludedForPage || !excludedForPage.includes(item.title);
  });

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={backgroundImageUrl}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Left Content Overlay */}
      <div className="absolute left-0 bg-black/70 h-full w-[50%] ">
        <div className="h-full w-full p-12 mx-0 lg:mx-8 xl:mx-24">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
              More about us.
            </h2>
            <nav className="space-y-4 w-11/12 lg:w-3/4 xl:w-2/3">
              {filteredItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between border-b-4 border-gray-400 py-4 text-gray-200 hover:text-white transition-colors duration-300"
                >
                  <span className="text-xs xs:text-sm sm:text-xl xl:text-2xl">{item.title}</span>
                  <MoveRight className="sm:w-10 sm:h-10 w-5 h-5 text-gray-200 transform group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

