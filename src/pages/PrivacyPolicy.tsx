import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Lock,
    Users,
    Database,
    FileText,
    RefreshCw,
    Mail
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy: React.FC = () => {
    const sections = [
        {
            icon: Users,
            title: "Information We Collect",
            content: `We collect basic details such as your name, email, and role (Pet Owner, Veterinarian, or Shelter).
    If you create pet profiles, we also store details like species, breed, and health records.`
        },
        {
            icon: FileText,
            title: "How We Use Your Information",
            content: `Your data helps us personalize your experience, connect you with veterinarians,
    and continuously improve our platform features.`
        },
        {
            icon: ShieldCheck,
            title: "Sharing of Information",
            content: `We never sell your data. Information is shared only with trusted partners 
    (like veterinarians or shelters) when needed to deliver services you request.`
        },
        {
            icon: Lock,
            title: "Data Security",
            content: `We use encryption, firewalls, and secure servers to safeguard your information. 
    Our goal is to protect your data from unauthorized access.`
        },
        {
            icon: Database,
            title: "Your Rights",
            content: `You can update or delete your information anytime. Contact us if you’d like to deactivate your account 
    or exercise your privacy rights.`
        },
        {
            icon: RefreshCw,
            title: "Changes to This Policy",
            content: `We may update this policy to reflect improvements or legal requirements. 
    All updates will be published here with a new effective date.`
        },
        {
            icon: Mail,
            title: "Contact Us",
            content: `Questions or concerns? Reach us at support@furevercare.com — we’d love to help.`
        },
        // ✅ New Detail Card
        {
            icon: FileText,
            title: "Cookies & Tracking",
            content: `We may use cookies and similar technologies to improve user experience, 
    analyze site performance, and personalize content. You can manage cookie settings 
    in your browser preferences.`
        }
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <Navbar showUserInfo={true} />

            {/* Hero Section */}
            <section className="py-20 text-center relative">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl font-extrabold text-gray-800 mb-6"
                >
                    Privacy{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Policy
                    </span>
                </motion.h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We respect your privacy and are committed to protecting your personal
                    data. Here’s how we handle your information with care.
                </p>

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

            {/* Closing Call-to-Action */}
            <section className="text-center py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-4">We Care About Your Privacy</h2>
                    <p className="max-w-2xl mx-auto mb-6">
                        Your trust is our top priority. If you have questions, feedback, or
                        requests, we’re always here to listen.
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

export default PrivacyPolicy;
