import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, fetchPosts } from '../Api/api';
import PostCard from '../Components/postCard';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        // Fetch user profile and all posts
        const userResponse = await getUserProfile();
        const allPostsResponse = await fetchPosts();
        
        const currentUser = userResponse.data;
        setUser(currentUser);

        // Filter all posts to find only this user's posts
        // An ideal API would have a dedicated endpoint like /api/users/me/posts
        const posts = allPostsResponse.data.filter(
          (post) => post.user._id === currentUser._id
        );
        
        setUserPosts(posts);
        setError(null);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile. Please try logging in again.");
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadProfileData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        // Refresh posts list after deletion
        setUserPosts(userPosts.filter(post => post._id !== postId));
      } catch (err) {
        console.error("Failed to delete post:", err);
        setError("Failed to delete post. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div>
        <div className="text-center mt-10">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-row container mx-auto mt-5 p-4 max-w-4xl">
        {error && (
          <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {user && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-md text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2 text-white font-medium bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* User's Posts */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Posts</h2>
          <div className="space-y-6">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard
                  key={post._id}
                  userName={post.user.name}
                  content={post.content}
                  timeStamp={post.createdAt}
                  // Pass the delete handler to PostCard
                  onDelete={() => handleDeletePost(post._id)}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-md">
                You haven't posted anything yet.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;