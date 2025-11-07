# 💼 LinkedIn Clone

This is a **full-stack social media application** built to replicate some of the core functionalities of **LinkedIn**.  

It features user authentication, a post feed, user profiles, and the ability to create posts.


The project is built on the **MERN stack** (MongoDB, Express, React, Node.js) and is split into two main directories: `frontend` and `backend`.

---

## 🚀 Features

- **User Authentication:** Users can register for a new account and log in.
- **Persistent Login:** Uses JSON Web Tokens (JWT) for secure authentication and stores the token in `localStorage`.
- **Post Feed:** A central feed page (`/feed`) displays all posts from all users, sorted by newest first.
- **Create Posts:** Logged-in users can create new text-based posts.
- **User Profiles:** A dedicated profile page (`/profile`) shows user details and their posts.
- **Responsive UI:** Built with Tailwind CSS for a responsive, mobile-first design, including a dark theme.

---

## 🧩 Tech Stack

### 🖥️ Frontend (Vite + React)
- **Framework:** React  
- **Build Tool:** Vite  
- **Styling:** Tailwind CSS  
- **Routing:** react-router-dom  
- **API Calls:** axios  
- **Components:** `src/Components`, `src/Pages`  

### ⚙️ Backend (Node.js + Express)
- **Framework:** Node.js, Express  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JSON Web Token (JWT)  
- **Password Hashing:** bcryptjs  
- **Middleware:** cors  

---

## 🛠️ Setup & Installation

To run this project, you need to start both the **backend** and **frontend** servers.

### Backend Setup

```bash
cd backend
npm install
```

### Create a (`/.env`) file in the backend root and add the following:
```
# MongoDB connection string
MONGO_ATLAS_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/

# Secret key for JWT
JWT_SECRET=your_jwt_secret_string_here

# Backend port
PORT=8000
```

### Run the backend server:
```
node index.js
```

### Backend runs on:
```
http://localhost:8000
```

### Frontend Setup
```
cd frontend
npm install
npm run dev
```

### Frontend runs on:
```
http://localhost:5173
(or another port if 5173 is busy)
 ```

### 🔗 API Endpoints

- All backend routes are prefixed with /api.

## 🧠 Summary

- Built using the MERN stack

- Implements JWT authentication

- Responsive Tailwind CSS UI

- Follows clean and modular frontend-backend separation
