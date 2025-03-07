import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-black">
        <aside className="w-64 bg-black text-white border-r-1 border-slate-600 p-6 py-30 pl-10 hidden md:block fixed top-17 left-0 h-full">
          <h2 className="text-xl font-semibold mb-8">Sections</h2>
          <ul className="space-y-4">
            <li>
              <a href="#information-we-collect" className="hover:underline">
                Information We Collect
              </a>
            </li>
            <li>
              <a
                href="#how-we-use-your-information"
                className="hover:underline"
              >
                How We Use Your Information
              </a>
            </li>
            <li>
              <a
                href="#how-we-share-your-information"
                className="hover:underline"
              >
                How We Share Your Information
              </a>
            </li>
            <li>
              <a href="#data-security" className="hover:underline">
                Data Security
              </a>
            </li>
            <li>
              <a href="#your-rights" className="hover:underline">
                Your Rights
              </a>
            </li>
            <li>
              <a href="#changes-to-this-policy" className="hover:underline">
                Changes to This Policy
              </a>
            </li>
            <li>
              <a href="#contact-us" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </aside>
        <div className="flex-1 md:ml-64 px-6 md:px-12 lg:px-32 py-12 text-white bg-black flex flex-col items-center">
          <div className="max-w-4xl w-full">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed text-center md:text-left">
              This Privacy Policy describes how we collect, use, and share
              information about you when you visit or use our services.
            </p>

            <section id="information-we-collect" className="mt-8">
              <h2 className="text-2xl font-medium mb-3">
                1. Information We Collect
              </h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Personal information (name, email, contact details).</li>
                <li>
                  Usage data (interactions, preferences, and behavior on our
                  site).
                </li>
                <li>
                  Device and browser data for analytics and performance
                  improvements.
                </li>
              </ul>
            </section>

            <section id="how-we-use-your-information" className="mt-8">
              <h2 className="text-2xl font-medium mb-3">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>To provide and improve our services.</li>
                <li>For security and fraud prevention.</li>
                <li>To communicate with you about updates and offers.</li>
              </ul>
            </section>

            <section id="how-we-share-your-information" className="mt-8">
              <h2 className="text-2xl font-medium mb-3">
                3. How We Share Your Information
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We do not sell your personal data. However, we may share data
                with service providers for analytics, security, and legal
                compliance.
              </p>
            </section>

            <section id="data-security" className="mt-8">
              <h2 className="text-2xl font-medium mb-3">4. Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement industry-standard security measures to protect your
                information from unauthorized access, alteration, or
                destruction.
              </p>
            </section>

            <section id="your-rights" className="mt-8">
              <h2 className="text-2xl font-medium mb-3">5. Your Rights</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>
                  Request access, update, or deletion of your personal data.
                </li>
                <li>
                  Opt out of promotional emails and data collection where
                  applicable.
                </li>
              </ul>
            </section>

            <section id="changes-to-this-policy" className="mt-8">
              <h2 className="text-2xl font-medium mb-3">
                6. Changes to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this policy from time to time. Any significant
                changes will be communicated through our website.
              </p>
            </section>

            <section id="contact-us" className="mt-8 text-center">
              <p className="text-gray-400">
                For any questions, contact us at{" "}
                <span className="text-white">support@example.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
