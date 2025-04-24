import React from "react";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook, FaLinkedin, FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-blue-600 text-white p-4 md:p-4 footer sticky
    bottom-0 w-full z-50 "
    >
      <div className=" flex flex-col sm:flex-row justify-between items-center text-sm">
        <div>Copyright © 2025 GrievEase. All rights reserved.</div>
        <div className="mt-4 sm:mt-0 space-x-4">
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
