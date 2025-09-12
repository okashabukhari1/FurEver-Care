import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Stethoscope, Globe, Shield } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-28 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl md:text-6xl font-extrabold mb-6"
                >
                    About <span className="underline decoration-yellow-300">FurEver Care</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-2xl mx-auto text-lg md:text-xl opacity-90"
                >
                    Building a world where pets and families live healthier, happier, and more connected lives.
                </motion.p>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6 md:px-12 lg:px-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.img
                        src="/images/about-pets.jpg"
                        alt="Happy pets"
                        className="rounded-2xl shadow-2xl w-full object-cover"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    />

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            FurEver Care is designed to make pet parenting effortless. From health
                            records and vaccination tracking to expert veterinary advice and community
                            connections—we empower families to give their pets the <span className="font-semibold text-purple-600">love and care</span> they deserve.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-700">
                                <Shield className="w-5 h-5 text-purple-600 mr-2" />
                                Secure & Trusted Platform
                            </li>
                            <li className="flex items-center text-gray-700">
                                <Stethoscope className="w-5 h-5 text-purple-600 mr-2" />
                                Professional Veterinary Guidance
                            </li>
                            <li className="flex items-center text-gray-700">
                                <Heart className="w-5 h-5 text-purple-600 mr-2" />
                                A Community That Cares
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-white/70 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                        Our Core Values
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { icon: Heart, title: "Compassion", desc: "Every pet deserves unconditional love." },
                            { icon: Users, title: "Community", desc: "Connecting pet owners, vets & shelters." },
                            { icon: Stethoscope, title: "Expertise", desc: "Trusted veterinary knowledge & tips." },
                            { icon: Globe, title: "Global Reach", desc: "Supporting pet families worldwide." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition"
                            >
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-6"
                >
                    Join the FurEver Family
                </motion.h2>
                <p className="max-w-2xl mx-auto text-lg opacity-90 mb-8">
                    Whether you're a pet owner, veterinarian, or shelter, FurEver Care is here to
                    help you create lasting bonds.
                </p>
                <motion.a
                    href="/"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-10 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
                >
                    Get Started
                </motion.a>
            </section>

            <Footer />
        </div>
    );
};

export default About;
