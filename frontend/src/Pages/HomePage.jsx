import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../Api/api"; // Import your API functions

function HomePage() {
  // State to toggle between Login and Register forms
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State for handling errors
  const [error, setError] = useState(null);
  
  // Hook to redirect user after login/register
  const navigate = useNavigate();

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(null); // Clear errors when toggling
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      let response;
      if (isLoginView) {
        // --- LOGIN LOGIC ---
        if (!email || !password) {
          setError("Email and password are required.");
          return;
        }
        response = await login({ email, password });
      } else {
        // --- REGISTER LOGIC ---
        if (!name || !email || !password) {
          setError("Name, email, and password are required.");
          return;
        }
        response = await register({ name, email, password });
      }
      
      // **IMPORTANT: Save the token**
      localStorage.setItem('token', response.data.token);

      // Redirect to the main feed
      navigate('/feed');
      
    } catch (err) {
      // Set error message from the backend
      const message = err.response?.data?.message || (isLoginView ? "Login failed." : "Registration failed.");
      setError(message);
      console.error(err);
    }
  };

  return (
    <div>
      <main className="flex justify-center items-center py-10 px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            {isLoginView ? "Login" : "Register"}
          </h1>
          <p className="text-center text-gray-600">
            {isLoginView ? "Welcome back!" : "Create your account"}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* --- Name Field (Register only) --- */}
            {!isLoginView && (
              <div>
                <label 
                  htmlFor="name" 
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {/* --- Email Field --- */}
            <div>
              <label 
                htmlFor="email" 
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* --- Password Field --- */}
            <div>
              <label 
                htmlFor="password" 
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* --- Error Message --- */}
            {error && (
              <p className="text-sm text-center text-red-600">
                {error}
              </p>
            )}

            {/* --- Submit Button --- */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white font-medium bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoginView ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>

          {/* --- Toggle Link --- */}
          <p className="text-sm text-center text-gray-600">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
            <span
              onClick={toggleView}
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              {isLoginView ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default HomePage;