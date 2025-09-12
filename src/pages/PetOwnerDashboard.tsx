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
  Award
} from 'lucide-react';
import jsPDF from "jspdf";
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
  ownerNumber: string;
  ownerEmail: string;
  appointmentId: string;
  appointmentDate: string;
  appointmentTime: string;
}

const PetOwnerDashboard: React.FC = () => {
  const { user } = useUser();
  const [petProfile, setPetProfile] = useState<PetProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState<PetProfile | null>(null);
  const [showTicket, setShowTicket] = useState(false);

  const handleDownloadTicket = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("FurEver Care - Appointment Ticket", 20, 20);

    doc.setFontSize(12);
    doc.text(`Ticket ID: ${displayProfile.appointmentId}`, 20, 40);
    doc.text(`Pet Name: ${displayProfile.name}`, 20, 50);
    doc.text(`Owner Email: ${displayProfile.ownerEmail}`, 20, 60);
    doc.text(`Owner Number: ${displayProfile.ownerNumber}`, 20, 70);
    doc.text(`Date: ${displayProfile.appointmentDate}`, 20, 80);
    doc.text(`Time: ${displayProfile.appointmentTime}`, 20, 90);

    doc.save(`Appointment_${displayProfile.appointmentId}.pdf`);
  };


  useEffect(() => {
    const generateMicrochipId = () => {
      const timestamp = Date.now().toString();
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `MC${timestamp.slice(-6)}${random}`;
    };

    const defaultExtras = {
      lastVetVisit: 'Feb 15, 2025',
      nextVaccination: 'May 15, 2025',
      medications: 'None currently',
      ownerNumber: 'Not provided',
      ownerEmail: 'Not provided',
      appointmentId: 'APT-' + Date.now().toString().slice(-6),
      appointmentDate: 'Sep 20, 2025',
      appointmentTime: '10:30 AM',
    };

    const savedProfile = localStorage.getItem('petProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
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
        ownerNumber: parsed.ownerNumber ?? defaultExtras.ownerNumber,
        ownerEmail: parsed.ownerEmail ?? defaultExtras.ownerEmail,
        appointmentId: parsed.appointmentId ?? defaultExtras.appointmentId,
        appointmentDate: parsed.appointmentDate ?? defaultExtras.appointmentDate,
        appointmentTime: parsed.appointmentTime ?? defaultExtras.appointmentTime,
      };
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
        ownerNumber: defaultExtras.ownerNumber,
        ownerEmail: defaultExtras.ownerEmail,
        appointmentId: defaultExtras.appointmentId,
        appointmentDate: defaultExtras.appointmentDate,
        appointmentTime: defaultExtras.appointmentTime,
      };
      localStorage.setItem('petProfile', JSON.stringify(defaultNewProfile));
      setPetProfile(defaultNewProfile);
    }
  }, []);

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
    ownerNumber: 'Not provided',
    ownerEmail: 'Not provided',
    appointmentId: 'APT-000001',
    appointmentDate: 'Sep 20, 2025',
    appointmentTime: '10:30 AM',
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

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Welcome to FurEver,{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {user.name}!
              </span>
            </h1>
            {displayProfile.name && (
              <p className="text-xl text-gray-600">
                Let's take great care of{" "}
                <span className="font-semibold text-purple-600">
                  {displayProfile.name}
                </span>{" "}
                today
              </p>
            )}
          </motion.div>

          {/* Profile Card */}
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
                {displayProfile.name}'s Pet & Owner Profile
              </h2>

              <div className="flex items-center space-x-4">
                {/* Appointment Badge */}
                <button
                  onClick={() => setShowTicket(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow hover:shadow-lg transition"
                >
                  View Appointment Ticket
                </button>


                {/* Edit Button */}
                {!isEditing && (
                  <button
                    onClick={() => {
                      setEditProfile(displayProfile);
                      setIsEditing(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow hover:shadow-md transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {isEditing && editProfile ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  localStorage.setItem("petProfile", JSON.stringify(editProfile));
                  setPetProfile(editProfile);
                  setIsEditing(false);
                }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {Object.entries(editProfile).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setEditProfile((prev) =>
                          prev ? { ...prev, [key]: e.target.value } : null
                        )
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                ))}

                <div className="col-span-full flex space-x-4 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Species", value: displayProfile.species, icon: Heart },
                  { label: "Breed", value: displayProfile.breed, icon: Info },
                  { label: "Age", value: displayProfile.age, icon: Calendar },
                  { label: "Weight", value: displayProfile.weight, icon: Award },
                  { label: "Last Vet Visit", value: displayProfile.lastVetVisit, icon: Stethoscope },
                  { label: "Next Vaccination", value: displayProfile.nextVaccination, icon: Calendar },
                  { label: "Owner Email", value: displayProfile.ownerEmail, icon: Info },
                  { label: "Owner Number", value: displayProfile.ownerNumber, icon: Phone },
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
            )}
          </motion.div>

          {/* Care Sections */}
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
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
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
        </div>
      </section>


      {showTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowTicket(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600">Appointment Ticket</h2>
              <p className="text-gray-500 text-sm">Keep this for your vet visit</p>
            </div>

            {/* Ticket Info */}
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Ticket ID:</span>
                <span>{displayProfile.appointmentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pet Name:</span>
                <span>{displayProfile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Owner Email:</span>
                <span>{displayProfile.ownerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Owner Number:</span>
                <span>{displayProfile.ownerNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{displayProfile.appointmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{displayProfile.appointmentTime}</span>
              </div>
            </div>

            {/* Action */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowTicket(false)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
};

export default PetOwnerDashboard;
