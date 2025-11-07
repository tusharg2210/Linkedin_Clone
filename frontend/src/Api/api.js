import axios from 'axios';

// Create an 'instance' of axios
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL // Your backend server's base URL
});

// 2. Add an 'interceptor' to add the auth token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 3. Define your API functions
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);

export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const getUserProfile = () => API.get('/users/profile');
