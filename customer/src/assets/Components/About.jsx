import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function About() {
    return (
        <div className="min-h-screen font-body flex flex-col">
            <Navbar />

            {/* Main Content with Concrete Background */}
            <div 
                className="flex-1 bg-cover bg-center bg-fixed py-10 md:py-16 px-4 md:px-10 flex flex-col items-center relative" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517639493569-5666a7b2f49d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')` }}
            >
                <div className="absolute inset-0 bg-white/10"></div>
                
                <h1 className="text-[42px] md:text-[72px] font-pt-serif font-black text-[#1a1a1a] mb-8 md:mb-12 tracking-tight uppercase relative z-10 text-center">ABOUT US</h1>

                {/* Description Box */}
                <div className="w-full max-w-[1000px] bg-[#4a6741]/90 backdrop-blur-sm rounded-xl p-6 md:p-10 mb-10 md:mb-16 shadow-2xl border border-white/20 text-center relative z-10">
                    <p className="text-white text-[14px] md:text-[17px] leading-relaxed font-medium tracking-wide">
                        Maxims Hardware is a retail business located in Gingoog City that provides a wide range of
                        construction materials and hardware tools such as cement, nails, paint, plumbing supplies, and
                        other building essentials.
                        <br /><br />
                        The business is committed to offering affordable and high-quality products to meet the needs of
                        builders, workers, and homeowners. With a focus on friendly and reliable customer service, Maxims
                        Hardware ensures that every customer receives the right materials for their construction and home
                        improvement projects.
                    </p>
                </div>

                {/* Mission & Vision Row */}
                <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-16 relative z-10">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl flex flex-col items-center text-center border border-gray-100 transition-all hover:scale-[1.02] hover:shadow-2xl">
                        <h2 className="text-[36px] md:text-[52px] font-pt-serif font-black text-black mb-6 md:mb-8 tracking-tighter uppercase leading-none">MISSION</h2>
                        <p className="text-gray-800 font-bold text-[15px] md:text-[19px] leading-snug">
                            To provide affordable, high-quality hardware and construction materials while giving friendly and reliable service to customers.
                        </p>
                    </div>
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl flex flex-col items-center text-center border border-gray-100 transition-all hover:scale-[1.02] hover:shadow-2xl">
                        <h2 className="text-[36px] md:text-[52px] font-pt-serif font-black text-black mb-6 md:mb-8 tracking-tighter uppercase leading-none">VISION</h2>
                        <p className="text-gray-800 font-bold text-[15px] md:text-[19px] leading-snug">
                            To become a trusted and leading hardware store in Gingoog City, known for quality products and excellent customer service.
                        </p>
                    </div>
                </div>

                {/* Info Grid Section */}
                <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20 relative z-10">
                    {/* Who We Are */}
                    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-100 flex flex-col items-center text-center">
                        <h3 className="text-[26px] md:text-[34px] font-extrabold text-black mb-4 md:mb-6 uppercase tracking-tighter">WHO WE ARE</h3>
                        <p className="text-gray-800 font-bold text-[14px] md:text-[16px] leading-[1.6]">
                            Maxims Hardware is a trusted local business that provides quality construction materials and tools. 
                            We are committed to serving builders, homeowners, and the community with reliable products and friendly service.
                        </p>
                    </div>

                    {/* How Do We Help (List) */}
                    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-100 flex flex-col items-center h-full">
                        <h3 className="text-[26px] md:text-[34px] font-extrabold text-black mb-4 md:mb-6 uppercase tracking-tighter text-center w-full">HOW DO WE HELP</h3>
                        <div className="text-left w-full space-y-4">
                            <p className="text-gray-900 font-bold text-[14px] md:text-[15px]">We supply a wide range of products such as:</p>
                            <ul className="text-gray-800 font-bold text-[14px] md:text-[15px] space-y-3 list-none pl-2">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                                    <span className="flex-1">Construction materials (cement, sand, gravel)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                                    <span className="flex-1">Tools and equipment</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                                    <span className="flex-1">Paints and electrical supplies</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                                    <span className="flex-1">Plumbing materials</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* How We Help (Text) */}
                    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-100 flex flex-col items-center text-center">
                        <h3 className="text-[26px] md:text-[34px] font-extrabold text-black mb-4 md:mb-6 uppercase tracking-tighter">HOW WE HELP</h3>
                        <p className="text-gray-800 font-bold text-[14px] md:text-[16px] leading-relaxed">
                            We help by offering affordable materials, giving advice, and ensuring customers get what they need quickly and easily.
                        </p>
                    </div>

                    {/* Success Story */}
                    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-100 flex flex-col items-center text-center h-full">
                        <h3 className="text-[26px] md:text-[34px] font-extrabold text-black mb-4 md:mb-6 uppercase tracking-tighter">SUCCESS STORY</h3>
                        <div className="overflow-y-auto pr-2">
                            <p className="text-gray-800 font-bold text-[13px] md:text-[14px] leading-relaxed text-justify">
                                Maxims Hardware started as a small shop with limited products. Through hard work, good customer service, and trust from the community, it grew into a reliable hardware store. 
                                <br /><br />
                                Today, it serves many customers, supports local construction projects, and continues to expand its services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
