"use client";
// If you're using the Next.js App Router with server components,
// mark this as a client component so it can use state & client-side interactions.

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#E1D7C6] to-[#295F98] shadow">
      <div className="mx-auto max-w-7xl px-4 py-3 md:flex md:items-center md:justify-between">
        {/* Logo & Toggle Button Container */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              {/* 
                Replace this with an <Image /> or <img> 
                if you have a logo file inside public/ directory
              */}
              <img
                src="../../../public/assets/logo.png"
                alt="Logo"
                className="h-8 w-8 mr-2"
              />
              {/* <span className="font-bold text-xl">MyApp</span> */}
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  // Close icon (x)
                  <path fillRule="evenodd" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon
                  <path
                    fillRule="evenodd"
                    d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div
          className={`mt-2 md:mt-0 ${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center`}
        >
          <Link
            href="/"
            className="block px-3 py-2 text-white hover:text-black-900 md:ml-4"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-white hover:text-black-900 md:ml-4"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 text-white hover:text-black-900 md:ml-4"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
