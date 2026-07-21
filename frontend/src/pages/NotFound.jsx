import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiShieldCheck } from 'react-icons/hi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

      <div className="relative text-center max-w-lg">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full gradient-primary shadow-2xl shadow-primary-500/25">
            <span className="text-5xl font-bold text-white">404</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-secondary-400 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
          >
            <HiHome className="h-5 w-5" />
            Go Home
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-800 hover:bg-secondary-700 text-white font-medium rounded-xl transition-all duration-200 border border-secondary-700 hover:border-secondary-600"
          >
            <HiShieldCheck className="h-5 w-5" />
            Dashboard
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-xs mx-auto opacity-30">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full bg-primary-400"
              style={{
                width: `${Math.random() * 60 + 20}%`,
                opacity: 1 - i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;

