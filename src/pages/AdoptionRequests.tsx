import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdoptionRequests() {
    const [requests, setRequests] = useState<any[]>([]);

    // Load saved requests from local storage
    useEffect(() => {
        const stored = localStorage.getItem("adoptionRequests");
        if (stored) setRequests(JSON.parse(stored));
    }, []);

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-pink-100 via-yellow-100 to-green-100 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    📋 My Adoption Requests
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Here are all the pets you’ve applied to adopt. 💕
                </p>
            </section>

            {/* Requests List */}
            <section className="py-12 px-6 bg-gray-50 min-h-[60vh]">
                <div className="max-w-6xl mx-auto">
                    {requests.length === 0 ? (
                        <p className="text-center text-gray-600 text-lg">
                            No adoption requests yet. 🐾
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {requests.map((req, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
                                >
                                    <h2 className="text-2xl font-bold text-green-600 mb-2">
                                        {req.pet}
                                    </h2>
                                    <p className="text-gray-700 text-sm mb-1">
                                        <strong>Name:</strong> {req.name}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-1">
                                        <strong>Email:</strong> {req.email}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-1">
                                        <strong>Reason:</strong> {req.reason}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-3">
                                        Requested on {new Date(req.date).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
