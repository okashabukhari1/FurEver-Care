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

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        feedback: "",
        rating: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        let valid = true;
        let newErrors: any = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
            valid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = "Only alphabets and spaces are allowed.";
            valid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
            valid = false;
        }

        if (formData.rating === 0) {
            newErrors.rating = "Please select a rating.";
            valid = false;
        }

        if (!formData.feedback.trim()) {
            newErrors.feedback = "Feedback cannot be empty.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Feedback Submitted:", formData);
            setSubmitted(true);
            setFormData({ name: "", email: "", feedback: "", rating: 0 });
            setErrors({ name: "", email: "", feedback: "", rating: "" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Navbar />

            <section className="flex-1 py-20 px-6 md:px-12">
                <div className="max-w-3xl mx-auto bg-white/80 rounded-3xl shadow-xl p-10 border">
                    {submitted ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-purple-600 mb-4">Thank You!</h2>
                            <p className="text-gray-700">Your feedback has been submitted successfully.</p>
                        </motion.div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">We Value Your Feedback</h2>
                                <p className="text-gray-600">Help us improve FurEver Care by sharing your thoughts.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Your Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Your Email *</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Rating *</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                onClick={() => handleChange("rating", star)}
                                                className={`w-8 h-8 cursor-pointer ${formData.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                                </div>

                                {/* Feedback */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Your Feedback *</label>
                                    <textarea
                                        value={formData.feedback}
                                        onChange={(e) => handleChange("feedback", e.target.value)}
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                        placeholder="Tell us what you think..."
                                    />
                                    {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>}
                                </div>

                                {/* Submit */}
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl shadow-lg">
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
