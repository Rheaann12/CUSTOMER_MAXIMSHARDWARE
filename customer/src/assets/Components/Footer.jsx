import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../maximshardwarelogo.png';
import footerBg from '../footer_bg.png';

const Footer = () => {
    const navigate = useNavigate();

    const quickLinksLeft = [
        { name: "HOME", action: () => navigate("/main-dashboard") },
        { name: "ABOUT", action: () => navigate("/about") },
        { name: "SERVICES", action: () => navigate("/") },
    ];

    const quickLinksRight = [
        { name: "CONTACTS", action: () => navigate("/contact") },
        { name: "PRODUCTS", action: () => navigate("/products") },
    ];

    const servicesLeft = [
        "Delivery Service",
        "Construction Supply",
        "Paint Mixing",
    ];

    const servicesRight = [
        "Plumbing Materials",
        "Electrical Supplies"
    ];

    const socialLinks = [
        { 
            name: "Facebook", 
            icon: <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        },
        { 
            name: "Instagram", 
            icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771-4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        },
        { 
            name: "Messenger", 
            icon: <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.462 5.501 3.743 7.158V22l3.393-1.859c.92.255 1.898.393 2.864.393 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.077 12.308l-2.584-2.754-5.046 2.754 5.546-5.892 2.584 2.754 5.046-2.754-5.546 5.892z" />
        }
    ];

    return (
        <footer className="relative text-white overflow-hidden w-full flex flex-col z-20">
            {/* Main Footer Content */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat flex items-center py-8 md:py-6 md:h-[210px]"
                style={{ 
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${footerBg})`
                }}
            >
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-8 md:gap-0">
                    
                    {/* Section 1: Logo & Info */}
                    <div className="flex flex-col items-center md:items-start w-full md:w-[320px] shrink-0">
                        <div className="bg-white/90 p-1 rounded-sm mb-2 w-[220px]">
                            <img src={logo} alt="Maxims Hardware" className="w-full h-auto object-contain" />
                        </div>
                        <div className="text-[10px] md:text-[12px] font-medium text-gray-200 mb-2 text-center md:text-left">
                            <p>Your trusted hardware store in</p>
                            <p>Gingoog City</p>
                        </div>
                        <div className="space-y-1">
                            {[
                                "Affordable construction material",
                                "Reliable Delivery Service"
                            ].map((text) => (
                                <div key={text} className="flex items-center gap-2">
                                    <div className="bg-[#1ed760] rounded-full p-0.5 shrink-0">
                                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[9px] md:text-[11px] font-medium text-gray-300">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vertical Divider 1 */}
                    <div className="hidden md:block w-[1px] bg-white/20 self-stretch my-2 mx-8 lg:mx-12"></div>

                    {/* Links & Services Container - 2 Columns on Mobile */}
                    <div className="flex w-full md:flex-1 gap-4 md:gap-0">
                        {/* Section 2: Quick Links */}
                        <div className="flex-1 flex flex-col items-start">
                            <h3 className="text-[14px] md:text-[24px] lg:text-[34px] font-normal mb-3 md:mb-4 tracking-tight uppercase leading-none font-sans border-b border-white/20 pb-1 w-full md:border-0 md:pb-0">QUICK LINKS</h3>
                            <div className="flex flex-col gap-y-1.5 w-full">
                                {[
                                    { name: "HOME", action: () => navigate("/main-dashboard") },
                                    { name: "ABOUT", action: () => navigate("/about") },
                                    { name: "CATEGORIES", action: () => navigate("/products") },
                                    { name: "SERVICES", action: () => navigate("/") },
                                    { name: "CONTACTS", action: () => navigate("/contact") },
                                    { name: "PRODUCTS", action: () => navigate("/products") },
                                ].map((link) => (
                                    <div key={link.name} className="flex items-center gap-1.5 cursor-pointer group" onClick={link.action}>
                                        <div className="w-1 h-1 bg-white rounded-full"></div>
                                        <span className="text-[9px] md:text-[12px] font-bold tracking-wider text-gray-200 group-hover:text-white transition uppercase">{link.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vertical Divider 2 (Tablet/Desktop Only) */}
                        <div className="hidden md:block w-[1px] bg-white/20 self-stretch my-2 mx-8 lg:mx-12"></div>

                        {/* Section 3: Services */}
                        <div className="flex-1 flex flex-col items-start">
                            <h3 className="text-[14px] md:text-[24px] lg:text-[34px] font-normal mb-3 md:mb-4 tracking-tight uppercase leading-none font-sans border-b border-white/20 pb-1 w-full md:border-0 md:pb-0">SERVICES</h3>
                            <div className="flex flex-col gap-y-1.5 w-full">
                                {[
                                    "Delivery Service",
                                    "Construction Supply",
                                    "Paint Mixing",
                                    "Plumbing Materials",
                                    "Electrical Supplies",
                                ].map((svc) => (
                                    <div key={svc} className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 bg-white rounded-full shrink-0"></div>
                                        <span className="text-[9px] md:text-[12px] font-bold tracking-tight text-gray-200 whitespace-nowrap">{svc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full bg-black/90 py-3 md:py-0 md:h-[41px] border-t border-gray-800">
                <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex items-center justify-between h-full relative">
                    <div className="flex-1 flex justify-start">
                        <p className="text-[8px] md:text-[11px] font-medium text-gray-400">
                            © 2026 Maxims Hardware. All rights reserved.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        {socialLinks.map((link) => (
                            <a key={link.name} href="#" className="text-white hover:text-[#1ed760] transition-colors">
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">{link.icon}</svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
