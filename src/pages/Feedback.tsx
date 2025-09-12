import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Feedback: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        feedback: "",
        rating: 0,
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (field: string, value: string | number) => {
        if (field === "name") {
            // Block numbers and special characters
            const regex = /^[A-Za-z\s]*$/;
            if (!regex.test(value as string)) return;
        }
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.feedback || formData.rating === 0) {
            alert("Please fill in all fields and select a rating.");
            return;
        }

        console.log("Feedback Submitted:", formData);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Navbar />

            <section className="flex-1 py-20 px-6 md:px-12">
                <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-white/30">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-purple-600 mb-4">Thank You!</h2>
                            <p className="text-gray-700">Your feedback has been submitted successfully.</p>
                        </motion.div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">We Value Your Feedback</h2>
                                <p className="text-gray-600">
                                    Help us improve FurEver Care by sharing your thoughts.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                        placeholder="Enter your name"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Only alphabets are allowed</p>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Rating</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                onClick={() => handleChange("rating", star)}
                                                className={`w-8 h-8 cursor-pointer ${formData.rating >= star
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Feedback */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
                                    <textarea
                                        value={formData.feedback}
                                        onChange={(e) => handleChange("feedback", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                        rows={5}
                                        placeholder="Tell us what you think..."
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition"
                                >
                                    Submit Feedback
                                </motion.button>
                            </form>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Feedback;
