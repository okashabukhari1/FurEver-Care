import React from "react";
import { motion } from "framer-motion";
import { Bone, Cat, Bird, Rabbit, Apple } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FeedingGuide: React.FC = () => {
    const guides = [
        {
            icon: Bone,
            title: "Dogs",
            tips: [
                "Puppies (2-6 months): 3–4 meals per day",
                "Adults: 2 meals per day",
                "Use portion sizes based on weight and activity level",
                "Always provide fresh water"
            ],
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: Cat,
            title: "Cats",
            tips: [
                "Kittens: 3–4 small meals daily",
                "Adults: 2 meals per day",
                "Include both wet and dry food",
                "Avoid giving too much milk (can cause stomach upset)"
            ],
            color: "from-purple-400 to-pink-500"
        },
        {
            icon: Bird,
            title: "Birds",
            tips: [
                "Provide a mix of seeds, pellets, and fresh fruits/veggies",
                "Avoid avocado, chocolate, and caffeine",
                "Keep a clean water source daily",
                "Offer cuttlebone for calcium"
            ],
            color: "from-blue-400 to-cyan-500"
        },
        {
            icon: Rabbit,
            title: "Rabbits",
            tips: [
                "Unlimited fresh hay (main diet)",
                "1–2 cups fresh leafy greens daily",
                "Limited pellets",
                "Fresh water always available"
            ],
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: Apple,
            title: "General Tips",
            tips: [
                "Avoid processed human food",
                "Introduce new food gradually",
                "Check with your vet before major diet changes",
                "Maintain a feeding schedule"
            ],
            color: "from-red-400 to-pink-600"
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
                        Pet <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Feeding Guide</span>
                    </motion.h1>
                    <p className="text-lg text-gray-600">
                        Learn the right way to feed your pets for a happy, healthy life.
                    </p>
                </div>
            </section>

            {/* Feeding Guides */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guides.map((guide, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${guide.color} mb-4`}>
                                <guide.icon className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{guide.title}</h2>
                            <ul className="space-y-2 text-gray-600">
                                {guide.tips.map((tip, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="text-purple-600 mr-2">•</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FeedingGuide;
