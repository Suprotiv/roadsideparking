import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [navbarClass, setNavbarClass] = useState({
    backgroundColor: 'bg-transparent',
    padding: 'py-3',
    textColor: 'text-white', // Start with white text for transparent background
  });

  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle scroll event
  const changeNavbarOnScroll = () => {
    if (window.scrollY >= 80) {
      setNavbarClass({
        backgroundColor: 'bg-white', // Change color after scrolling
        padding: '',
        textColor: 'text-black',
        zindex:'z-50' // Change text color on scroll
      });
    } else {
      setNavbarClass({
        backgroundColor: 'bg-transparent', // Default transparent color
        padding: 'py-3', // Reset padding for larger height
        textColor: 'text-white',
        zindex:'z-0' // Reset text color to white
      });
    }
  };

  useEffect(() => {
    // Add event listener for scroll
    window.addEventListener('scroll', changeNavbarOnScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', changeNavbarOnScroll);
    };
  }, []);

  return (
    <nav
      className={`${navbarClass.backgroundColor} ${navbarClass.zindex} animate-fadeIn fixed w-full  top-0 left-0 transition-all duration-300 ${navbarClass.padding}`}
    >
      <div className="max-w-screen-xl flex flex-wrap  items-center justify-between mx-auto ">
       <h1 className={`text-2xl font-semibold ${navbarClass.textColor}`}>Park Lane</h1>

        {/* Hamburger menu for mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } w-full md:flex md:w-auto md:order-1 transition-all duration-300`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:bg-transparent md:border-0 dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="#"
                className={`block py-2 px-3 text-md rounded ${navbarClass.textColor} md:hover:text-[#1fd1ff] md:p-0 md:dark:hover:text-[#1fd1ff] dark:${navbarClass.textColor} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-500`}
              >
                Home   
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block py-2 px-3 text-md  rounded ${navbarClass.textColor} md:hover:text-[#1fd1ff] md:p-0 md:dark:hover:text-[#1fd1ff] dark:${navbarClass.textColor} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-500`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block py-2 px-3 text-md  rounded ${navbarClass.textColor} md:hover:text-[#1fd1ff] md:p-0 md:dark:hover:text-[#1fd1ff] dark:${navbarClass.textColor} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-500`}
              >
                Services
              </a>
            </li>
            <Link to='/login'>
              <a
                href="#"
                className={`block py-2 px-3 text-md  rounded ${navbarClass.textColor} md:hover:text-[#1fd1ff] md:p-0 md:dark:hover:text-[#1fd1ff] dark:${navbarClass.textColor} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-500`}
              >
                logout
              </a>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
