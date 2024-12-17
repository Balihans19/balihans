import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { desktopContent } from './DesktopContent';
import { mobileContent } from './MobileContent';
import '../../App.css';

/**
 * Desktop Navbar Component
 * Renders the navigation menu for desktop view
 * @param {Object[]} navItems - Array of navigation items
 * @param {number|null} activeDropdown - Index of the currently active dropdown
 * @param {Function} setActiveDropdown - Function to set the active dropdown
 */


const DesktopNavbar = ({ navItems, activeDropdown, setActiveDropdown }) => {
  return (
    <nav 
      className="hidden lg:block bg-[#191c20] sticky top-0 z-50"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Main container with max-width and auto margins */}
      <div className="max-w-full mx-auto px-4 py-4 md:px-20 xl:px-36">
        <div className="flex items-center justify-between h-20">
          {/* Logo section */}
          <NavLink to="/" className="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dnijlfi48/image/upload/v1734432935/Balihans_-_logo_off-white_m6wkoi.webp"
              alt="Balihans Logo"
              className="h-[5vh] xl:h-[6vh]"
            />
          </NavLink>

          {/* Navigation Items */}
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setActiveDropdown(index)}
              >
                <NavLink
                  to={`/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) =>
                    `text-[#FAF9F6] text-base  relative after:content-[''] after:absolute after:w-full after:h-px after:bottom-[-5px] after:left-0 after:transition-transform after:duration-300 ${
                      isActive
                        ? 'after:bg-white after:scale-x-100'
                        : 'after:bg-black after:scale-x-0 hover:after:scale-x-100'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dropdown Content */}
      
       {activeDropdown !== null && (
        <div className="absolute top-full left-0 right-0 bg-[#191c20] z-10 ">
          <hr className="border border-[#191c20]" />
          {navItems[activeDropdown].content}
        </div>
      )}
    </nav>
  );
};




/**
 * Mobile Navigation Item Component
 * Renders a single navigation item in the mobile view
 * @param {Object} item - Navigation item data
 * @param {string} expandedItem - Name of the currently expanded item
 * @param {Function} setExpandedItem - Function to set the expanded item
 * @param {Function} setActiveSubmenu - Function to set the active submenu
 * @param {Function} closeMenu - Function to close the mobile menu
 */


const MobileNavItem = ({ item, expandedItem, setExpandedItem, setActiveSubmenu, closeMenu }) => {
  const isExpanded = expandedItem === item.name;
  const navigate = useNavigate();

  const handleItemClick = useCallback(() => {
    if (item.link) {
      navigate(item.link);
      closeMenu();
    } else if (item.mobileContent) {
      setExpandedItem(isExpanded ? null : item.name);
    }
  }, [item, isExpanded, navigate, closeMenu, setExpandedItem]);

  const handleSubItemClick = useCallback((subItem) => {
    if (subItem.link) {
      navigate(subItem.link);
      closeMenu();
    } else if (subItem.subContent) {
      setActiveSubmenu({ parent: item.name, ...subItem });
    }
  }, [navigate, closeMenu, setActiveSubmenu, item.name]);

  return (
    <div className="border-t border-gray-700">
      <div
        className="py-4 px-6 flex justify-between items-center cursor-pointer bg-[#191c20]"
        onClick={handleItemClick}
      >
        <span className=" text-white">{item.name}</span>
        {item.mobileContent && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setExpandedItem(isExpanded ? null : item.name);
            }}
          >
            {isExpanded ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
          </button>
        )}
      </div>

      {isExpanded && item.mobileContent && (
        <div className="bg-[#23272b]">
          {item.mobileContent.map((subItem, index) => (
            <div
              key={index}
              className="py-3 px-6 cursor-pointer flex justify-between items-center text-white"
              onClick={() => handleSubItemClick(subItem)}
            >
              {subItem.name}
              {subItem.subContent && <ChevronDown size={20} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


/**
 * Mobile Submenu Component
 * Renders the submenu for mobile view
 * @param {Object} submenu - Submenu data
 * @param {Function} setActiveSubmenu - Function to set the active submenu
 * @param {Function} closeMenu - Function to close the mobile menu
 */


const MobileSubmenu = ({ submenu, setActiveSubmenu, closeMenu }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#23272b] text-white">
      <div
        className="py-4 px-6 flex items-center cursor-pointer"
        onClick={() => setActiveSubmenu(null)}
      >
        <ChevronLeft size={20} className="mr-2" />
        <span className="">Back</span>
      </div>
      {submenu.subContent &&
        submenu.subContent.map((item, index) => (
          <div
            key={index}
            className="py-4 px-6 cursor-pointer"
            onClick={() => {
              if (item.link) {
                navigate(item.link);
                closeMenu();
              }
            }}
          >
            {item}
          </div>
        ))}
    </div>
  );
};



/**
 * Mobile Navbar Component
 * Renders the navigation menu for mobile view
 * @param {Object[]} navItems - Array of navigation items
 */



const MobileNavbar = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setExpandedItem(null);
    setActiveSubmenu(null);
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed inset-x-0 top-0 z-50 bg-[#191c20] flex justify-between items-center py-4 px-6  border-b border-gray-600 lg:hidden">
        <Link to="/" onClick={closeMenu}>
          <img
            src="https://res.cloudinary.com/dnijlfi48/image/upload/v1734432935/Balihans_-_logo_off-white_m6wkoi.webp"
            alt="Tech Mahindra"
            className="h-12 "
          />
        </Link>
        <div className="flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} color='white' /> : <Menu size={24} color='white' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#191c20] text-white z-40 mt-20 overflow-y-auto lg:hidden">
          {!activeSubmenu ? (
            navItems.map((item, index) => (
              <MobileNavItem
                key={index}
                item={item}
                expandedItem={expandedItem}
                setExpandedItem={setExpandedItem}
                setActiveSubmenu={setActiveSubmenu}
                closeMenu={closeMenu}
              />
            ))
          ) : (
            <MobileSubmenu
              submenu={activeSubmenu}
              setActiveSubmenu={setActiveSubmenu}
              closeMenu={closeMenu}
            />
          )}
        </div>
      )}
    </>
  );
};

/**
 * Main Navbar Component
 * Renders either the desktop or mobile navbar based on screen size
 */


const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = isMobile ? mobileContent : desktopContent;

  return isMobile ? (
    <MobileNavbar navItems={navItems} />
  ) : (
    <DesktopNavbar 
      navItems={navItems}
      activeDropdown={activeDropdown}
      setActiveDropdown={setActiveDropdown}
    />
  );
};

export default Navbar;


