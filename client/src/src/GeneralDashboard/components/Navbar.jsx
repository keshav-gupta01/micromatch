import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import UserTypeSelection from './UserTypeSelection'; // Import your component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSelection, setShowSelection] = useState(false); // For Get Started

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Profile', href: '#' },
    { name: 'Settings', href: '#' }
  ];

  const handleGetStartedClick = () => {
    setShowSelection(true);
  };

  const handleBack = () => {
    setShowSelection(false);
  };

  return (
    <>
      {showSelection && (
        <UserTypeSelection onBack={handleBack} />
      )}

      <nav className="fixed top-0 w-full bg-white shadow-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-slate-900">MicroMatch</h1>
            </div>

            {/* Centered Nav Links (Desktop) */}
            <div className="hidden md:flex flex-1 justify-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-800 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Button (Desktop) */}
            <div className="hidden md:block">
              <button
                onClick={handleGetStartedClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-800 hover:text-blue-600 transition-colors"
              >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav Menu */}
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md rounded-b-xl">
              <div className="px-4 py-2 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="py-2">
                  <button
                    onClick={handleGetStartedClick}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
