import React from 'react';
import { Link } from 'react-router-dom';

function ProfileCard({ userName, email }) {
    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            {/* Cover Photo Area */}
            <div className="h-20"></div>

            <div className="flex flex-col items-center p-6 -mt-16">
                {/* Profile Picture */}
                <div className="relative w-24 h-24 border-4 border-white rounded-full overflow-hidden shadow-md">
                    {/* SVG Placeholder Avatar */}
                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                </div>

                {/* User Info */}
                <div className="text-center mt-4">
                    <h2 className="text-xl font-bold text-gray-900">{userName}</h2>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>

                {/* View Profile Button */}
                <Link
                    to="/profile"
                    className="mt-6 w-full px-4 py-2 text-center font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                >
                    View Profile
                </Link>
            </div>

            {/* Optional Stats Section */}
            <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex justify-around text-center">
                    <div>
                        <span className="font-bold text-gray-800">150</span>
                        <p className="text-xs text-gray-500">Connections</p>
                    </div>
                    <div>
                        <span className="font-bold text-gray-800">72</span>
                        <p className="text-xs text-gray-500">Profile Views</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;