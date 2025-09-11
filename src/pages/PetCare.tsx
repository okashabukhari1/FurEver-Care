import React from "react";
import {
    Heart,
    Bone,
    Stethoscope,
    Scissors,
    Shield,
    PawPrint,
    Home,
    Activity,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PetCare() {
    const tips = [
        {
            icon: <Bone className="w-10 h-10 text-pink-500" />,
            title: "Nutrition & Feeding",
            desc: "Provide balanced meals with fresh water. Avoid overfeeding and consult a vet for diet plans.",
        },
        {
            icon: <Stethoscope className="w-10 h-10 text-blue-500" />,
            title: "Health Checkups",
            desc: "Regular vet visits help detect issues early. Keep vaccinations and deworming up to date.",
        },
        {
            icon: <Heart className="w-10 h-10 text-red-500" />,
            title: "Exercise & Play",
            desc: "Daily walks, running, and playtime keep pets physically fit and mentally active.",
        },
        {
            icon: <Scissors className="w-10 h-10 text-green-500" />,
            title: "Grooming & Hygiene",
            desc: "Brush fur regularly, trim nails, clean ears, and maintain oral hygiene for overall wellness.",
        },
        {
            icon: <Activity className="w-10 h-10 text-orange-500" />,
            title: "Training & Discipline",
            desc: "Basic obedience training builds good behavior and strengthens your bond with your pet.",
        },
        {
            icon: <Shield className="w-10 h-10 text-purple-500" />,
            title: "Safety & Environment",
            desc: "Ensure a safe home, avoid toxic foods, secure outdoor spaces, and provide shade in hot weather.",
        },
        {
            icon: <PawPrint className="w-10 h-10 text-teal-500" />,
            title: "Bonding & Love",
            desc: "Spend quality time, cuddle, and give affection to keep pets emotionally healthy.",
        },
        {
            icon: <Home className="w-10 h-10 text-yellow-500" />,
            title: "Emergency Care",
            desc: "Learn basic first aid, keep vet contacts handy, and prepare an emergency kit for quick response.",
        },
    ];

    return (
        <div>
            <Navbar />
            <section className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 py-12 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        🐾 Pet Care Guide
                    </h1>
                    <p className="text-lg text-gray-600 mb-12">
                        Keep your furry friends happy, healthy, and full of love with these
                        essential pet care tips.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {tips.map((tip, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                            >
                                <div className="flex justify-center mb-4">{tip.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {tip.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
