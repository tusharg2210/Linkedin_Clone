import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/HomePage.jsx'
import Header from './Components/common/header.jsx';
import Footer from './Components/common/footer.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import './App.css'
import FeedPage from './Pages/FeedPage.jsx';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
