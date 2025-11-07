import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, createPost, getUserProfile } from '../Api/api';
import PostCard from '../Components/postCard';
import ProfileCard from '../Components/profileCard';

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Fetch all posts and user data on component mount
  useEffect(() => {
    const loadFeedData = async () => {
      try {
        setLoading(true);
        // Check for token. If no token, redirect to home.
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        // Fetch user profile and posts in parallel
        const [userResponse, postsResponse] = await Promise.all([
          getUserProfile(),
          fetchPosts()
        ]);
        
        setUser(userResponse.data);
        setPosts(postsResponse.data); // These are sorted by new first (from backend)
        setError(null);
      } catch (err) {
        console.error("Failed to load feed:", err);
        setError("Failed to load feed. Please try logging in again.");
        // If token is invalid, auth middleware will send 401
        if (err.response && err.response.status === 401) {
           localStorage.removeItem('token');
           navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadFeedData();
  }, [navigate]);

  // Handler for creating a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return; // Prevent empty posts

    try {
      // API call to create the post
      await createPost({ content: newPostContent });
      
      // Clear the textarea
      setNewPostContent('');
      
      // Refresh the posts list to show the new one at the top
      const postsResponse = await fetchPosts();
      setPosts(postsResponse.data);
      
    } catch (err) {
      console.error("Failed to create post:", err);
      setError("Failed to create post. Please try again.");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div>
        <div className="text-center mt-10">Loading feed...</div>
      </div>
    );
  }

  return (
    <div>
      <main className="container mx-auto mt-5 p-4 max-w-6xl">
        {/* Show error message if any */}
        {error && (
          <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {/* Main Content Grid (Responsive) */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* Left Column (Profile) - Stacks on top on mobile */}
            <div className="md:col-span-1 lg:col-span-1 h-fit md:sticky md:top-20">
              <ProfileCard 
                userName={user.name} 
                // Add any other props your ProfileCard needs
              />
            </div>
            
            {/* Middle Column (Feed) */}
            <div className="md:col-span-2 lg:col-span-3">
              
              {/* Create Post Form */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <form onSubmit={handleCreatePost}>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder={`What's on your mind, ${user.name}?`}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-full mt-2 px-4 py-2 text-white font-medium bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Post
                  </button>
                </form>
              </div>

              {/* Posts List */}
              <div className="space-y-6">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard
                      key={post._id}
                      userName={post.user.name} // From backend populate
                      content={post.content}
                      timeStamp={post.createdAt}
                      // imageUrl is handled by PostCard if it exists
                    />
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No posts yet. Be the first to post!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default FeedPage;