import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../maximshardwarelogo.png';
import { getCart } from './cartUtils';

export default function Navbar() {
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    React.useEffect(() => {
        const updateCartCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
        };

        updateCartCount();
        window.addEventListener('storage', updateCartCount);
        window.addEventListener('cartUpdated', updateCartCount);

        return () => {
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

    const categories = ["All", "Cement", "Nails", "Paint", "Plumbing", "Electrical", "Tools"];

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.dispatchEvent(new Event('cartUpdated')); // Reset cart count
        navigate('/');
    };

    const userDisplay = {
        name: currentUser.username || "Guest User",
        avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username || 'User')}&background=67bc45&color=fff&size=128`
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-10 py-5 bg-[#f0f0f0] border-b border-gray-200 sticky top-0 z-50">
            <div className="flex items-center gap-2 cursor-pointer z-50" onClick={() => navigate("/main-dashboard")}>
                <img src={logo} alt="Maxims Hardware" className="h-10 md:h-12 w-auto object-contain" />
            </div>

            <ul className="hidden md:flex gap-4 text-black font-extrabold text-[13px] tracking-wide items-center ml-10">
                <li className="cursor-pointer transition-all px-4 py-1.5 rounded-full uppercase hover:text-[#5ca84a]" onClick={() => navigate("/main-dashboard")}>HOME</li>
                <li className="cursor-pointer transition-all px-4 py-1.5 rounded-full uppercase hover:text-[#5ca84a]" onClick={() => navigate("/about")}>ABOUT</li>
                <li className="cursor-pointer transition-all px-4 py-1.5 rounded-full uppercase hover:text-[#5ca84a]" onClick={() => navigate("/contact")}>CONTACT</li>
                <li className="relative">
                    <div className="cursor-pointer transition-all px-4 py-1.5 rounded-full uppercase flex items-center gap-1 font-extrabold hover:text-[#5ca84a]" onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}>
                        PRODUCTS
                        <svg className={`w-4 h-4 text-gray-600 transition-transform ${isProductsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    {isProductsMenuOpen && (
                        <div className="absolute top-full left-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                            <div className="py-2">
                                {categories.slice(1).map((cat) => (
                                    <button 
                                        key={cat} 
                                        className="w-full text-left px-5 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-[#5ca84a] font-bold transition-colors"
                                        onClick={() => {
                                            setIsProductsMenuOpen(false);
                                            navigate(`/products/${cat.toLowerCase()}`);
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                                <div className="border-t border-gray-100 my-1"></div>
                                <button className="w-full text-left px-5 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-[#5ca84a] font-bold transition-colors" onClick={() => { setIsProductsMenuOpen(false); navigate('/products'); }}>All products</button>
                            </div>
                        </div>
                    )}
                </li>
            </ul>

            <div className="hidden md:flex items-center gap-6 ml-auto">
                {isLoggedIn && (
                    <button onClick={() => navigate('/add-to-cart')} className="relative p-2 text-gray-600 hover:text-[#5ca84a] transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </button>
                )}

                {isLoggedIn ? (
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#3d3d3d] flex items-center justify-center cursor-pointer shadow-md hover:bg-black transition overflow-hidden border-2 border-[#67bc45]" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                            <img src={userDisplay.avatar} alt="User" className="w-full h-full object-cover" />
                        </div>
                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-bold text-[#1a4724] truncate uppercase">{userDisplay.name}</p>
                                </div>
                                <div className="py-1">
                                    <button onClick={() => { setIsUserMenuOpen(false); navigate('/profile'); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        Profile
                                    </button>
                                    <button onClick={() => { setIsUserMenuOpen(false); navigate('/my-orders'); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h2m7-2l3-3m0 0l-3-3m3 3H9"></path></svg>
                                        My Orders
                                    </button>
                                </div>
                                <div className="py-1 border-t border-gray-100">
                                    <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-medium transition-colors" onClick={handleLogout}>
                                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <button className="bg-[#5ca84a] text-white px-6 py-2 rounded-md font-bold text-sm tracking-wide hover:bg-[#4ea13b] transition" onClick={() => navigate('/login')}>LOGIN</button>
                        <button className="text-black font-extrabold text-sm hover:text-[#5ca84a] transition uppercase" onClick={() => navigate('/signup')}>SIGN UP</button>
                    </div>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center ml-auto gap-4">
                {isLoggedIn && (
                    <button onClick={() => navigate('/add-to-cart')} className="relative text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </button>
                )}
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2">
                    <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-b border-gray-200 z-40 flex flex-col">
                    <button className="text-left font-extrabold text-[15px] text-gray-700 hover:bg-gray-50 uppercase px-6 py-4 border-b border-gray-100" onClick={() => { setIsMobileMenuOpen(false); navigate("/main-dashboard"); }}>HOME</button>
                    <button className="text-left font-extrabold text-[15px] text-gray-700 hover:bg-gray-50 uppercase px-6 py-4 border-b border-gray-100" onClick={() => { setIsMobileMenuOpen(false); navigate("/about"); }}>ABOUT</button>
                    <button className="text-left font-extrabold text-[15px] text-gray-700 hover:bg-gray-50 uppercase px-6 py-4 border-b border-gray-100" onClick={() => { setIsMobileMenuOpen(false); navigate("/contact"); }}>CONTACT</button>
                    <button className="text-left font-extrabold text-[15px] text-gray-700 hover:bg-gray-50 uppercase px-6 py-4 border-b border-gray-100 flex items-center justify-between" onClick={() => { setIsMobileMenuOpen(false); navigate("/products"); }}>
                        PRODUCTS
                    </button>
                    <div className="px-6 py-4 bg-gray-50 flex flex-col gap-3">
                        {isLoggedIn ? (
                            <>
                                <button className="text-left font-bold text-[14px] text-gray-700 py-2 flex items-center gap-2" onClick={() => { setIsMobileMenuOpen(false); navigate('/profile'); }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    Profile
                                </button>
                                <button className="text-left font-bold text-[14px] text-red-600 py-2 flex items-center gap-2" onClick={handleLogout}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="w-full py-3 bg-[#5ca84a] text-white font-bold rounded-lg" onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }}>LOGIN</button>
                                <button className="w-full text-center text-black font-extrabold text-[15px] py-2" onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }}>SIGN UP</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
