import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../maximshardwarelogo.png";
import lumberBg from "../lumber.png";

export default function Login() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.phone === phone && u.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.dispatchEvent(new Event('cartUpdated')); // Trigger navbar update
            setShowSuccessOverlay(true);
            setTimeout(() => {
                navigate("/main-dashboard");
            }, 3000);
        } else {
            alert("Invalid phone number or password!");
        }
    };

    return (
        <div className="min-h-screen bg-white font-body flex flex-col relative">
            {/* Success Overlay */}
            {showSuccessOverlay && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500"></div>
                    <div className="bg-white rounded-[30px] p-10 md:p-16 flex flex-col items-center gap-6 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300 scale-110">
                        <div className="w-24 h-24 bg-[#67bc45] rounded-full flex items-center justify-center shadow-lg shadow-green-200 animate-pulse">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Login Successful!</h3>
                            <p className="text-gray-600 font-bold">Redirecting to your dashboard...</p>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
                            <div className="bg-[#67bc45] h-full rounded-full animate-[progress_3s_linear_forwards]"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navbar Section - Precision Replication */}
            <nav className="flex items-center justify-between px-6 md:px-10 py-5 bg-[#e4e4e4] border-b border-gray-200 shrink-0 sticky top-0 z-50">
                <div className="flex-1">
                    <div className="flex items-center cursor-pointer w-fit" onClick={() => navigate("/products")}>
                        <img src={logo} alt="Maxims Hardware" className="h-10 md:h-12 w-auto object-contain" />
                    </div>
                </div>

                <ul className="hidden md:flex gap-4 text-black font-extrabold text-[13px] tracking-wide items-center ml-10">
                    <li className="cursor-pointer transition-all px-4 py-1.5 rounded-full uppercase hover:text-[#5ca84a]" onClick={() => navigate("/main-dashboard")}>HOME</li>
                    <li className="cursor-pointer transition-all px-4 py-1.5 rounded-full uppercase hover:text-[#5ca84a]" onClick={() => navigate('/products')}>PRODUCTS</li>
                </ul>

                <div className="hidden md:flex flex-1 items-center justify-end gap-10">
                    <button className="px-10 py-2.5 bg-[#67bc45] text-white font-bold rounded-xl shadow-sm hover:bg-[#58a33a] transition uppercase text-sm">
                        LOGIN
                    </button>
                    <button 
                        onClick={() => navigate("/signup")}
                        className="text-black font-extrabold text-[13px] hover:text-[#5ca84a] transition uppercase"
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
                <div className="md:hidden fixed top-[73px] left-0 w-full bg-white shadow-xl border-b border-gray-200 z-40 flex flex-col">
                    <button className="text-left font-extrabold text-[15px] text-gray-700 hover:bg-gray-50 uppercase px-6 py-4 border-b border-gray-100" onClick={() => { setIsMobileMenuOpen(false); navigate("/main-dashboard"); }}>HOME</button>
                    <button className="text-left font-extrabold text-[15px] text-gray-700 hover:bg-gray-50 uppercase px-6 py-4 border-b border-gray-100" onClick={() => { setIsMobileMenuOpen(false); navigate('/products'); }}>PRODUCTS</button>
                    <div className="px-6 py-4 bg-gray-50 flex flex-col gap-3">
                        <button className="w-full py-3 bg-[#67bc45] text-white font-bold rounded-lg">LOGIN</button>
                        <button className="w-full text-center text-black font-extrabold text-[15px] py-2" onClick={() => { setIsMobileMenuOpen(false); navigate("/signup"); }}>SIGN UP</button>
                    </div>
                </div>
            )}

            {/* Main Login Display */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${lumberBg})` }}
                ></div>

                <div className="w-full px-4 md:pl-[40px] md:pr-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 py-8 md:py-0">

                    {/* Hero Branding */}
                    <div className="flex-1 text-center md:text-left select-none">
                        <h1 className="text-[60px] md:text-[100px] font-pt-serif font-black text-white leading-[0.85] drop-shadow-[0_16px_16px_rgba(0,0,0,0.9)] tracking-tighter uppercase italic">
                            WELCOME <br />
                            <span className="inline-block mt-4">BACK</span>
                        </h1>
                    </div>

                    {/* Login Card */}
                    <div className="w-full md:w-[821px] md:h-[450px] bg-[#e4e4e4] rounded-[30px] md:rounded-[40px] px-8 py-10 md:px-20 md:py-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center border-2 border-[#1a4724]">
                        <div className="w-full flex-1 flex flex-col items-center">
                            <h2 className="text-[36px] md:text-[55px] font-black text-black tracking-tight leading-none mb-1">LOG IN</h2>
                            <p className="text-gray-600 text-[13px] font-bold mb-8 text-center">
                                Enter your registered phone number password to login
                            </p>

                            <form onSubmit={handleLogin} className="w-full space-y-6 flex flex-col items-center">
                                {/* Phone Field */}
                                <div className="flex items-center gap-6 w-full max-w-[550px]">
                                    <div className="shrink-0 w-8 flex justify-center">
                                        <svg className="w-7 h-7 text-[#264b32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="flex-1 h-12 px-6 bg-white rounded-xl text-black font-bold text-sm focus:outline-none shadow-sm placeholder:text-gray-400 placeholder:font-medium"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="flex flex-col w-full max-w-[550px]">
                                    <div className="flex items-center gap-6 w-full">
                                        <div className="shrink-0 w-8 flex justify-center">
                                            <svg className="w-7 h-7 text-[#264b32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full h-12 px-6 bg-white rounded-xl text-black font-bold text-sm focus:outline-none shadow-sm placeholder:text-gray-400 placeholder:font-medium"
                                                required
                                            />
                                    </div>
                                    <div className="ml-14 mt-2">
                                        <a href="#" className="text-blue-500 hover:underline font-bold text-[11px] transition-colors">
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>

                                {/* Submit Action */}
                                <button 
                                    type="submit"
                                    className="w-full md:w-[380px] py-3.5 bg-[#1a4724] hover:bg-[#143c1f] text-white font-black text-lg rounded-xl transition-all duration-300 shadow-lg uppercase tracking-wider mt-4"
                                >
                                    LOG IN
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
