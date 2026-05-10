import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <h1 className="text-2xl font-bold text-indigo-600">
            ChatApp
          </h1>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        
        <h2 className="text-5xl font-bold text-gray-800 leading-tight">
          Welcome to <span className="text-indigo-600">ChatApp</span>
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Connect with your friends and family instantly using our
          fast, secure and modern chat application.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>

          <Link
            to="/register"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-600 hover:text-white transition"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-8">
        
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">
            Fast Messaging
          </h3>

          <p className="text-gray-600">
            Send and receive messages instantly without delays.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">
            Secure Chats
          </h3>

          <p className="text-gray-600">
            Your conversations are safe and protected.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">
            Easy to Use
          </h3>

          <p className="text-gray-600">
            Simple and clean interface for better user experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;