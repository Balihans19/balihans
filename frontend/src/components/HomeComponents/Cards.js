import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Predefined navigation links for the cards
 * Each link corresponds to a specific service or section
 */
const links = [
  "/strategy-and-consulting",
  "/cloud-and-infrastructure",
  "/artifical-intelligence",
  "/cybersecurity",
  "/digital-enterprise",
  "/testing-services",
  "/internet-of-things",
  "/web3-solutions",
];

/**
 * Card - A reusable component for displaying service information with hover effects
 * 
 * props
 * props.title - Card title
 * props.description - Card description
 * props.imgSrc - URL for the card's background image
 * props.link - Navigation link for the card
 */
const Card = ({ title, description, imgSrc, link }) => {
  // Track viewport size for responsive behavior
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive design
  useEffect(() => {
    // Function to update mobile state based on window width
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check on component mount
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup resize listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Link to={link} className="group">
      {/* Card container with hover effects */}
      <div className="relative w-full h-[450px] overflow-hidden transition-transform duration-300 ease-in-out group">
        {/* Overlay with conditional opacity based on hover/mobile */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-start bg-black ${
            isMobile ? 'bg-opacity-50' : 'bg-opacity-50 group-hover:bg-opacity-60'
          } text-white transition-opacity duration-300 ease-in-out`}
        >
          {/* Card title - always visible */}
          <h2 className="text-3xl text-left mb-2 text-white z-10 absolute top-[100px] ml-5 w-4/5">
            {title}
          </h2>
          {/* Card description - visible on hover/mobile */}
          <p
            className={`text-xl font-normal text-left mx-5 text-white z-10 ${
              isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            } transition-opacity duration-300 ease-in-out absolute top-[190px]`}
          >
            {description}
          </p>
        </div>
        {/* Background image with conditional blur effect */}
        <img
          src={imgSrc}
          alt={title}
          className={`w-full h-full object-cover block ${
            isMobile ? '' : 'group-hover:blur-sm'
          } transition-all duration-300 ease-in-out`}
        />
      </div>
    </Link>
  );
};

/**
 * Cards - Container component for displaying a grid of Card components
 * 
 * @component
 *  props
 *  props.primaryHeading - Main section heading
 *  props.paragraph - Section description text
 *  props.cardsData - Array of card data objects containing title, description, and imgSrc
 */
const Cards = ({ primaryHeading, paragraph, cardsData }) => {
  return (
    <section className="text-white py-36">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header Section with responsive layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 mb-12">
          {/* Primary heading takes 1/4 width on large screens */}
          <h2 className="text-4xl font-bold lg:w-1/4 xl:w-1/5 shrink-0">
            {primaryHeading}
          </h2>
          {/* Paragraph takes 3/4 width on large screens */}
          <p className="text-xl font-normal text-left  lg:text-justify lg:w-3/4 xl:w-4/5">
            {paragraph}
          </p>
        </div>

        {/* Responsive card grid: 1 column on mobile, 3 on lg screens, 4 on xl screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imgSrc={card.imgSrc}
              link={links[index]} // Map to corresponding link from links array
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;


