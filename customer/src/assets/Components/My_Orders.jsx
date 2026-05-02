import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function My_Orders() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('All');
    const [showCancelOverlay, setShowCancelOverlay] = useState(false);
    const [showDetailsOverlay, setShowDetailsOverlay] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

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

    const filteredOrders = orders.filter(order => {
        if (filter === 'All') return true;
        return order.status === filter;
    });

    const handleCancelOrder = (orderId) => {
        setOrderToCancel(orderId);
        setShowCancelOverlay(true);
    };

    const confirmCancel = () => {
        const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
        const userOrders = allOrders[currentUser.phone] || [];
        
        const updatedOrders = userOrders.map(order => {
            if (order.id === orderToCancel) {
                return { ...order, status: 'Cancelled' };
            }
            return order;
        });

        allOrders[currentUser.phone] = updatedOrders;
        localStorage.setItem('orders', JSON.stringify(allOrders));
        setOrders(updatedOrders);
        setShowCancelOverlay(false);
        setOrderToCancel(null);
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowDetailsOverlay(true);
    };

    const statusColors = {
        'Processing': 'bg-blue-50 text-blue-600 border-blue-100',
        'Delivered': 'bg-green-50 text-green-600 border-green-100',
        'Cancelled': 'bg-red-50 text-red-600 border-red-100',
        'In Transit': 'bg-yellow-50 text-yellow-600 border-yellow-100'
    };

    return (
        <div className="min-h-screen bg-[#f4f7f6] font-body flex flex-col">
            <Navbar />

            {/* Header Section */}
            <div className="bg-[#1a4724] pt-16 pb-24 px-6 relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto relative z-10">
                    <h1 className="text-[42px] md:text-[56px] font-black text-white tracking-tighter uppercase font-serif mb-4">My Orders</h1>
                    <p className="text-[#a8d39c] font-bold uppercase tracking-widest text-sm">Track and manage your purchases from Maxims Hardware</p>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#67bc45] opacity-5 rounded-full -mr-48 -mt-48"></div>
            </div>

            <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 -mt-12 relative z-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Sidebar: Filters */}
                    <div className="w-full lg:w-[280px] shrink-0">
                        <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-100 sticky top-24">
                            <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 ml-1">Filter Status</h2>
                            <div className="space-y-2">
                                {['All', 'Processing', 'In Transit', 'Delivered', 'Cancelled'].map((f) => (
                                    <button 
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`w-full text-left px-5 py-3 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-between ${filter === f ? 'bg-[#1a4724] text-white shadow-lg translate-x-2' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                    >
                                        {f}
                                        {filter === f && <div className="w-1.5 h-1.5 bg-[#67bc45] rounded-full"></div>}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="mt-10 p-5 bg-[#def4d4] rounded-2xl border border-[#bddb8a]">
                                <p className="text-[10px] font-black text-[#1a4724] uppercase mb-2 tracking-widest">Need Help?</p>
                                <p className="text-xs font-bold text-gray-700 leading-snug mb-3">Questions about an order? Contact our support team.</p>
                                <button onClick={() => navigate('/contact')} className="text-[11px] font-black text-[#1a4724] uppercase underline hover:no-underline">Contact Support</button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Order List */}
                    <div className="flex-1 space-y-6">
                        {filteredOrders.length === 0 ? (
                            <div className="bg-white rounded-[40px] p-16 text-center shadow-xl border border-gray-100">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                </div>
                                <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tighter">No {filter !== 'All' ? filter.toLowerCase() : ''} orders found</h3>
                                <p className="text-gray-400 font-bold mb-8">Looks like you haven't placed any {filter !== 'All' ? filter.toLowerCase() : ''} orders yet.</p>
                                <button onClick={() => navigate('/products')} className="px-10 py-4 bg-[#1a4724] text-white font-black rounded-2xl shadow-lg hover:bg-[#143c1f] transition-all uppercase tracking-widest text-xs">Start Shopping</button>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order.id} className="bg-white rounded-[30px] shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                    {/* Order Header */}
                                    <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-6">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                                <p className="text-lg font-black text-black tracking-tight">{order.id}</p>
                                            </div>
                                            <div className="w-[1px] h-10 bg-gray-200 hidden md:block"></div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date Placed</p>
                                                <p className="text-sm font-bold text-gray-700">{order.date}</p>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full border-2 text-[11px] font-black uppercase tracking-widest ${statusColors[order.status]}`}>
                                            {order.status}
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-8">
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                            <div className="flex-1">
                                                <h4 className="text-[11px] font-black text-[#67bc45] uppercase tracking-widest mb-3">Items Purchased</h4>
                                                <p className="text-lg font-bold text-gray-800 leading-tight mb-4">{order.items}</p>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Total Amount:</span>
                                                    <span className="text-[22px] font-black text-[#1a4724]">{order.total}</span>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                                                <button 
                                                    onClick={() => handleViewDetails(order)}
                                                    className="flex-1 sm:w-40 py-4 bg-[#1a4724] text-white font-black rounded-2xl shadow-lg hover:bg-[#143c1f] transition-all uppercase tracking-widest text-[11px]"
                                                >
                                                    View Details
                                                </button>
                                                {order.status === 'Processing' ? (
                                                    <button 
                                                        onClick={() => handleCancelOrder(order.id)}
                                                        className="flex-1 sm:w-40 py-4 bg-white border-2 border-red-100 text-red-500 font-black rounded-2xl hover:bg-red-50 hover:border-red-500 transition-all uppercase tracking-widest text-[11px]"
                                                    >
                                                        Cancel Order
                                                    </button>
                                                ) : (
                                                    <button onClick={() => navigate('/products')} className="flex-1 sm:w-40 py-4 bg-white border-2 border-gray-100 text-gray-700 font-black rounded-2xl hover:border-[#67bc45] hover:text-[#67bc45] transition-all uppercase tracking-widest text-[11px]">Buy Again</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Footer - Progress Bar */}
                                    <div className="px-8 pb-8">
                                        <div className="relative pt-6">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-full"></div>
                                            <div 
                                                className={`absolute top-0 left-0 h-1 rounded-full transition-all duration-1000 ${order.status === 'Delivered' ? 'w-full bg-[#67bc45]' : order.status === 'In Transit' ? 'w-2/3 bg-yellow-400' : 'w-1/3 bg-[#1a4724]'}`}
                                            ></div>
                                            <div className="flex justify-between mt-4">
                                                <div className="text-center">
                                                    <p className={`text-[9px] font-black uppercase tracking-tighter ${order.status === 'Processing' ? 'text-[#1a4724]' : 'text-gray-300'}`}>Processing</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className={`text-[9px] font-black uppercase tracking-tighter ${order.status === 'In Transit' ? 'text-yellow-500' : 'text-gray-300'}`}>In Transit</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className={`text-[9px] font-black uppercase tracking-tighter ${order.status === 'Delivered' ? 'text-[#67bc45]' : 'text-gray-300'}`}>Delivered</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>

            {/* Custom Cancel Overlay */}
            {showCancelOverlay && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] p-8 md:p-12 max-w-md w-full text-center shadow-2xl animate-scale-up">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h3 className="text-2xl font-black text-black mb-3 uppercase tracking-tighter font-serif">Cancel Order?</h3>
                        <p className="text-gray-500 font-bold mb-8">Are you sure you want to cancel this order? This action cannot be undone.</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={() => setShowCancelOverlay(false)}
                                className="flex-1 py-4 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-[11px]"
                            >
                                No, Keep Order
                            </button>
                            <button 
                                onClick={confirmCancel}
                                className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl shadow-lg shadow-red-200 hover:bg-red-600 hover:-translate-y-1 transition-all uppercase tracking-widest text-[11px]"
                            >
                                Yes, Cancel It
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Details Overlay */}
            {showDetailsOverlay && selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-up">
                        <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                            <h3 className="text-2xl font-black text-black uppercase tracking-tighter font-serif">Order Details</h3>
                            <button onClick={() => setShowDetailsOverlay(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        
                        <div className="p-8">
                            {/* Order Info Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                    <p className="text-sm font-black text-black">{selectedOrder.id}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date</p>
                                    <p className="text-sm font-black text-black">{selectedOrder.date}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full border ${statusColors[selectedOrder.status]}`}>{selectedOrder.status}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                                    <p className="text-sm font-black text-[#1a4724]">{selectedOrder.total}</p>
                                </div>
                            </div>

                            {/* Items Section */}
                            <div className="mb-10">
                                <h4 className="text-[11px] font-black text-[#67bc45] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                    Items Purchased
                                </h4>
                                <div className="bg-gray-50/50 rounded-2xl p-5 border border-dashed border-gray-200">
                                    <p className="text-sm font-bold text-gray-700 leading-relaxed">{selectedOrder.items}</p>
                                </div>
                            </div>

                            {/* Delivery Info Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-[11px] font-black text-[#67bc45] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                        Shipping Address
                                    </h4>
                                    <div className="space-y-1">
                                        <p className="text-sm font-black text-black">{selectedOrder.details?.fullName}</p>
                                        <p className="text-sm font-bold text-gray-600">{selectedOrder.details?.address}</p>
                                        <p className="text-sm font-bold text-gray-600">{selectedOrder.details?.barangay}, {selectedOrder.details?.city}</p>
                                        <p className="text-sm font-black text-gray-400 mt-2">{selectedOrder.details?.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-[#67bc45] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                        Payment & Method
                                    </h4>
                                    <div className="space-y-1">
                                        <p className="text-sm font-black text-black">{selectedOrder.details?.paymentMethod}</p>
                                        <div className="mt-4 p-4 bg-[#def4d4]/30 rounded-xl border border-[#def4d4]">
                                            <p className="text-[10px] font-black text-[#1a4724] uppercase mb-1">Notes:</p>
                                            <p className="text-xs font-bold text-gray-600">{selectedOrder.details?.notes || "No special instructions provided."}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={() => setShowDetailsOverlay(false)}
                                className="px-8 py-3 bg-[#1a4724] text-white font-black rounded-xl shadow-lg hover:bg-[#143c1f] transition-all uppercase tracking-widest text-[11px]"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
