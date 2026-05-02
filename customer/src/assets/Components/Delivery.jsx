import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { getCart, clearCart } from './cartUtils';

export default function Delivery() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(getCart());
    }, []);

    const parsePrice = (priceStr) => {
        if (typeof priceStr === 'number') return priceStr;
        return parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
    const shippingFee = cartItems.length > 0 ? 150 : 0;
    const total = subtotal + shippingFee;

    const [formData, setFormData] = useState({
        fullName: currentUser.username || '',
        phone: currentUser.phone || '',
        address: '',
        barangay: '',
        city: 'Gingoog City',
        paymentMethod: 'Cash on Delivery',
        notes: ''
    });

    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const newOrder = {
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            status: "Processing",
            total: `P ${total.toLocaleString()}`,
            items: cartItems.map(i => `${i.title} (x${i.quantity})`).join(', '),
            details: formData
        };

        // Save order to localStorage for this user
        const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
        const userOrders = allOrders[currentUser.phone] || [];
        allOrders[currentUser.phone] = [newOrder, ...userOrders];
        localStorage.setItem('orders', JSON.stringify(allOrders));

        // Clear cart
        clearCart();

        setShowSuccessOverlay(true);
        setTimeout(() => {
            navigate('/profile');
        }, 3000);
    };

    return (
        <div className="min-h-screen font-body flex flex-col bg-[#f4f7f6]">
            <Navbar />

            <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-10 py-10">
                <h1 className="text-[32px] font-black text-black mb-8 uppercase tracking-tighter font-serif">Checkout & Delivery</h1>
                
                <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Left Side: Delivery Details */}
                    <div className="flex-1 space-y-8">
                        {/* Shipping Information */}
                        <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-100">
                            <h2 className="text-xl font-black text-[#1a4724] mb-6 uppercase tracking-tight flex items-center gap-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                Shipping Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        className="w-full h-12 px-5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#67bc45] font-bold text-sm" 
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full h-12 px-5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#67bc45] font-bold text-sm" 
                                        placeholder="09XXXXXXXXX"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Street Address / House Number</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        className="w-full h-12 px-5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#67bc45] font-bold text-sm" 
                                        placeholder="e.g. 123 Rizal St."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Barangay</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.barangay}
                                        onChange={(e) => setFormData({...formData, barangay: e.target.value})}
                                        className="w-full h-12 px-5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#67bc45] font-bold text-sm" 
                                        placeholder="Enter Barangay"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                                    <input 
                                        type="text" 
                                        readOnly
                                        value={formData.city}
                                        className="w-full h-12 px-5 bg-gray-100 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm cursor-not-allowed" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-100">
                            <h2 className="text-xl font-black text-[#1a4724] mb-6 uppercase tracking-tight flex items-center gap-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                Payment Method
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {['Cash on Delivery', 'GCash', 'Bank Transfer'].map((method) => (
                                    <label key={method} className={`flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${formData.paymentMethod === method ? 'border-[#67bc45] bg-green-50 shadow-md' : 'border-gray-100 bg-gray-50 hover:bg-white'}`}>
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            className="hidden" 
                                            value={method}
                                            checked={formData.paymentMethod === method}
                                            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                                        />
                                        <span className={`text-sm font-black uppercase tracking-tight ${formData.paymentMethod === method ? 'text-[#1a4724]' : 'text-gray-500'}`}>{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Order Notes */}
                        <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-100">
                            <h2 className="text-xl font-black text-[#1a4724] mb-6 uppercase tracking-tight">Order Notes (Optional)</h2>
                            <textarea 
                                rows="3" 
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#67bc45] font-bold text-sm resize-none" 
                                placeholder="Special instructions for delivery..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="w-full lg:w-[400px] shrink-0">
                        <div className="bg-white rounded-[30px] p-8 shadow-xl border border-gray-100 sticky top-[100px]">
                            <h2 className="text-[22px] font-black text-black mb-6 uppercase tracking-tight font-serif border-b pb-4">Checkout Summary</h2>
                            
                            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-800 leading-tight">{item.title}</p>
                                                <p className="text-[11px] font-black text-gray-400">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-black text-black ml-4">P {(parsePrice(item.price) * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-sm italic">No items in cart</p>
                                )}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-100 mb-8">
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="text-black">P {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span>Shipping Fee</span>
                                    <span className="text-black">P {shippingFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                                    <span className="text-base font-black text-gray-900 uppercase tracking-tight">Total</span>
                                    <span className="text-[28px] font-black text-[#1a4724] leading-none">P {total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={cartItems.length === 0}
                                className={`w-full py-4 text-white font-black text-lg rounded-2xl transition-all duration-300 shadow-lg uppercase tracking-wider ${cartItems.length > 0 ? 'bg-[#1a4724] hover:bg-[#143c1f] hover:-translate-y-1' : 'bg-gray-300 cursor-not-allowed'}`}
                            >
                                Place Order Now
                            </button>
                            
                            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                                Secure Transaction
                            </div>
                        </div>
                    </div>

                </form>
            </div>

            {/* Success Overlay */}
            {showSuccessOverlay && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] p-10 md:p-16 max-w-lg w-full text-center shadow-2xl transform transition-all animate-bounce-short">
                        <div className="w-24 h-24 bg-[#def4d4] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <svg className="w-12 h-12 text-[#1a4724]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-3xl font-black text-black mb-4 uppercase tracking-tighter font-serif">Order Placed!</h2>
                        <p className="text-gray-500 font-bold mb-8">Thank you for choosing Maxims Hardware. Your order is now being processed.</p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-2 h-2 bg-[#67bc45] rounded-full animate-pulse"></div>
                            <p className="text-[#1a4724] font-black text-xs uppercase tracking-widest">Redirecting to your profile...</p>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
}
