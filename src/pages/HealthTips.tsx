import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Syringe, Stethoscope, Activity, ShieldCheck, Pill } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HealthTips: React.FC = () => {
    const tips = [
        {
            icon: HeartPulse,
            title: "Regular Checkups",
            description: "Schedule routine vet visits at least once a year to monitor your pet’s overall health.",
            color: "from-red-500 to-rose-500"
        },
        {
            icon: Syringe,
            title: "Vaccinations",
            description: "Keep vaccinations up-to-date to prevent common diseases and infections.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Activity,
            title: "Exercise",
            description: "Daily walks and play sessions keep pets fit, reduce obesity, and improve mental health.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Pill,
            title: "Parasite Control",
            description: "Use vet-recommended flea, tick, and worm preventatives to keep your pet safe.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: ShieldCheck,
            title: "Balanced Diet",
            description: "Feed high-quality, species-appropriate food and avoid processed human snacks.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Stethoscope,
            title: "Watch for Symptoms",
            description: "Monitor eating habits, behavior, and energy levels — early detection saves lives.",
            color: "from-indigo-500 to-violet-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Navbar showUserInfo={true} />

            {/* Hero Section */}
            <section className="relative py-20">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl font-bold text-gray-800 mb-6"
                    >
                        Pet <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Health Tips</span>
                    </motion.h1>
                    <p className="text-lg text-gray-600">
                        Simple, vet-approved advice to keep your furry friends healthy and happy.
                    </p>
                </div>
            </section>

            {/* Tips Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tips.map((tip, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${tip.color} mb-4`}>
                                <tip.icon className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{tip.title}</h2>
                            <p className="text-gray-600">{tip.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HealthTips;
