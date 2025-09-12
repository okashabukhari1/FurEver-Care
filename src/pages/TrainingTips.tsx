import React from "react";
import { motion } from "framer-motion";
import { PawPrint, ThumbsUp, BellRing, Smile, Trophy, Users, PlayCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TrainingTips: React.FC = () => {
    const tips = [
        {
            icon: PawPrint,
            title: "Start with Basic Commands",
            description: "Teach sit, stay, and come using short sessions and repeat daily.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: ThumbsUp,
            title: "Positive Reinforcement",
            description: "Reward good behavior with treats, praise, or playtime. Avoid punishment.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: BellRing,
            title: "Consistency Matters",
            description: "Use the same words, tone, and signals so your pet learns faster.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Smile,
            title: "Short & Fun Sessions",
            description: "Keep training sessions 5–10 minutes long to maintain focus and fun.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Users,
            title: "Socialization",
            description: "Expose pets to new people, sounds, and environments early to reduce fear.",
            color: "from-red-500 to-rose-500"
        },
        {
            icon: Trophy,
            title: "Celebrate Progress",
            description: "Every small success builds confidence — celebrate with affection!",
            color: "from-indigo-500 to-violet-500"
        }
    ];

    const videos = [
        {
            title: "Teach Your Dog to Sit",
            description: "Step-by-step guide to teaching the 'Sit' command.",
            url: "https://www.youtube.com/embed/VE1v4tw1LJ0"
        },
        {
            title: "Stay Command Training",
            description: "Help your dog learn patience with the 'Stay' command.",
            url: "https://www.youtube.com/embed/7z3Q-huQ9p0"
        },
        {
            title: "Recall / Come Command",
            description: "Train your pet to come back when called every time.",
            url: "https://www.youtube.com/embed/IdI1dVt2Z9Y"
        },
        {
            title: "Loose Leash Walking",
            description: "Learn how to stop pulling and enjoy walks with your dog.",
            url: "https://www.youtube.com/embed/_J4iPQ1LHRw"
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
                        Pet <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Training Tips</span>
                    </motion.h1>
                    <p className="text-lg text-gray-600">
                        Train your pets with love, patience, and consistency for lifelong good behavior.
                    </p>
                </div>
            </section>

            {/* Training Tips Section */}
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

            {/* Video Tutorials Section */}
            <section className="py-20 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 flex justify-center items-center gap-2">
                            <PlayCircle className="w-10 h-10 text-purple-600" />
                            Video <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tutorials</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Watch step-by-step training guides to practice at home with your pet.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {videos.map((video, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h3>
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
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TrainingTips;
