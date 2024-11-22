import React from 'react';
import { MoveRight } from 'lucide-react';


const AboutSection = ({ backgroundImageUrl }) => {
 
  const navigationItems = [
    { title: 'Leadership', href: '#leadership' },
    { title: 'Our Brand', href: '#brand' },
    { title: 'Corporate Sustainability', href: '#sustainability' },
    { title: 'Diversity, Equity, and Inclusion', href: '#dei' },
    { title: 'Recognition', href: '#recognition' },
    { title: 'Customer Speak', href: '#customers' },
  ];
  

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
    <div className="absolute left-0 bg-black/70 h-full w-1/2 ">
      <div className="h-full w-full p-12 mx-24">
        <div className="space-y-8">
          <h2 className="text-4xl  text-white mb-8">
            More about us.
          </h2>
          <nav className="space-y-4 w-2/3">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between border-b-4 border-gray-400 py-4 text-gray-200 hover:text-white transition-colors duration-300"
              >
                <span className="text-2xl">{item.title}</span>
                <MoveRight className="w-10 h-10 text-gray-200 transform group-hover:translate-x-2 transition-transform duration-300" />
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
