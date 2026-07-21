import React from 'react';
import { Link } from 'react-router-dom';
import { HiShieldCheck, HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-secondary-900/50 border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-500/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/25">
                <HiShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                AI<span className="text-primary-400">Contract</span>IQ
              </span>
            </Link>
            <p className="text-sm text-secondary-400 leading-relaxed">
              AI-powered contract intelligence platform for analyzing, comparing, 
              and managing your legal documents with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-secondary-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-secondary-400 hover:text-primary-400 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-secondary-400 hover:text-primary-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-secondary-400 hover:text-primary-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Features
            </h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-secondary-400">Contract Analysis</span>
              </li>
              <li>
                <span className="text-sm text-secondary-400">AI-Powered Insights</span>
              </li>
              <li>
                <span className="text-sm text-secondary-400">Risk Detection</span>
              </li>
              <li>
                <span className="text-sm text-secondary-400">Compliance Reports</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <HiMail className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-secondary-400">support@aicontractiq.com</span>
              </li>
              <li className="flex items-start gap-2">
                <HiPhone className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-secondary-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <HiLocationMarker className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-secondary-400">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-500">
              &copy; {currentYear} AI Contract IQ. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-xs text-secondary-500 hover:text-secondary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-xs text-secondary-500 hover:text-secondary-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
