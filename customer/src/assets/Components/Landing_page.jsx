import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../maximshardwarelogo.png";
import heroTools from "../tool_background.png";
import Footer from "./Footer";

export default function Landing_page() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", path: "/", action: () => navigate("/main-dashboard") },
    { name: "ABOUT", path: "/about", action: () => navigate("/about") },
    { name: "CONTACT", path: "/contact", action: () => navigate("/contact") },
    { name: "PRODUCTS", path: "/products", action: () => navigate("/products") },
  ];

  return (
    <div className="min-h-screen bg-white font-body">
      {/* Navbar Section */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 bg-[#f0f0f0] border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer z-50" onClick={() => navigate("/main-dashboard")}>
          <img src={logo} alt="Maxims Hardware" className="h-10 md:h-12 w-auto object-contain" />
        </div>

        <ul className="hidden md:flex gap-4 text-black font-extrabold text-[13px] tracking-wide items-center ml-10">
          {navLinks.map((link) => (
            <li 
              key={link.name} 
              className="cursor-pointer transition-all px-4 py-1.5 rounded-full uppercase hover:text-[#5ca84a]"
              onClick={link.action}
            >
              {link.name}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-6 ml-auto">
          <button 
            onClick={() => navigate("/login")}
            className="px-8 py-2 bg-[#5ca84a] text-white font-bold rounded-lg shadow-sm hover:bg-[#4ea13b] transition uppercase"
          >
            LOGIN
          </button>
          <button 
            onClick={() => navigate("/signup")}
            className="text-black font-extrabold text-sm hover:text-[#5ca84a] transition uppercase"
          >
            SIGN UP
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2">
            <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[80px] left-0 w-full bg-white shadow-xl border-b border-gray-200 z-40 flex flex-col">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              className="text-left font-extrabold text-[15px] text-gray-700 hover:bg-gray-50 uppercase px-6 py-4 border-b border-gray-100" 
              onClick={() => { setIsMobileMenuOpen(false); link.action(); }}
            >
              {link.name}
            </button>
          ))}
          <div className="px-6 py-4 bg-gray-50 flex flex-col gap-3">
            <button 
              className="w-full px-8 py-3 bg-[#5ca84a] text-white font-bold rounded-lg shadow-sm hover:bg-[#4ea13b] transition uppercase text-center"
              onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }}
            >
              LOGIN
            </button>
            <button 
              className="w-full text-center text-black font-extrabold text-[15px] hover:text-[#5ca84a] transition uppercase py-2"
              onClick={() => { setIsMobileMenuOpen(false); navigate("/signup"); }}
            >
              SIGN UP
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-24 min-h-[60vh] md:min-h-[80vh] overflow-hidden">
        <div className="w-full md:max-w-2xl z-10 text-center md:text-left mt-8 md:mt-0">
          <h1 className="text-5xl md:text-[90px] font-pt-serif font-bold text-black leading-none drop-shadow-md tracking-tight">
            YOUR TRUSTED
          </h1>
          <h2 className="text-4xl md:text-[65px] font-body font-medium text-[#114925] mt-2 tracking-tight">
            HARDWARE PARTNER
          </h2>
          <p className="text-black font-semibold mt-6 md:mt-8 text-lg md:text-2xl tracking-tight">
            Quality Materials and Affordable Prices
          </p>
          <button 
            onClick={() => navigate("/login")}
            className="mt-8 md:mt-12 px-8 py-3 md:px-10 md:py-4 bg-[#5ca84a] text-white rounded-xl text-lg md:text-xl font-black shadow-md hover:bg-[#4ea13b] hover:scale-105 transition-all duration-300 uppercase"
          >
            GET STARTED
          </button>
        </div>

        <div className="w-full md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-[60%] h-64 md:h-full flex items-center justify-center md:justify-end pointer-events-none mt-10 md:mt-0 relative">
          <div className="relative h-full w-full flex items-center justify-center md:justify-end">
            <div className="absolute inset-0 z-10 bg-gradient-to-t md:bg-gradient-to-r from-white via-white/50 to-transparent md:block hidden"></div>
            <img src={heroTools} alt="Hardware Tools" className="w-full md:w-[918px] h-full md:h-[708px] object-cover md:object-contain opacity-95 transition-opacity" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
