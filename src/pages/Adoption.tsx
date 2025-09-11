import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Adoption() {
    const [selectedPet, setSelectedPet] = useState<any>(null);
    const [requests, setRequests] = useState<any[]>([]);

    // Load saved requests from local storage
    useEffect(() => {
        const stored = localStorage.getItem("adoptionRequests");
        if (stored) setRequests(JSON.parse(stored));
    }, []);

    // Save requests whenever they change
    useEffect(() => {
        localStorage.setItem("adoptionRequests", JSON.stringify(requests));
    }, [requests]);

    const pets = [
        {
            name: "Bella",
            age: "2 years",
            breed: "Golden Retriever",
            img: "https://placedog.net/400/300?id=1",
            desc: "Friendly and playful, loves outdoor walks and kids.",
        },
        {
            name: "Milo",
            age: "1 year",
            breed: "Tabby Cat",
            img: "https://placekitten.com/400/300",
            desc: "Calm, affectionate, and enjoys cozy naps on the couch.",
        },
        {
            name: "Rocky",
            age: "3 years",
            breed: "German Shepherd",
            img: "https://placedog.net/400/300?id=2",
            desc: "Loyal and protective, perfect for families and active owners.",
        },
        {
            name: "Luna",
            age: "6 months",
            breed: "Persian Cat",
            img: "https://placekitten.com/401/300",
            desc: "Gentle and fluffy, ideal for a peaceful loving home.",
        },
        {
            name: "Charlie",
            age: "4 years",
            breed: "Beagle",
            img: "https://placedog.net/400/300?id=3",
            desc: "Curious and playful, great with kids and other pets.",
        },
        {
            name: "Daisy",
            age: "2 years",
            breed: "Siamese Cat",
            img: "https://placekitten.com/402/300",
            desc: "Elegant and affectionate, loves cuddles and attention.",
        },
        {
            name: "Max",
            age: "5 years",
            breed: "Bulldog",
            img: "https://placedog.net/400/300?id=4",
            desc: "Calm and loyal, perfect for a relaxed household.",
        },
        {
            name: "Coco",
            age: "1.5 years",
            breed: "Maine Coon",
            img: "https://placekitten.com/403/300",
            desc: "Fluffy and friendly, enjoys climbing and exploring.",
        },
        {
            name: "Buddy",
            age: "2 years",
            breed: "Labrador",
            img: "https://placedog.net/400/300?id=5",
            desc: "Energetic and playful, loves swimming and fetching.",
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const name = (form[0] as HTMLInputElement).value;
        const email = (form[1] as HTMLInputElement).value;
        const reason = (form[2] as HTMLTextAreaElement).value;

        const adoptionData = {
            pet: selectedPet.name,
            name,
            email,
            reason,
            date: new Date().toISOString(),
        };

        setRequests([...requests, adoptionData]);

        alert("✅ Adoption request saved locally!");
        setSelectedPet(null);
    };

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-yellow-100 via-pink-100 to-green-100 py-16 text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    🐾 Find Your New Best Friend
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Thousands of pets are waiting for a forever home. Adopt today and give
                    them the love they deserve.
                </p>
            </section>

            {/* Pets Grid */}
            <section className="py-12 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
                        Available for Adoption
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pets.map((pet, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
                            >
                                <img
                                    src={pet.img}
                                    alt={pet.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                                        {pet.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {pet.breed} • {pet.age}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">{pet.desc}</p>
                                    <button
                                        onClick={() => setSelectedPet(pet)}
                                        className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                                    >
                                        Adopt Me 💕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedPet && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg relative">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                            onClick={() => setSelectedPet(null)}
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Adopt {selectedPet.name}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                pattern="^[A-Za-z\s'-]{2,60}$"
                                title="Please enter a valid name (letters, spaces, apostrophes, hyphens)."
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                            />
                            <textarea
                                placeholder="Why do you want to adopt?"
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                                rows={3}
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                                Submit Adoption Request
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
