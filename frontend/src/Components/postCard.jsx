import React from "react";

function PostCard({ userName, content, timeStamp }) {
  return (
    <div>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
            <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{userName}</div>
                    <p className="mt-2 text-gray-500">{content}</p>
                    <div className="mt-4 text-gray-400 text-xs">{new Date(timeStamp).toLocaleString()}</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default PostCard;