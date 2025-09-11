import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import PetOwnerDashboard from './pages/PetOwnerDashboard';
import VeterinarianDashboard from './pages/VeterinarianDashboard';
import AnimalShelterDashboard from './pages/AnimalShelterDashboard';
import ContactPage from './pages/ContactPage';
import EmergencyPage from './pages/EmergencyPage';
import ProductShowcase from './pages/ProductShowcase';
import { UserProvider } from './context/UserContext';
import LoadingSpinner from './components/LoadingSpinner';
import PetCare from "./pages/PetCare";
import Adoption from "./pages/Adoption";
import AdoptionRequests from "./pages/AdoptionRequests";
import Wishlist from './pages/Wishlist';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/petcare" element={<PetCare />} />
              <Route path="/adoption" element={<Adoption />} />
              <Route path="/AdoptionRequests" element={<AdoptionRequests />} />
              <Route path="/pet-owner" element={<PetOwnerDashboard />} />
              <Route path="/veterinarian" element={<VeterinarianDashboard />} />
              <Route path="/animal-shelter" element={<AnimalShelterDashboard />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/products" element={<ProductShowcase />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </motion.div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;