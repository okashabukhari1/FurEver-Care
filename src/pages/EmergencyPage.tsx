import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, AlertTriangle, Heart, Stethoscope } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import emergencyData from '../data/emergencyContacts.json';

const EmergencyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <Navbar />
      
      {/* Header */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
                Emergency <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Pet Care</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick access to emergency veterinary services and poison control. Save these numbers for immediate assistance.
            </p>
          </motion.div>

          {/* Emergency Alert Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-6 mb-12 shadow-2xl"
          >
            <div className="flex items-center justify-center text-center">
              <Heart className="w-8 h-8 mr-4 animate-pulse" />
              <div>
                <h2 className="text-2xl font-bold mb-2">In Case of Emergency</h2>
                <p className="text-lg opacity-90">
                  If your pet is experiencing a life-threatening emergency, call the nearest emergency clinic immediately!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Emergency Contacts */}
          <div className="space-y-8">
            {emergencyData.emergencyContacts.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (categoryIndex * 0.1) }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                  <h3 className="text-2xl font-bold flex items-center">
                    <Phone className="w-6 h-6 mr-3" />
                    {category.category}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.contacts.map((contact, contactIndex) => (
                      <motion.div
                        key={contactIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + (contactIndex * 0.05) }}
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Stethoscope className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            {contact.name}
                          </h4>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <a 
                              href={`tel:${contact.phone}`}
                              className="text-lg font-semibold text-green-600 hover:text-green-700 transition-colors duration-300"
                            >
                              {contact.phone}
                            </a>
                          </div>

                          <div className="flex items-start">
                            <MapPin className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{contact.address}</span>
                          </div>

                          <div className="flex items-start">
                            <Clock className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{contact.services}</span>
                          </div>
                        </div>

                        <motion.a
                          href={`tel:${contact.phone}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call Now</span>
                        </motion.a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Emergency Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Emergency Preparation Tips
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Stay Calm",
                  description: "Your pet can sense your anxiety. Stay calm and speak in soothing tones while seeking help.",
                  icon: Heart
                },
                {
                  title: "Call First",
                  description: "Always call the emergency clinic before arriving to inform them you're coming.",
                  icon: Phone
                },
                {
                  title: "Transport Safely",
                  description: "Use a carrier for cats and small dogs. For large dogs, use a blanket as a stretcher if needed.",
                  icon: MapPin
                },
                {
                  title: "Bring Medical Records",
                  description: "If possible, bring your pet's vaccination records and list of current medications.",
                  icon: Clock
                },
                {
                  title: "Know the Signs",
                  description: "Learn to recognize signs of emergency: difficulty breathing, bleeding, seizures, or unconsciousness.",
                  icon: AlertTriangle
                },
                {
                  title: "Have a Plan",
                  description: "Know the location of your nearest emergency clinic and keep their number handy.",
                  icon: Stethoscope
                }
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + (index * 0.1) }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
                >
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <tip.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">{tip.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="tel:(888)426-4435"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call Poison Control</span>
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.google.com/maps/search/emergency+veterinarian+near+me', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MapPin className="w-5 h-5" />
                <span>Find Nearest Vet</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmergencyPage;