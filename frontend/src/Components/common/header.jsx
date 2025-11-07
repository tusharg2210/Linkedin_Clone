import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]); // Re-run if navigation changes

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className='bg-gray-900 text-white shadow-md'>
      <div className='container mx-auto max-w-6xl p-4 flex flex-col md:flex-row md:justify-between md:items-center'>
        
        {/* Logo/Brand Name */}
        <div>
          <Link to={isLoggedIn ? '/feed' : '/'} className='text-2xl font-bold font-serif hover:text-gray-300'>
            LinkedIn Clone
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className='mt-4 md:mt-0'>
          {isLoggedIn ? (
            // --- Logged In Links ---
            <ul className='flex flex-col items-start md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8'>
              <li>
                <Link to="/feed" className='flex items-center space-x-2 hover:text-gray-300'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                  </svg>
                  <span className='font-medium'>Feed</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className='flex items-center space-x-2 hover:text-gray-300'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                  </svg>
                  <span className='font-medium'>Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className='flex items-center space-x-2 font-medium text-red-400 hover:text-red-300'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          ) : (
            // --- Logged Out Links ---
            <ul className='flex items-center space-x-6'>
              <li>
                <Link to="/" className='font-medium px-4 py-2 rounded-md hover:bg-gray-700'>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/" className='font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700'>
                  Register
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;