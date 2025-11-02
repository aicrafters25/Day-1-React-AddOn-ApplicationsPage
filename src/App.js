import React from 'react';
import './assets/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Status from './pages/Status';
import Applications from './pages/Applications';
import Content from './pages/Content';



function App() {
  return (
    <Router>
      <Header />
      <nav style={{ margin: '20px' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/services">Services</Link> |{' '}
        <Link to="/status">Status</Link> |{' '}
        <Link to="/applications">Applications</Link> |{' '}
        <Link to="/content">Content</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/status" element={<Status />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/content" element={<Content />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
