import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Heart, 
  Users, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Filter,
  Search,
  Star,
  Clock,
  Award,
  Activity
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import adoptionData from '../data/adoptablePets.json';

interface AdoptablePet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  image: string;
  description: string;
  personality: string[];
  medicalInfo: string;
  location: string;
}

const AnimalShelterDashboard: React.FC = () => {
  const { user } = useUser();
  const [pets, setPets] = useState<AdoptablePet[]>([]);
  const [filteredPets, setFilteredPets] = useState<AdoptablePet[]>([]);
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const shelterProfile = {
    name: "Pet City Animal Shelter",
    established: "2015",
    totalRescued: "2,847",
    currentPets: "47",
    successfulAdoptions: "2,156",
    volunteers: "89",
    address: "123 Shelter Lane, Pet City, PC 12345",
    phone: "(555) 123-PETS",
    email: "adopt@petcityshelter.org"
  };

  useEffect(() => {
    setPets(adoptionData.adoptablePets);
    setFilteredPets(adoptionData.adoptablePets);
  }, []);

  useEffect(() => {
    let filtered = pets.filter(pet => {
      const matchesType = selectedType === 'All' || pet.type === selectedType;
      const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
    setFilteredPets(filtered);
  }, [selectedType, searchTerm, pets]);

  const petTypes = ['All', ...Array.from(new Set(pets.map(pet => pet.type)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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
              Welcome to <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Pet City Shelter!</span>
            </h1>
            <p className="text-xl text-gray-600">
              Connecting loving pets with forever homes - managed by {user.name || 'our team'}
            </p>
          </motion.div>

          {/* Shelter Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <Home className="w-8 h-8 text-green-500 mr-3" />
                Shelter Information
              </h2>
              <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold">
                Active Shelter
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Established", value: shelterProfile.established, icon: Calendar },
                { label: "Total Rescued", value: shelterProfile.totalRescued, icon: Heart },
                { label: "Current Pets", value: shelterProfile.currentPets, icon: Users },
                { label: "Successful Adoptions", value: shelterProfile.successfulAdoptions, icon: Award },
                { label: "Active Volunteers", value: shelterProfile.volunteers, icon: Activity },
                { label: "Phone", value: shelterProfile.phone, icon: Phone },
                { label: "Email", value: shelterProfile.email, icon: Mail },
                { label: "Address", value: shelterProfile.address, icon: MapPin }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-2">
                    <item.icon className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">{item.label}</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Adoptable Pets Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Heart className="w-6 h-6 text-green-500 mr-3" />
              Adoptable Pets
            </h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search pets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <div className="flex space-x-2">
                  {petTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedType === type
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pet Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPets.map((pet, index) => (
                <motion.div
                  key={pet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
                      {pet.type}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                      <span className="text-sm text-gray-600">{pet.gender}</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Breed:</span> {pet.breed}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Age:</span> {pet.age}
                      </p>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {pet.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {pet.personality.slice(0, 3).map((trait, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Adopt Me</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredPets.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No pets found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </motion.div>

          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-3" />
              Success Stories
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adoptionData.successStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100"
                >
                  <img
                    src={story.image}
                    alt={story.petName}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{story.petName}</h3>
                  <p className="text-sm text-gray-600 mb-2">Adopted by {story.adopterName}</p>
                  <p className="text-gray-700 text-sm">{story.story}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="w-6 h-6 text-blue-500 mr-3" />
              Upcoming Events
            </h2>

            <div className="space-y-4">
              {adoptionData.events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  </div>
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

export default AnimalShelterDashboard;