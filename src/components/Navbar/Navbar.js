"use client";
// If you're using the Next.js App Router with server components,
// mark this as a client component so it can use state & client-side interactions.

import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-[#0a64bc] shadow">
      <div className="mx-auto max-w-7xl px-4 py-3 md:flex md:items-center md:justify-between">
        {/* Logo & Toggle Button Container */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image
                src="https://www.offertrunk.com/images/logo.png"
                alt="Logo"
                width={152} // Approximate width (9.5rem = 152px)
                height={60} // Adjust height proportionally
                className="h-15 mr-2"
                loading="lazy" // Enables lazy loading for better performance
              />
            </div>
          </Link>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-white-600 focus:outline-none focus:text-white-600"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                // Close Icon
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                // Menu Icon
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* <div
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
            href="/login"
            className="block px-3 py-2 text-white hover:text-black-900 md:ml-4"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="block px-3 py-2 text-white hover:text-black-900 md:ml-4"
          >
            Register
          </Link>
        </div> */}
        <div
          className={`mt-2 md:mt-0 ${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center`}
        >
          <div className="flex flex-col items-center md:flex-row md:justify-end">
            <Link
              href="/"
              className="block px-3 py-2 text-white hover:text-black-900"
            >
              Home
            </Link>
            <button
              onClick={() => {
                window.location.href = "https://panel.offertrunk.com";
              }}
              className="block px-3 py-2 text-white hover:text-black-900"
            >
              Login
            </button>

            <Link
              href="/auth/register"
              className="block px-3 py-2 text-white hover:text-black-900"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
