import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Adoption() {
    const [selectedPet, setSelectedPet] = useState<any>(null);
    const [requests, setRequests] = useState<any[]>([]);
    const [form, setForm] = useState({ name: "", email: "", reason: "" });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);

    // Load saved requests
    useEffect(() => {
        const stored = localStorage.getItem("adoptionRequests");
        if (stored) setRequests(JSON.parse(stored));
    }, []);

    // Save requests
    useEffect(() => {
        localStorage.setItem("adoptionRequests", JSON.stringify(requests));
    }, [requests]);

    const pets = [
        { name: "Bella", age: "2 years", breed: "Golden Retriever", img: "/Images/golden_retriever.jpg", desc: "Friendly and playful, loves outdoor walks and kids." },
        { name: "Milo", age: "1 year", breed: "Tabby Cat", img: "/Images/tabby_cat.jpg", desc: "Calm, affectionate, and enjoys cozy naps on the couch." },
        { name: "Rocky", age: "3 years", breed: "German Shepherd", img: "/Images/german_shepherd.jpg", desc: "Loyal and protective, perfect for families and active owners." },
        { name: "Luna", age: "6 months", breed: "Persian Cat", img: "/Images/persian_cat.jpg", desc: "Gentle and fluffy, ideal for a peaceful loving home." },
        { name: "Charlie", age: "4 years", breed: "Beagle", img: "/Images/beagle.jpg", desc: "Curious and playful, great with kids and other pets." },
        { name: "Daisy", age: "2 years", breed: "Siamese Cat", img: "/Images/siamese_cat.jpg", desc: "Elegant and affectionate, loves cuddles and attention." },
        { name: "Max", age: "5 years", breed: "Bulldog", img: "/Images/bulldog.jpg", desc: "Calm and loyal, perfect for a relaxed household." },
        { name: "Coco", age: "1.5 years", breed: "Maine Coon", img: "/Images/maine_coon.jpg", desc: "Fluffy and friendly, enjoys climbing and exploring." },
        { name: "Buddy", age: "2 years", breed: "Labrador", img: "/Images/labrador.jpg", desc: "Energetic and playful, loves swimming and fetching." },
    ];

    // 🔎 Custom validation logic
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Name validation
        if (!form.name.trim()) {
            newErrors.name = "Name is required.";
        } else if (!/^[A-Za-z\s'-]{2,60}$/.test(form.name)) {
            newErrors.name = "Name should only contain letters, spaces, apostrophes, or hyphens.";
        }

        // Email validation (only Gmail allowed)
        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email address.";
        } else if (!form.email.toLowerCase().endsWith("@gmail.com")) {
            newErrors.email = "Only Gmail addresses are allowed.";
        }

        // Reason validation
        if (!form.reason.trim()) {
            newErrors.reason = "Reason is required.";
        } else if (form.reason.length < 10) {
            newErrors.reason = "Reason should be at least 10 characters long.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const adoptionData = {
            pet: selectedPet.name,
            name: form.name,
            email: form.email,
            reason: form.reason,
            date: new Date().toISOString(),
        };

        setRequests([...requests, adoptionData]);
        setSubmitted(true);
        setForm({ name: "", email: "", reason: "" }); // reset
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
                    Thousands of pets are waiting for a forever home. Adopt today and give them the love they deserve.
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
                                <img src={pet.img} alt={pet.name} className="w-full h-56 object-cover" />
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{pet.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {pet.breed} • {pet.age}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">{pet.desc}</p>
                                    <button
                                        onClick={() => {
                                            setSelectedPet(pet);
                                            setSubmitted(false);
                                            setForm({ name: "", email: "", reason: "" });
                                            setErrors({});
                                        }}
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

                        {!submitted ? (
                            <>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Adopt {selectedPet.name}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="Your Name"
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <input
                                            type="text"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="Your Gmail Address"
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    {/* Reason */}
                                    <div>
                                        <textarea
                                            value={form.reason}
                                            onChange={(e) => setForm({ ...form, reason: e.target.value })}
                                            placeholder="Why do you want to adopt?"
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                                            rows={3}
                                        />
                                        {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                    >
                                        Submit Adoption Request
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Request Submitted!</h2>
                                <p className="text-gray-700 mb-4">
                                    Your request to adopt <b>{selectedPet.name}</b> has been saved successfully. We’ll
                                    reach out to you soon!
                                </p>
                                <button
                                    onClick={() => setSelectedPet(null)}
                                    className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
