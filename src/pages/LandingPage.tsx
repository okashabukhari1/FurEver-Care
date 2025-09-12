import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Stethoscope, Home, ArrowRight, Sparkles, Shield, Clock, Globe, AlertCircle, CheckCircle } from 'lucide-react';
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
  ownerNumber: string;
  ownerEmail: string;
}


const LandingPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState<'pet-owner' | 'veterinarian' | 'animal-shelter' | ''>('');
  const [petName, setPetName] = useState('');
  const [petProfile, setPetProfile] = useState<PetProfile>({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    microchipId: '',
    ownerNumber: '',
    ownerEmail: ''
  });
  const [formStep, setFormStep] = useState<'user' | 'pet-profile'>('user');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Generate unique microchip ID
  const generateMicrochipId = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `MC${timestamp.slice(-6)}${random}`;
  };

  // Name validation function
  const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
    if (!nameRegex.test(name)) {
      return "Name can only contain letters, spaces, apostrophes, and hyphens. Numbers and special characters are not allowed.";
    }
    return "";
  };

  // Pet name validation function
  const validatePetName = (name: string) => {
    const nameRegex = /^[A-Za-z\s'-]{1,50}$/;
    if (!nameRegex.test(name)) {
      return "Pet name can only contain letters, spaces, apostrophes, and hyphens. Numbers and special characters are not allowed.";
    }
    return "";
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate user name
    const nameError = validateName(userName);
    if (nameError) {
      newErrors.userName = nameError;
    }

    if (userType === 'pet-owner') {
      const petNameError = validatePetName(petName);
      if (petNameError) {
        newErrors.petName = petNameError;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (userType === 'pet-owner') {
      // Generate microchip ID and move to pet profile form
      setPetProfile(prev => ({
        ...prev,
        name: petName,
        microchipId: generateMicrochipId()
      }));
      setFormStep('pet-profile');
    } else {
      // For non-pet owners, proceed directly
      const newUser = { name: userName, userType, petName: '' };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigateToDashboard();
    }
  };


  const handlePetProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate fields
    if (!petProfile.species.trim()) newErrors.species = 'Species is required';

    if (!petProfile.breed.trim()) {
      newErrors.breed = 'Breed is required';
    } else {
      const breedRegex = /^[A-Za-z\s'\-]{2,60}$/;
      if (!breedRegex.test(petProfile.breed.trim())) {
        newErrors.breed = 'Breed can only contain letters, spaces, apostrophes, and hyphens.';
      }
    }

    if (!petProfile.age.trim()) {
      newErrors.age = 'Age is required';
    } else {
      const ageRegex = /^\d{1,2}(?:\.\d)?\s*(?:years?|yrs?|months?|mos?|weeks?|wks?|days?|d)?$/i;
      if (!ageRegex.test(petProfile.age.trim())) {
        newErrors.age = 'Enter age like "2 years", "6 months", or just a number.';
      }
    }

    if (!petProfile.weight.trim()) {
      newErrors.weight = 'Weight is required';
    } else {
      const weightRegex = /^\d{1,3}(?:\.\d)?\s*(?:kg|kgs|kilograms|lb|lbs|pounds)?$/i;
      if (!weightRegex.test(petProfile.weight.trim())) {
        newErrors.weight = 'Enter weight like "12 kg" or "25 lbs".';
      }
    }

    if (!petProfile.ownerEmail.trim()) {
      newErrors.ownerEmail = "Owner email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(petProfile.ownerEmail.trim())) {
        newErrors.ownerEmail = "Enter a valid email address";
      }
    }

    if (!petProfile.ownerNumber.trim()) {
      newErrors.ownerNumber = "Owner number is required";
    } else {
      const numberRegex = /^[0-9]{10,15}$/;
      if (!numberRegex.test(petProfile.ownerNumber.trim())) {
        newErrors.ownerNumber = "Enter a valid phone number (10–15 digits)";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Save pet profile to localStorage
    localStorage.setItem('petProfile', JSON.stringify(petProfile));

    // Save user after validation passes
    const newUser = { name: userName, userType, petName: petProfile.name };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    navigateToDashboard();
  };


  const navigateToDashboard = () => {
    const type = userType || user.userType;
    switch (type) {
      case 'pet-owner':
        navigate('/pet-owner');
        break;
      case 'veterinarian':
        navigate('/veterinarian');
        break;
      case 'animal-shelter':
        navigate('/animal-shelter');
        break;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'userName') {
      setUserName(value.replace(/[^A-Za-z\s'\-]/g, ''));
    } else if (field === 'petName') {
      setPetName(value.replace(/[^A-Za-z\s'\-]/g, ''));
    } else if (field.startsWith('petProfile.')) {
      const petField = field.split('.')[1];
      setPetProfile(prev => ({
        ...prev,
        [petField]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const userTypeOptions = [
    {
      id: 'pet-owner',
      title: 'Pet Owner',
      icon: Heart,
      description: 'Manage your furry family members with love and care',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50 border-pink-200',
      textColor: 'text-pink-600'
    },
    {
      id: 'veterinarian',
      title: 'Veterinarian',
      icon: Stethoscope,
      description: 'Professional veterinary services and pet health management',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      id: 'animal-shelter',
      title: 'Animal Shelter',
      icon: Home,
      description: 'Connect loving pets with forever homes',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar showUserInfo={true} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero_bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Welcome to the future of pet care</span>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    FurEver Care
                  </span>
                </h1>

                <p className="text-2xl lg:text-3xl text-white font-light">
                  They Deserve Forever Love
                </p>

                <p className="text-lg text-white leading-relaxed max-w-2xl">
                  Join thousands of pet lovers who trust FurEver Care for comprehensive pet management,
                  expert veterinary services, and creating forever bonds between pets and families.
                </p>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { icon: Heart, value: '50K+', label: 'Happy Pets' },
                  { icon: Users, value: '25K+', label: 'Pet Families' },
                  { icon: Shield, value: '24/7', label: 'Care Support' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
                  <p className="text-white">Join our caring community today</p>
                  {user.userType && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={navigateToDashboard}
                        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 shadow hover:shadow-md transition-all"
                      >
                        Go to your Dashboard
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  )}
                </div>

                {formStep === 'user' ? (
                  <form onSubmit={handleUserSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => handleInputChange('userName', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-white bg-white/20 ${errors.userName
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                          }`}
                        placeholder="Enter your first name"
                        required
                      />
                      {errors.userName && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.userName}
                        </div>
                      )}
                    </div>

                    {/* User Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-4">
                        I am a...
                      </label>
                      <div className="space-y-3">
                        {userTypeOptions.map((option) => (
                          <motion.label
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`block cursor-pointer`}
                          >
                            <input
                              type="radio"
                              name="userType"
                              value={option.id}
                              checked={userType === option.id}
                              onChange={(e) => setUserType(e.target.value as any)}
                              className="sr-only"
                            />
                            <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${userType === option.id
                              ? `${option.bgColor} border-2 ${option.textColor} shadow-lg scale-105`
                              : 'bg-white/40 border-gray-200 hover:border-gray-300'
                              }`}>
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${option.color}`}>
                                  <option.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-800">{option.title}</div>
                                  <div className="text-sm text-gray-600">{option.description}</div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 ${userType === option.id
                                  ? `${option.textColor} border-current`
                                  : 'border-gray-300'
                                  } flex items-center justify-center`}>
                                  {userType === option.id && (
                                    <div className={`w-3 h-3 rounded-full bg-current`}></div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Pet Name (for pet owners) */}
                    {userType === 'pet-owner' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-sm font-medium text-white mb-2">
                          Pet's Name
                        </label>
                        <input
                          type="text"
                          value={petName}
                          onChange={(e) => handleInputChange('petName', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border transition-all text-white duration-300 bg-white/20 ${errors.petName
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                            }`}
                          placeholder="Enter your pet's name"
                          required
                        />
                        {errors.petName && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.petName}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={!userName || !userType || (userType === 'pet-owner' && !petName)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <span>{userType === 'pet-owner' ? 'Create Pet Profile' : 'Enter FurEver Care'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Pet Profile</h3>
                      <p className="text-white">Tell us about {petProfile.name}</p>
                      <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium inline-flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Microchip ID: {petProfile.microchipId}
                      </div>
                    </div>

                    <form onSubmit={handlePetProfileSubmit} className="space-y-6">
                      {/* Species */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-white mb-2">
                          Species
                        </label>
                        <select
                          value={petProfile.species}
                          onChange={(e) => handleInputChange('petProfile.species', e.target.value)}
                          className={`w-full appearance-none px-4 py-3 rounded-xl border text-white bg-white/20 pr-10 transition-all duration-300 ${errors.species
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                            }`}
                          required
                        >
                          <option className="text-black" value="">Select species</option>
                          <option className="text-black" value="Dog">Dog</option>
                          <option className="text-black" value="Cat">Cat</option>
                          <option className="text-black" value="Bird">Bird</option>
                          <option className="text-black" value="Fish">Fish</option>
                          <option className="text-black" value="Rabbit">Rabbit</option>
                          <option className="text-black" value="Hamster">Hamster</option>
                          <option className="text-black" value="Other">Other</option>
                        </select>
                        {/* Custom arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>

                        {errors.species && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.species}
                          </div>
                        )}
                      </div>


                      {/* Breed */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Breed
                        </label>
                        <input
                          type="text"
                          value={petProfile.breed}
                          onChange={(e) => handleInputChange('petProfile.breed', e.target.value.replace(/[^A-Za-z\s'\-]/g, ''))}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-white bg-white/20 ${errors.breed
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                            }`}
                          placeholder="e.g., Golden Retriever, Persian, etc."
                          pattern="^[A-Za-z\s'-]{2,60}$"
                          title="Breed can only contain letters, spaces, apostrophes, and hyphens."
                          required
                        />
                        {errors.breed && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.breed}
                          </div>
                        )}
                      </div>

                      {/* Age */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Age
                        </label>
                        <input
                          type="text"
                          value={petProfile.age}
                          onChange={(e) => handleInputChange('petProfile.age', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-white bg-white/20 ${errors.age
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                            }`}
                          placeholder="e.g., 2 years, 6 months, etc."
                          required
                        />
                        {errors.age && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.age}
                          </div>
                        )}
                      </div>

                      {/* Weight */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Weight
                        </label>
                        <input
                          type="text"
                          value={petProfile.weight}
                          onChange={(e) => handleInputChange('petProfile.weight', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-30 0 text-white bg-white/20 ${errors.weight
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                            }`}
                          placeholder="e.g., 25 lbs, 12 kg, etc."
                          required
                        />
                        {errors.weight && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.weight}
                          </div>
                        )}
                      </div>

                      {/* Owner Email */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Owner Email
                        </label>
                        <input
                          type="email"
                          value={petProfile.ownerEmail}
                          onChange={(e) => handleInputChange("petProfile.ownerEmail", e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border text-white bg-white/20 ${errors.ownerEmail
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                            }`}
                          placeholder="e.g., owner@example.com"
                          required
                        />
                        {errors.ownerEmail && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.ownerEmail}
                          </div>
                        )}
                      </div>

                      {/* Owner Number */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Owner Number
                        </label>
                        <input
                          type="tel"
                          value={petProfile.ownerNumber}
                          onChange={(e) => handleInputChange("petProfile.ownerNumber", e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border text-white bg-white/20 ${errors.ownerNumber
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                            }`}
                          placeholder="e.g., 03001234567"
                          required
                        />
                        {errors.ownerNumber && (
                          <div className="flex items-center mt-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.ownerNumber}
                          </div>
                        )}
                      </div>


                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <span>Complete Profile & Enter FurEver Care</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>

                      {/* Back Button */}
                      <button
                        type="button"
                        onClick={() => setFormStep('user')}
                        className="w-full text-white hover:text-purple-600 font-medium py-2 transition-colors duration-300"
                      >
                        ← Back to User Info
                      </button>
                    </form>
                  </motion.div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20"></div>
            </motion.div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">FurEver Care?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a platform - we're your partner in providing the best care for your beloved pets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Comprehensive Care',
                description: 'From feeding schedules to health monitoring, everything in one place.',
                color: 'from-pink-500 to-rose-500'
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Round-the-clock emergency support and veterinary assistance.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Users,
                title: 'Expert Community',
                description: 'Connect with veterinarians, trainers, and fellow pet lovers.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Serving pet families worldwide with localized care tips.',
                color: 'from-purple-500 to-indigo-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How To Use Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              How to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Use FurEver Care</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting started is easy! Just follow these simple steps to begin your journey with us.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Enter your name, choose your role (Pet Owner, Veterinarian, or Animal Shelter) and create your account.",
                icon: Users,
              },
              {
                step: "2",
                title: "Create Profile",
                description: "If you’re a Pet Owner, add details about your pet including species, breed, and health info.",
                icon: Heart,
              },
              {
                step: "3",
                title: "Explore Dashboard",
                description: "Access your personalized dashboard for managing pets, appointments, and connections.",
                icon: Stethoscope,
              },
              {
                step: "4",
                title: "Connect & Care",
                description: "Join the community, get 24/7 veterinary support, and give your pets the care they deserve.",
                icon: Globe,
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg mb-4">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Here are answers to the most common questions about using FurEver Care.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                q: "Is FurEver Care free to use?",
                a: "Yes! Creating an account and managing your pet’s basic profile is completely free. Premium features may be added later for advanced services."
              },
              {
                q: "Can I add more than one pet?",
                a: "Absolutely. You can create multiple pet profiles under the same account, making it easy to manage your entire furry family."
              },
              {
                q: "Do veterinarians and shelters need a different account?",
                a: "Yes, when signing up you’ll choose your role (Pet Owner, Veterinarian, or Animal Shelter). Each role has a customized dashboard."
              },
              {
                q: "Can I update my pet’s details later?",
                a: "Of course! You can edit your pet’s profile anytime, update health records, and keep everything up to date."
              },
              {
                q: "Is my data safe?",
                a: "Yes, your data is stored securely and never shared without your permission. We use encryption and industry best practices to protect your information."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              What <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">People Said</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our community of pet owners, veterinarians, and shelters who use FurEver Care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Pet Owner",
                feedback:
                  "FurEver Care has been a lifesaver! I can easily track my dog's health and connect with vets anytime.",
                img: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Dr. Michael Lee",
                role: "Veterinarian",
                feedback:
                  "This platform makes it so easy to provide care remotely. I love being able to help more pet parents.",
                img: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Emma Davis",
                role: "Animal Shelter Manager",
                feedback:
                  "Managing pets and adoptions is much simpler now. FurEver Care has made our work smoother and faster.",
                img: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
                    <p className="text-sm text-gray-500">{person.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">“{person.feedback}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;