import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function User_Profile() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        
        // Load orders for this user
        const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
        const userOrders = allOrders[currentUser.phone] || [];
        setOrders(userOrders);
    }, [isLoggedIn, navigate, currentUser.phone]);

    const userDisplay = {
        name: currentUser.username || "Guest User",
        email: `${(currentUser.username || 'user').toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        phone: currentUser.phone || "No phone provided",
        address: "Gingoog City, Misamis Oriental",
        memberSince: currentUser.memberSince || "May 2026",
        avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username || 'User')}&background=67bc45&color=fff&size=128`
    };

    return (
        <div className="min-h-screen bg-[#f4f7f6] font-body flex flex-col">
            <Navbar />

            {/* Main Content */}
            <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Panel: User Summary */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                        <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full border-4 border-[#67bc45] p-1 mb-4 shadow-lg">
                                <img src={userDisplay.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <h2 className="text-2xl font-black text-black tracking-tight mb-1 uppercase">{userDisplay.name}</h2>
                            <p className="text-gray-500 font-bold text-sm mb-6 uppercase tracking-wider">Member since {userDisplay.memberSince}</p>
                            <div className="w-full h-[1px] bg-gray-100 mb-6"></div>
                            <div className="w-full space-y-4">
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-black text-[#67bc45] uppercase tracking-widest mb-1">Email Address</span>
                                    <span className="text-sm font-bold text-gray-800">{userDisplay.email}</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-black text-[#67bc45] uppercase tracking-widest mb-1">Phone Number</span>
                                    <span className="text-sm font-bold text-gray-800">{userDisplay.phone}</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-black text-[#67bc45] uppercase tracking-widest mb-1">Location</span>
                                    <span className="text-sm font-bold text-gray-800 leading-relaxed">{userDisplay.address}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate('/edit-profile')}
                                className="w-full mt-8 py-3 bg-[#1a4724] hover:bg-[#143c1f] text-white font-black text-sm rounded-xl transition-all shadow-lg uppercase tracking-wider"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Orders & Activity */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6">
                        {/* Order History */}
                        <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-100 min-h-[400px]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-black uppercase tracking-tight">Order History</h3>
                                {orders.length > 0 && <button onClick={() => navigate('/my-orders')} className="text-[12px] font-black text-[#67bc45] uppercase hover:underline">View All</button>}
                            </div>
                            
                            {orders.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                    </div>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No order history yet</p>
                                    <button onClick={() => navigate('/products')} className="mt-4 text-[#67bc45] font-black text-[12px] uppercase hover:underline tracking-widest">Start Shopping Now</button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="group p-5 rounded-2xl bg-[#f8f9fa] border border-transparent hover:border-[#67bc45]/30 hover:bg-white hover:shadow-md transition-all duration-300">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#1a4724]">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-black text-black">{order.id}</span>
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${
                                                                order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 
                                                                'bg-red-100 text-red-600'
                                                            }`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-[12px] font-bold text-gray-500 mt-0.5 truncate max-w-[250px]">{order.items}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                                                    <div className="md:mr-8 text-left md:text-right">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                                                        <p className="text-[13px] font-bold text-gray-800">{order.date}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</p>
                                                        <p className="text-[13px] font-black text-black">{order.total}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#def4d4] rounded-[25px] p-6 shadow-sm border border-[#bddb8a] flex items-center gap-5">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-[#1d4d2b]">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-black uppercase tracking-tight leading-none mb-1">Support Center</h4>
                                    <p className="text-[11px] font-bold text-gray-700 leading-tight">Need help with an order? Our team is here 24/7.</p>
                                </div>
                            </div>
                            <div className="bg-[#daeca9] rounded-[25px] p-6 shadow-sm border border-[#bddb8a] flex items-center gap-5">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-[#1d4d2b]">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-black uppercase tracking-tight leading-none mb-1">Fast Delivery</h4>
                                    <p className="text-[11px] font-bold text-gray-700 leading-tight">Your orders are delivered within 24-48 hours.</p>
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
