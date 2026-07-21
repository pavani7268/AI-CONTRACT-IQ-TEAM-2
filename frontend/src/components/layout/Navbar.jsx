import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HiMenu,
  HiX,
  HiHome,
  HiUpload,
  HiDocumentText,
  HiChat,
  HiScale,
  HiShieldCheck,
  HiLogout,
  HiLogin,
  HiUserAdd,
  HiViewGrid,
} from 'react-icons/hi';
import Button from '../common/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = token
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: HiViewGrid },
        { name: 'Upload', path: '/upload', icon: HiUpload },
        { name: 'Viewer', path: '/viewer', icon: HiDocumentText },
        { name: 'AI Chat', path: '/chat', icon: HiChat },
        { name: 'Compare', path: '/compare', icon: HiScale },
        { name: 'Report', path: '/report', icon: HiShieldCheck },
      ]
    : [
        { name: 'Home', path: '/', icon: HiHome },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-secondary-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              <HiShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              AI<span className="text-primary-400">Contract</span>IQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                    : 'text-secondary-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {token ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm text-secondary-300">
                    {user.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-secondary-300 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <HiLogout className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" icon={HiLogin}>
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" icon={HiUserAdd}>
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-secondary-300 hover:text-white hover:bg-white/5 transition-all"
          >
            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1 bg-secondary-950/95 backdrop-blur-xl border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-secondary-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          ))}

          <div className="border-t border-white/10 pt-3 mt-3">
            {token ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                    <p className="text-xs text-secondary-400">{user.email || ''}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <HiLogout className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 px-4">
                <Link to="/login">
                  <Button variant="outline" size="sm" fullWidth icon={HiLogin}>
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" fullWidth icon={HiUserAdd}>
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

