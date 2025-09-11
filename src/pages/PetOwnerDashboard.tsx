import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Calendar, 
  Utensils, 
  Scissors, 
  Stethoscope, 
  GraduationCap,
  ShoppingBag,
  Phone,
  MessageSquare,
  Info,
  Play,
  Book,
  Award
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface PetProfile {
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  microchipId: string;
  lastVetVisit: string;
  nextVaccination: string;
  medications: string;
}

const PetOwnerDashboard: React.FC = () => {
  const { user } = useUser();
  const [petProfile, setPetProfile] = useState<PetProfile | null>(null);

  useEffect(() => {
    // Helper to generate a unique microchip ID
    const generateMicrochipId = () => {
      const timestamp = Date.now().toString();
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `MC${timestamp.slice(-6)}${random}`;
    };

    const defaultExtras = {
      lastVetVisit: 'Feb 15, 2025',
      nextVaccination: 'May 15, 2025',
      medications: 'None currently',
    };

    // Load pet profile from localStorage or create a default one
    const savedProfile = localStorage.getItem('petProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      // Merge defaults for any missing fields
      const merged: PetProfile = {
        name: parsed.name ?? (user.petName || 'Your Pet'),
        species: parsed.species ?? 'Dog',
        breed: parsed.breed ?? 'Unknown',
        age: parsed.age ?? 'Unknown',
        weight: parsed.weight ?? 'Unknown',
        microchipId: parsed.microchipId ?? generateMicrochipId(),
        lastVetVisit: parsed.lastVetVisit ?? defaultExtras.lastVetVisit,
        nextVaccination: parsed.nextVaccination ?? defaultExtras.nextVaccination,
        medications: parsed.medications ?? defaultExtras.medications,
      };
      // Persist merged profile back to storage to keep schema consistent
      localStorage.setItem('petProfile', JSON.stringify(merged));
      setPetProfile(merged);
    } else {
      const defaultNewProfile: PetProfile = {
        name: user.petName || 'Your Pet',
        species: 'Dog',
        breed: 'Unknown',
        age: 'Unknown',
        weight: 'Unknown',
        microchipId: generateMicrochipId(),
        lastVetVisit: defaultExtras.lastVetVisit,
        nextVaccination: defaultExtras.nextVaccination,
        medications: defaultExtras.medications,
      };
      localStorage.setItem('petProfile', JSON.stringify(defaultNewProfile));
      setPetProfile(defaultNewProfile);
    }
  }, []);

  // Ensure we always have a profile to display
  const displayProfile = petProfile || {
    name: user.petName || "Your Pet",
    species: "Dog",
    breed: "Unknown",
    age: "Unknown",
    weight: "Unknown",
    microchipId: "Pending",
    lastVetVisit: 'Feb 15, 2025',
    nextVaccination: 'May 15, 2025',
    medications: 'None currently',
  };

  const careCards = [
    {
      title: "Pet Profile",
      icon: Heart,
      description: "View your pet's complete information and health records",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      link: "#profile"
    },
    {
      title: "Feeding Guide",
      icon: Utensils,
      description: "Personalized feeding schedules and nutrition tips",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      link: "/pet-care#feeding"
    },
    {
      title: "Grooming Videos",
      icon: Scissors,
      description: "Step-by-step grooming tutorials and tips",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      link: "/pet-care#grooming"
    },
    {
      title: "Health Tips",
      icon: Stethoscope,
      description: "Expert health advice and wellness guides",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      link: "/pet-care#health"
    },
    {
      title: "Training Tips",
      icon: GraduationCap,
      description: "Professional training guides and behavioral tips",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      link: "/pet-care#training"
    },
    {
      title: "Pet Products",
      icon: ShoppingBag,
      description: "Curated selection of premium pet products",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      link: "/products"
    },
    {
      title: "Emergency Help",
      icon: Phone,
      description: "24/7 emergency contacts and veterinary assistance",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      link: "/emergency"
    },
    {
      title: "Feedback",
      icon: MessageSquare,
      description: "Share your experience and suggestions",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      link: "/feedback"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      
      {/* Welcome Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Welcome to FurEver, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{user.name}!</span>
            </h1>
            {displayProfile.name && (
              <p className="text-xl text-gray-600">
                Let's take great care of <span className="font-semibold text-purple-600">{displayProfile.name}</span> today
              </p>
            )}
          </motion.div>

          {/* Pet Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
            id="profile"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <Heart className="w-8 h-8 text-pink-500 mr-3" />
                {displayProfile.name}'s Profile
              </h2>
              <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold">
                Healthy & Happy
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Species", value: displayProfile.species, icon: Heart },
                { label: "Breed", value: displayProfile.breed, icon: Info },
                { label: "Age", value: displayProfile.age, icon: Calendar },
                { label: "Weight", value: displayProfile.weight, icon: Award },
                { label: "Last Vet Visit", value: displayProfile.lastVetVisit, icon: Stethoscope },
                { label: "Next Vaccination", value: displayProfile.nextVaccination, icon: Calendar },
                { label: "Microchip ID", value: displayProfile.microchipId, icon: Info },
                { label: "Current Medications", value: displayProfile.medications, icon: Stethoscope }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-2">
                    <item.icon className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">{item.label}</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Care Sections Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link
                  to={card.link}
                  className="block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 h-full"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  
                  <div className="mt-4 flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Explore</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Pet Care Journey</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Days Since Adoption", 
                  value: "1,247", 
                  icon: Heart, 
                  color: "from-pink-500 to-rose-500" 
                },
                { 
                  title: "Vet Visits This Year", 
                  value: "3", 
                  icon: Stethoscope, 
                  color: "from-blue-500 to-cyan-500" 
                },
                { 
                  title: "Training Sessions", 
                  value: "12", 
                  icon: GraduationCap, 
                  color: "from-green-500 to-emerald-500" 
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + (index * 0.1) }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.title}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PetOwnerDashboard;