import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Contact() {
    return (
        <div className="min-h-screen font-body flex flex-col bg-[#fbfcfb]">
            <Navbar />

            {/* Hero Header */}
            <div className="bg-[#1a4724] py-16 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#67bc45] opacity-10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#67bc45] opacity-10 rounded-full -ml-24 -mb-24"></div>
                <h1 className="text-[42px] md:text-[64px] font-black text-white tracking-tighter uppercase relative z-10 font-serif">Get in Touch</h1>
                <p className="text-[#a8d39c] font-bold text-lg max-w-2xl mx-auto mt-2 relative z-10 uppercase tracking-widest">We're here to help you build your dreams</p>
            </div>

            <div className="flex-1 max-w-[1300px] mx-auto w-full px-4 md:px-10 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    
                    {/* Left Side: Contact Form */}
                    <div className="flex-1 bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col">
                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-[#1a4724] mb-3 uppercase tracking-tight">Send us a Message</h2>
                            <p className="text-gray-500 font-bold">Fill out the form below and our team will get back to you within 24 hours.</p>
                        </div>

                        <form className="space-y-8 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[#67bc45] uppercase tracking-[0.2em] ml-1">First Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="George" 
                                        className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-4 focus:outline-none focus:border-[#67bc45] transition-all font-bold text-gray-800 placeholder-gray-300 rounded-t-lg" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-[#67bc45] uppercase tracking-[0.2em] ml-1">Last Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Acut" 
                                        className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-4 focus:outline-none focus:border-[#67bc45] transition-all font-bold text-gray-800 placeholder-gray-300 rounded-t-lg" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[#67bc45] uppercase tracking-[0.2em] ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-4 focus:outline-none focus:border-[#67bc45] transition-all font-bold text-gray-800 placeholder-gray-300 rounded-t-lg" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-[#67bc45] uppercase tracking-[0.2em] ml-1">Your Message</label>
                                <textarea 
                                    placeholder="How can we help you today?" 
                                    rows="5" 
                                    className="w-full bg-gray-50 border-b-2 border-gray-200 px-4 py-4 focus:outline-none focus:border-[#67bc45] transition-all font-bold text-gray-800 placeholder-gray-300 rounded-t-lg resize-none"
                                ></textarea>
                            </div>

                            <button className="bg-[#1a4724] text-white px-10 py-5 rounded-2xl font-black text-sm shadow-xl hover:bg-[#143c1f] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest w-full md:w-auto">
                                Send Message Now
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Map & Info */}
                    <div className="w-full lg:w-[480px] flex flex-col gap-8">
                        
                        {/* Map Section */}
                        <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 h-[400px] relative group">
                            <iframe 
                                title="Maxims Hardware Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5684784711815!2d125.1017684745511!3d8.826723491226507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33002f90a9b8e1f5%3A0x6d3d4e8b8b8b8b8b!2sMaxims%20Hardware!5e0!3m2!1sen!2sph!4v1714578000000!5m2!1sen!2sph"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                            <div className="absolute top-4 left-4 bg-[#1a4724] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                                Our Location
                            </div>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="grid grid-cols-1 gap-4 flex-1">
                            <div className="bg-[#def4d4] rounded-[30px] p-6 border border-[#bddb8a] flex items-center gap-6 group hover:bg-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg text-[#1a4724] group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-[#1a4724] uppercase tracking-widest mb-1">Visit Us</h4>
                                    <p className="text-sm font-bold text-gray-800 leading-tight">P2, Brgy 19, National High Way,<br/>Gingoog City, Misamis Oriental</p>
                                </div>
                            </div>

                            <div className="bg-[#f0f9ed] rounded-[30px] p-6 border border-gray-100 flex items-center gap-6 group hover:bg-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg text-[#67bc45] group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-[#67bc45] uppercase tracking-widest mb-1">Call Us</h4>
                                    <p className="text-xl font-black text-black tracking-tighter">0992 771 8247</p>
                                </div>
                            </div>

                            <div className="bg-[#1a4724] rounded-[30px] p-6 shadow-xl flex items-center gap-6 group cursor-pointer hover:bg-[#143c1f] transition-all">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white group-hover:text-[#1a4724] transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-[#a8d39c] uppercase tracking-widest mb-1">Email Support</h4>
                                    <p className="text-sm font-bold text-white">maximshardware@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
}
