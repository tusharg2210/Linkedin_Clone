import React from 'react';

function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-10">
      <div className="container mx-auto max-w-6xl p-6 text-center text-gray-500">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} LinkedIn Clone. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          This is a clone project created for demonstration purposes.
        </p>
      </div>
    </footer>
  );
}

export default Footer;