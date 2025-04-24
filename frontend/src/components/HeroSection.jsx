// src/components/HeroSection.jsx
import React from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "../assets/hero-illustration.svg"; // Add a custom illustration or use a placeholder

const HeroSection = () => {
  return (
    <section className="bg-gray-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Empowering Citizens, <br /> Resolving Complaints Swiftly.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            GrievEase is a decentralized grievance reporting platform helping
            citizens raise civic complaints and connect with municipal
            authorities in real-time.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="/report"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Report a Complaint
            </a>
            <a
              href="#how-it-works"
              className="flex items-center text-blue-600 hover:underline font-medium"
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Illustration */}
        <div className="md:w-1/2">
          <img
            src={heroImg}
            alt="Complaint Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
