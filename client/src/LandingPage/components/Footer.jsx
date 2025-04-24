import React from 'react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-[#96AED0] py-4 px-4">
      <div className="md:max-w-[1100px] m-auto">
        
        {/* Top Navigation Links (3) */}
        <div className="mb-2">
          <ul className="flex flex-wrap justify-center gap-8 text-white">
            <li className="cursor-pointer hover:text-gray-900" onClick={scrollToTop}>Home</li>
            <li className="cursor-pointer hover:text-gray-900">Terms & Conditions</li>
            <li className="cursor-pointer hover:text-gray-900">Privacy Policy</li>
          </ul>
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/30 my-2"></div>
        
        {/* Bottom Navigation Links (2) */}
        <div className="mt-2">
          <ul className="flex flex-wrap justify-center gap-8 text-white">
            <li className="cursor-pointer hover:text-gray-900">Support</li>
            <li className="cursor-pointer hover:text-gray-900">Contact</li>
          </ul>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-3 text-white text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer