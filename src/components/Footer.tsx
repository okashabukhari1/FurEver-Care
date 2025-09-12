import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-pink-400 mr-2" />
              <span className="text-2xl font-bold">FurEver Care</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Providing exceptional care and love for your furry family members.
              They deserve forever love, and we're here to help you give it.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, link: "https://facebook.com/" },
                { icon: Twitter, link: "https://twitter.com/" },
                { icon: Instagram, link: "https://instagram.com/" },
                { icon: Youtube, link: "https://youtube.com/" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                  href={item.link}
                  target="_blank" // ✅ opens in new tab
                  rel="noopener noreferrer"
                >
                  <item.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-pink-400">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Pet Care Guide', to: '/petcare' },
                { label: 'Product Showcase', to: '/products' },
                { label: 'Emergency Help', to: '/emergency' },
                { label: 'Adoption Center', to: '/adoption' },
                { label: 'Veterinary Services', to: '/veterinarian' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-pink-400">Our Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'Pet Health Monitoring', to: '/HealthTips' },
                { label: 'Grooming Tips', to: '/GroomingVideos' },
                { label: 'Training Guides', to: '/TrainingTips' },
                { label: 'Nutrition Planning', to: '/FeedingGuide' },
                { label: '24/7 Emergency Support', to: '/emergency' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-pink-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pink-400" />
                <span className="text-gray-300">+1 (555) 123-PETS</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pink-400" />
                <span className="text-gray-300">care@furevercare.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-pink-400" />
                <span className="text-gray-300">123 Pet Care Blvd, Pet City, PC 12345</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-white-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2025 FurEver Care. All rights reserved. Made with ❤️ for pet lovers.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="/PrivacyPolicy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
            <a href="/TermsOfService" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
            <a href="/CookiePolicy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Cookie Policy</a>
          </div>
        </motion.div>
      </div>

    </footer>
  );
};

export default Footer;