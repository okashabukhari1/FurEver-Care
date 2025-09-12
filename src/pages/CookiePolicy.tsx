import React from "react";
import { motion } from "framer-motion";
import {
    Cookie,
    ShieldCheck,
    Eye,
    Settings,
    Trash2,
    Mail
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CookiePolicy: React.FC = () => {
    const sections = [
        {
            icon: Cookie,
            title: "1. What Are Cookies?",
            content: `Cookies are small text files stored on your device when you use FurEver Care. 
      They help us remember your preferences, improve functionality, and provide a smoother experience.`
        },
        {
            icon: Eye,
            title: "2. How We Use Cookies",
            content: `We use cookies to remember login sessions, save user preferences, 
      analyze site traffic, and improve performance of our platform.`
        },
        {
            icon: ShieldCheck,
            title: "3. Types of Cookies We Use",
            content: `• Essential Cookies – required for basic site functions. 
      • Analytics Cookies – help us understand how you use FurEver Care. 
      • Functional Cookies – remember your preferences for a better experience.`
        },
        {
            icon: Settings,
            title: "4. Managing Cookies",
            content: `You can manage or disable cookies through your browser settings. 
      However, some features of FurEver Care may not work properly if cookies are disabled.`
        },
        {
            icon: Trash2,
            title: "5. Data Retention",
            content: `Cookies are stored for different durations depending on their purpose. 
      Session cookies expire when you close your browser, while persistent cookies 
      remain until they expire or are manually deleted.`
        },
        {
            icon: Mail,
            title: "6. Contact Us",
            content: `If you have any questions about our Cookie Policy, 
      reach out to us at support@furevercare.com.`
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
            <Navbar showUserInfo={true} />

            {/* Hero Section */}
            <section className="py-20 text-center relative">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl font-extrabold text-gray-800 mb-6"
                >
                    Cookie{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Policy
                    </span>
                </motion.h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                    We use cookies to make FurEver Care work better for you.
                    This page explains what cookies are, how we use them, and how you can control them.
                </p>

                {/* Last Updated Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="inline-block px-4 py-2 mt-4 text-sm font-medium text-purple-700 bg-purple-100 rounded-full shadow"
                >
                    Last Updated: September 12, 2025
                </motion.div>

                {/* Decorative background */}
                <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            </section>

            {/* Policy Sections */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                <section.icon className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 ml-4">
                                {section.title}
                            </h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{section.content}</p>
                    </motion.div>
                ))}
            </section>

            {/* Closing CTA */}
            <section className="text-center py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-4">Control Your Cookies</h2>
                    <p className="max-w-2xl mx-auto mb-6">
                        You have full control over cookies. Adjust your preferences in your
                        browser settings anytime.
                    </p>
                    <a
                        href="mailto:support@furevercare.com"
                        className="px-6 py-3 rounded-xl bg-white text-purple-600 font-semibold shadow hover:shadow-lg transition-all"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default CookiePolicy;
