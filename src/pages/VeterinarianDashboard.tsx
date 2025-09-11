import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Heart,
  Award,
  Users,
  Activity
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VeterinarianDashboard: React.FC = () => {
  const { user } = useUser();

  const vetProfile = {
    name: user.name || "Dr. Smith",
    specialization: "Small Animal Medicine",
    experience: "8 years",
    license: "VET-2024-001",
    phone: "(555) 123-4567",
    email: user.name
      ? `${user.name.toLowerCase().replace(/\s+/g, '.')}@clinic.com`
      : "dr.smith@clinic.com",
    address: "123 Veterinary Clinic, Pet City",
    rating: 4.9,
    totalPatients: 1247
  };

  const appointments = [
    {
      id: 1,
      time: "9:00 AM",
      petName: "Luna",
      ownerName: "Sarah Johnson",
      type: "Routine Checkup",
      status: "confirmed"
    },
    {
      id: 2,
      time: "10:30 AM",
      petName: "Max",
      ownerName: "Mike Davis",
      type: "Vaccination",
      status: "confirmed"
    },
    {
      id: 3,
      time: "2:00 PM",
      petName: "Bella",
      ownerName: "Emma Wilson",
      type: "Dental Cleaning",
      status: "pending"
    },
    {
      id: 4,
      time: "3:30 PM",
      petName: "Charlie",
      ownerName: "Tom Brown",
      type: "Surgery Follow-up",
      status: "confirmed"
    }
  ];

  const medicalCases = [
    {
      id: 1,
      petName: "Rocky",
      species: "Dog",
      breed: "Golden Retriever",
      age: "5 years",
      condition: "Hip Dysplasia",
      treatment: "Physical therapy and pain management",
      lastVisit: "Feb 20, 2025",
      status: "Ongoing"
    },
    {
      id: 2,
      petName: "Whiskers",
      species: "Cat",
      breed: "Persian",
      age: "3 years",
      condition: "Respiratory Infection",
      treatment: "Antibiotics and supportive care",
      lastVisit: "Feb 18, 2025",
      status: "Recovered"
    },
    {
      id: 3,
      petName: "Buddy",
      species: "Dog",
      breed: "Labrador Mix",
      age: "2 years",
      condition: "Skin Allergies",
      treatment: "Hypoallergenic diet and medication",
      lastVisit: "Feb 15, 2025",
      status: "Improving"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
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
              Welcome, <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Dr. {user.name || 'Smith'}!</span>
            </h1>
            <p className="text-xl text-gray-600">
              Your veterinary dashboard for managing appointments and patient care
            </p>
          </motion.div>

          {/* Veterinarian Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <Stethoscope className="w-8 h-8 text-blue-500 mr-3" />
                Professional Profile
              </h2>
              <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold">
                Active Practice
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Specialization", value: vetProfile.specialization, icon: Award },
                { label: "Experience", value: vetProfile.experience, icon: Clock },
                { label: "License", value: vetProfile.license, icon: FileText },
                { label: "Rating", value: `${vetProfile.rating}/5.0`, icon: Heart },
                { label: "Phone", value: vetProfile.phone, icon: Phone },
                { label: "Email", value: vetProfile.email, icon: Mail },
                { label: "Address", value: vetProfile.address, icon: MapPin },
                { label: "Total Patients", value: vetProfile.totalPatients.toLocaleString(), icon: Users }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-2">
                    <item.icon className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">{item.label}</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Today's Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="w-6 h-6 text-blue-500 mr-3" />
              Today's Appointments
            </h2>

            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{appointment.time}</h3>
                        <p className="text-gray-600">{appointment.petName} - {appointment.ownerName}</p>
                        <p className="text-sm text-blue-600 font-medium">{appointment.type}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                      }`}>
                      {appointment.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Medical Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FileText className="w-6 h-6 text-blue-500 mr-3" />
              Recent Medical Cases
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicalCases.map((case_, index) => (
                <motion.div
                  key={case_.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{case_.petName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${case_.status === 'Recovered'
                      ? 'bg-green-100 text-green-600'
                      : case_.status === 'Improving'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-yellow-100 text-yellow-600'
                      }`}>
                      {case_.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-700">Species:</span> {case_.species}</p>
                    <p><span className="font-medium text-gray-700">Breed:</span> {case_.breed}</p>
                    <p><span className="font-medium text-gray-700">Age:</span> {case_.age}</p>
                    <p><span className="font-medium text-gray-700">Condition:</span> {case_.condition}</p>
                    <p><span className="font-medium text-gray-700">Treatment:</span> {case_.treatment}</p>
                    <p><span className="font-medium text-gray-700">Last Visit:</span> {case_.lastVisit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Practice Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: "Appointments Today",
                  value: appointments.length.toString(),
                  icon: Calendar,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Active Cases",
                  value: medicalCases.filter(c => c.status === 'Ongoing').length.toString(),
                  icon: Activity,
                  color: "from-green-500 to-emerald-500"
                },
                {
                  title: "Patient Rating",
                  value: vetProfile.rating.toString(),
                  icon: Heart,
                  color: "from-pink-500 to-rose-500"
                },
                {
                  title: "Years Experience",
                  value: vetProfile.experience.split(' ')[0],
                  icon: Award,
                  color: "from-purple-500 to-indigo-500"
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

export default VeterinarianDashboard;