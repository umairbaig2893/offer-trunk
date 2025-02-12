import Image from "next/image";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a64bc] text-black mt-10">
      <div className="w-full flex flex-wrap justify-between max-w-screen-xl mx-auto pt-10 px-4 md:px-0">
        {/* Left Section: Logo & Description */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <img
            src="https://www.offertrunk.com/images/logo.png"
            alt="Logo"
            className="h-20 w-35 mr-2"
          />
          <p className="text-sm mt-2 text-white">
            Founded in 2025 by affiliate marketers, OfferTrunk is the internet's
            best resource for affiliates to find affiliate offers, connect with
            affiliate networks and verify their reputation.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="bg-blue-600 p-2 rounded-full">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="bg-red-600 p-2 rounded-full">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0">
          <h3 className="font-bold text-lg mb-2 text-white">Navigation</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">User Login</a>
            </li>
            <li>
              <a href="#">Advertiser Login</a>
            </li>
            <li>
              <a href="#">Signup Form</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0">
          <h3 className="font-bold text-lg mb-2 text-white">Resources</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Our Blog</a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="w-full md:w-1/5">
          <h3 className="font-bold text-lg mb-2 text-white">Legal</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="#">Sitemap</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4 text-sm text-white">
        Copyright &copy; 2025 - Mobilogi Technology Pvt Ltd. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
