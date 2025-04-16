import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingAnimation from './components/Loading';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Demo from './pages/Demo';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulating a 3-second loading
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingAnimation /> // Show loading animation while loading
      ) : (
        <div className="min-h-screen flex flex-col bg-slate-900 text-white">
          <Navbar /> {/* Navigation bar */}
          <main className="flex-grow">
            <Routes>
              {/* Routes for different pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/demo" element={<Demo />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;