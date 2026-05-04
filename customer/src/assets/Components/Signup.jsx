import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../maximshardwarelogo.png";

export default function Signup() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const newUser = {
            username: formData.username,
            phone: formData.phone,
            password: formData.password,
            memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.username)}&background=67bc45&color=fff&size=128`
        };

        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

        setShowSuccessOverlay(true);
        setTimeout(() => {
            navigate("/login");
        }, 3000);
    };

    // High-quality placeholder for the PVC display - User should replace with actual asset
    const hardwareDisplay = "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop";

    return (
        <div className="min-h-screen bg-[#f8f9fa] font-body flex flex-col relative">
            {/* Success Overlay */}
            {showSuccessOverlay && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500"></div>
                    <div className="bg-white rounded-[30px] p-10 md:p-16 flex flex-col items-center gap-6 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300 scale-110 w-[90%] max-w-[500px]">
                        <div className="w-24 h-24 bg-[#67bc45] rounded-full flex items-center justify-center shadow-lg shadow-green-200 animate-bounce">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Account Created!</h3>
                            <p className="text-gray-600 font-bold">Welcome to Maxims Hardware. Redirecting to login...</p>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
                            <div className="bg-[#67bc45] h-full rounded-full animate-[progress_3s_linear_forwards]"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navbar Section - SIGN UP is highlighted here */}
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
                    <button 
                        onClick={() => navigate("/login")}
                        className="text-black font-extrabold text-[13px] hover:text-[#5ca84a] transition uppercase"
                    >
                        LOGIN
                    </button>
                    <button className="px-10 py-2.5 bg-[#67bc45] text-white font-bold rounded-xl shadow-sm hover:bg-[#58a33a] transition uppercase text-sm">
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
                        <button className="w-full py-3 bg-transparent text-black font-extrabold rounded-lg border border-gray-300" onClick={() => { setIsMobileMenuOpen(false); navigate("/login"); }}>LOGIN</button>
                        <button className="w-full py-3 bg-[#67bc45] text-white font-bold rounded-lg">SIGN UP</button>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-10 lg:p-20">
                <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-10 xl:gap-20">
                    
                    {/* Left Side: Hardware Display Image */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="w-full max-w-[700px] aspect-square rounded-[40px] overflow-hidden shadow-2xl bg-white p-4">
                            <img 
                                src={hardwareDisplay} 
                                alt="Hardware Supplies" 
                                className="w-full h-full object-cover rounded-[30px]"
                            />
                        </div>
                    </div>

                    {/* Right Side: Create Account Card */}
                    <div className="w-full max-w-[650px] bg-[#e4e4e4] rounded-[30px] md:rounded-[40px] p-8 md:p-12 lg:p-16 border-2 border-[#1a4724] shadow-2xl relative overflow-hidden">
                        <div className="flex flex-col items-center">
                            <h2 className="text-[32px] md:text-[48px] font-black text-black tracking-tighter mb-2 leading-none">CREATE ACCOUNT</h2>
                            <div className="w-full h-[1px] bg-gray-300 mb-10 mt-2"></div>
                            
                            <form onSubmit={handleSignup} className="w-full space-y-7 flex flex-col items-center">
                                {/* Username Field */}
                                <div className="flex items-center gap-6 w-full max-w-[500px]">
                                    <div className="shrink-0 w-8 flex justify-center">
                                        <svg className="w-7 h-7 text-[#1a4724]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        className="flex-1 h-12 px-6 bg-white rounded-xl text-black font-bold text-sm focus:outline-none shadow-sm placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                                {/* Phone Field */}
                                <div className="flex items-center gap-6 w-full max-w-[500px]">
                                    <div className="shrink-0 w-8 flex justify-center">
                                        <svg className="w-7 h-7 text-[#1a4724]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="flex-1 h-12 px-6 bg-white rounded-xl text-black font-bold text-sm focus:outline-none shadow-sm placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="flex items-center gap-6 w-full max-w-[500px]">
                                    <div className="shrink-0 w-8 flex justify-center">
                                        <svg className="w-7 h-7 text-[#1a4724]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                        <div className="relative flex-1">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                className="w-full h-12 px-6 bg-white rounded-xl text-black font-bold text-sm focus:outline-none shadow-sm placeholder:text-gray-400"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a4724] transition-colors"
                                            >
                                                {showPassword ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="flex items-center gap-6 w-full max-w-[500px]">
                                    <div className="shrink-0 w-8 flex justify-center">
                                        <svg className="w-7 h-7 text-[#1a4724]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                        <div className="relative flex-1">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                                className="w-full h-12 px-6 bg-white rounded-xl text-black font-bold text-sm focus:outline-none shadow-sm placeholder:text-gray-400"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a4724] transition-colors"
                                            >
                                                {showConfirmPassword ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                </div>

                                {/* Log In Link */}
                                <p className="text-[13px] font-bold text-gray-700">
                                    Already have an account? <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer hover:underline">Log In</span>
                                </p>

                                {/* Submit Action */}
                                <button type="submit" className="w-full max-w-[400px] py-3.5 bg-[#1a4724] hover:bg-[#143c1f] text-white font-black text-lg md:text-xl rounded-xl transition-all duration-300 shadow-lg uppercase tracking-wider mt-6">
                                    CREATE ACCOUNT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
