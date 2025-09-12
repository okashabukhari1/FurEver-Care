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
    const doc = new jsPDF("p", "mm", "a4");

    // Colors
    const purple = [128, 90, 213]; // Tailwind purple-600
    const pink = [236, 72, 153]; // Tailwind pink-500

    // Header background (gradient effect by rectangle overlay)
    doc.setFillColor(purple[0], purple[1], purple[2]);
    doc.rect(0, 0, 210, 40, "F"); // full-width header

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("FurEver Care", 105, 15, { align: "center" });

    doc.setFontSize(14);
    doc.text("Appointment Ticket", 105, 28, { align: "center" });

    // Optional: Logo if available in /public/logo.png
    // doc.addImage("/logo.png", "PNG", 15, 8, 20, 20);

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Ticket box
    doc.setDrawColor(pink[0], pink[1], pink[2]);
    doc.setLineWidth(1.2);
    doc.roundedRect(20, 50, 170, 100, 5, 5);

    // Ticket details
    doc.setFontSize(12);
    const leftX = 30;
    let y = 70;
    const gap = 12;

    doc.text(`Ticket ID: ${displayProfile.appointmentId}`, leftX, y); y += gap;
    doc.text(`Pet Name: ${displayProfile.name}`, leftX, y); y += gap;
    doc.text(`Owner Email: ${displayProfile.ownerEmail}`, leftX, y); y += gap;
    doc.text(`Owner Number: ${displayProfile.ownerNumber}`, leftX, y); y += gap;
    doc.text(`Date: ${displayProfile.appointmentDate}`, leftX, y); y += gap;
    doc.text(`Time: ${displayProfile.appointmentTime}`, leftX, y); y += gap;

    // Footer note
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("Please arrive 15 minutes early. Bring this ticket for verification.", 105, 165, { align: "center" });

    // Save as file
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
      link: "/FeedingGuide"
    },
    {
      title: "Grooming Videos",
      icon: Scissors,
      description: "Step-by-step grooming tutorials and tips",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      link: "/GroomingVideos"
    },
    {
      title: "Health Tips",
      icon: Stethoscope,
      description: "Expert health advice and wellness guides",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      link: "/HealthTips"
    },
    {
      title: "Training Tips",
      icon: GraduationCap,
      description: "Professional training guides and behavioral tips",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      link: "/TrainingTips"
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
                {/* Appointment Ticket Button */}
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
                  const mergedProfile = {
                    ...petProfile, // keep hidden/system values
                    ...editProfile, // overwrite edited values
                  };
                  localStorage.setItem("petProfile", JSON.stringify(mergedProfile));
                  setPetProfile(mergedProfile);
                  setIsEditing(false);
                }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* Pet Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                  <input
                    type="text"
                    value={editProfile.name}
                    onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Species */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                  <input
                    type="text"
                    value={editProfile.species}
                    onChange={(e) => setEditProfile({ ...editProfile, species: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Breed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                  <input
                    type="text"
                    value={editProfile.breed}
                    onChange={(e) => setEditProfile({ ...editProfile, breed: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="text"
                    value={editProfile.age}
                    onChange={(e) => setEditProfile({ ...editProfile, age: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    value={editProfile.weight}
                    onChange={(e) => setEditProfile({ ...editProfile, weight: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Owner Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email</label>
                  <input
                    type="email"
                    value={editProfile.ownerEmail}
                    onChange={(e) => setEditProfile({ ...editProfile, ownerEmail: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Owner Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner Number</label>
                  <input
                    type="tel"
                    value={editProfile.ownerNumber}
                    onChange={(e) => setEditProfile({ ...editProfile, ownerNumber: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Microchip ID (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Microchip ID</label>
                  <input
                    type="text"
                    value={editProfile.microchipId}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>

                {/* Appointment Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    value={editProfile.appointmentDate}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>

                {/* Appointment Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
                  <input
                    type="time"
                    value={editProfile.appointmentTime}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>

                {/* Save / Cancel */}
                <div className="col-span-full flex space-x-4 mt-4">
                  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">
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
                  { label: "Owner Email", value: displayProfile.ownerEmail, icon: Info },
                  { label: "Owner Number", value: displayProfile.ownerNumber, icon: Phone },
                  { label: "Microchip ID", value: displayProfile.microchipId, icon: Info },
                  { label: "Appointment Date", value: displayProfile.appointmentDate, icon: Calendar },
                  { label: "Appointment Time", value: displayProfile.appointmentTime, icon: Calendar },
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
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={handleDownloadTicket}
                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                Download Ticket
              </button>
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
