import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#96AED0] py-8 px-4 text-gray-400 text-sm font-semibold">
      <div className="max-w-[1100px] mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-4 sm:gap-8">

        {/* Left Side: Copyright */}
        <div className="text-center sm:text-left w-full sm:w-auto text-white">
          © {new Date().getFullYear()}  MicroMatch
        </div>

        {/* Right Side: Navigation Links with Pipes */}
        <ul className="flex flex-wrap justify-center items-center gap-2 text-white text-sm">
          {[
            { label: 'Home', onClick: scrollToTop },
            { label: 'Terms and Conditions', to: '/terms-conditions' },
            { label: 'Privacy Policy', to: '/privacy-policy' },
            { label: 'Support' },
            { label: 'Contact' },
          ].map((item, index, arr) => (
            <React.Fragment key={item.label}>
              <li className="hover:text-gray-300 cursor-pointer">
                {item.to ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <span onClick={item.onClick}>{item.label}</span>
                )}
              </li>
              {index < arr.length - 1 && <span className="mx-1 text-gray-600">|</span>}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
