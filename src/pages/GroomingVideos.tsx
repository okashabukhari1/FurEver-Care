import React from "react";
import { motion } from "framer-motion";
import { Scissors, Droplet, Brush, PawPrint } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GroomingVideos: React.FC = () => {
    const videos = [
        {
            title: "Dog Bathing Basics",
            description: "Learn how to safely bathe your dog at home.",
            url: "https://www.youtube.com/embed/MCvrxJgy8r0?si=NjqdHLGp7zGmb6jr",
            icon: Droplet,
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: "Cat Grooming Tips",
            description: "Brush and groom your cat without stress.",
            url: "https://www.youtube.com/embed/zPOAaDUzVDY?si=SBDYnR_q3nHkA_o-",
            icon: Brush,
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "Nail Trimming Guide",
            description: "How to trim your pet’s nails safely at home.",
            url: "https://www.youtube.com/embed/VnJafu_NMoQ?si=vFemYT2MVSkUUbbP",
            icon: Scissors,
            color: "from-red-500 to-rose-500"
        },
        {
            title: "General Grooming Essentials",
            description: "Essential grooming tips for all pets.",
            url: "https://www.youtube.com/embed/dK0GNQuIkdw?si=3nPvXXVCHJ93BRMk",
            icon: PawPrint,
            color: "from-green-500 to-emerald-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
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
                        Pet <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Grooming Videos</span>
                    </motion.h1>
                    <p className="text-lg text-gray-600">
                        Watch step-by-step guides to keep your pets clean, happy, and healthy.
                    </p>
                </div>
            </section>

            {/* Videos Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
                    {videos.map((video, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${video.color} mb-4`}>
                                <video.icon className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{video.title}</h2>
                            <p className="text-gray-600 mb-4">{video.description}</p>
                            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
                                <iframe
                                    src={video.url}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default GroomingVideos;
