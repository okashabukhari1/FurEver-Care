import React from "react";
import { motion } from "framer-motion";
import {
    FileText,
    ShieldCheck,
    UserCheck,
    AlertTriangle,
    Lock,
    RefreshCw,
    Mail,
    XCircle
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService: React.FC = () => {
    const sections = [
        {
            icon: UserCheck,
            title: "1. Acceptance of Terms",
            content: `By using FurEver Care, you agree to abide by these Terms of Service. 
      If you do not agree, please discontinue use of the platform.`
        },
        {
            icon: FileText,
            title: "2. Use of Services",
            content: `You agree to use FurEver Care responsibly and only for its intended purposes: 
      managing pets, connecting with veterinarians, and accessing community resources.`
        },
        {
            icon: ShieldCheck,
            title: "3. User Responsibilities",
            content: `You are responsible for maintaining the accuracy of your information 
      and for keeping your login credentials secure.`
        },
        {
            icon: AlertTriangle,
            title: "4. Prohibited Activities",
            content: `You may not misuse the platform, attempt unauthorized access, 
      spread harmful content, or harass other users.`
        },
        {
            icon: Lock,
            title: "5. Intellectual Property",
            content: `All logos, trademarks, and content on FurEver Care belong to us or our partners. 
      You may not copy, modify, or distribute without permission.`
        },
        {
            icon: XCircle,
            title: "6. Termination of Accounts",
            content: `We reserve the right to suspend or terminate accounts that violate these Terms 
      or engage in harmful activities. Users may also request account termination at any time.`
        },
        {
            icon: RefreshCw,
            title: "7. Changes to Terms",
            content: `We may update these Terms from time to time. Any updates will be posted here 
      with an updated effective date.`
        },
        {
            icon: Mail,
            title: "8. Contact Us",
            content: `If you have any questions about these Terms, please contact us at 
      support@furevercare.com.`
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Navbar showUserInfo={true} />

            {/* Hero Section */}
            <section className="py-20 text-center relative">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl font-extrabold text-gray-800 mb-6"
                >
                    Terms of{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Service
                    </span>
                </motion.h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                    Please read these Terms carefully before using FurEver Care. They
                    explain your rights, responsibilities, and the rules of our community.
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

            {/* Terms Sections */}
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
                    <h2 className="text-3xl font-bold mb-4">Thanks for Being Part of Our Community</h2>
                    <p className="max-w-2xl mx-auto mb-6">
                        By using FurEver Care, you’re joining a caring community that puts
                        pets first. Together, we make a difference.
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

export default TermsOfService;
