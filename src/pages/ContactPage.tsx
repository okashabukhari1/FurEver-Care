import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    // Restrict name field to letters, spaces, apostrophes, and hyphens only
    if (name === "name") {
      value = value.replace(/[^A-Za-z\s'-]/g, "");
    }

    // Restrict phone field to digits, +, (), -, and spaces only
    if (name === "phone") {
      value = value.replace(/[^0-9+().\-\s]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    } else if (!/^[A-Za-z\s'-]+$/.test(formData.name)) {
      newErrors.name = "Only letters, spaces, apostrophes, and hyphens are allowed.";
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    // Phone (optional)
    if (formData.phone && !/^\+?[0-9\s().-]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
      valid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
      valid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true); // Show success message instead of alert
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Pet Care Blvd", "Pet City, PC 12345", "United States"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-PETS", "+1 (555) 456-CARE", "24/7 Emergency: (555) 911-PETS"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@furevercare.com", "support@furevercare.com", "emergency@furevercare.com"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat - Sun: 9:00 AM - 6:00 PM", "Emergency: 24/7"],
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />

      {/* Header */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="w-12 h-12 text-purple-500 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
                Contact{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Us</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help you and your furry friends. Get in touch with our caring team for any questions or
              support.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 rounded-2xl p-6 shadow-lg border hover:shadow-2xl transition-all"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}
                >
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{info.title}</h3>
                {info.details.map((d, i) => (
                  <p key={i} className="text-gray-600 text-center text-sm">
                    {d}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 rounded-3xl p-8 shadow-xl border">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <Send className="w-8 h-8 text-purple-500 mr-3" /> Send us a Message
              </h2>

              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center p-10">
                  <div className="flex justify-center mb-4">
                    <Send className="w-16 h-16 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-green-600 mb-3">Thank You!</h2>
                  <p className="text-gray-700">Your message has been sent successfully. We’ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        placeholder="Enter your name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        placeholder="What's this about?"
                      />
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl shadow-lg"
                  >
                    <Send className="w-5 h-5 inline mr-2" /> Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Map */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 rounded-3xl p-8 shadow-xl border">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-8 h-8 text-blue-500 mr-3" /> Find Us
              </h2>
              <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FurEver Care Location"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">123 Pet Care Blvd, Pet City, PC 12345</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Parking</h4>
                    <p className="text-gray-600">Free parking available on-site</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Pet Friendly</h4>
                    <p className="text-gray-600">All pets welcome in our facility</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
