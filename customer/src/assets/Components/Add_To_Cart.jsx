import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { getCart, updateCartQuantity, removeFromCart, clearCart } from './cartUtils';

export default function Add_To_Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleUpdateQuantity = (id, delta) => {
    const updatedCart = updateCartQuantity(id, delta);
    setCartItems(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = removeFromCart(id);
    setCartItems(updatedCart);
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    return parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
  const tax = 4; // Flat 4 pesos tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen font-body flex flex-col bg-[#f4f7f6]">
      <Navbar />

      <div className="flex-1 w-full pb-20">
        <div className="max-w-[1300px] mx-auto px-4 md:px-10 pt-10 flex flex-col relative z-10">
          
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-[32px] md:text-[36px] text-[#2c2c2c] font-black tracking-tighter font-serif uppercase">Shopping Cart</h1>
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-black text-gray-400 uppercase tracking-widest">{cartItems.length} items</span>
              {cartItems.length > 0 && (
                <button 
                  onClick={handleClearCart}
                  className="text-[11px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest border-b-2 border-red-200 hover:border-red-500 transition-all pb-0.5"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Cart Items List */}
            <div className="flex-1">
              {!cartItems || cartItems.length === 0 ? (
                <div className="bg-white rounded-[30px] p-16 shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </div>
                  <p className="text-xl font-black text-black uppercase tracking-tight mb-2">Your cart is empty</p>
                  <p className="text-gray-500 font-bold text-sm mb-8">Looks like you haven't added anything to your cart yet.</p>
                  <button onClick={() => navigate('/products')} className="px-8 py-3 bg-[#1a4724] text-white rounded-xl font-black text-sm hover:bg-[#143c1f] transition shadow-lg uppercase tracking-wider">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-[25px] p-6 shadow-xl border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:border-[#67bc45]/30 transition-all duration-300">
                      <div className="w-24 h-24 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center p-4 overflow-hidden">
                        <img src={item.img || item.imgSrc || `https://placehold.co/200x200/d6d6d6/888888?text=${encodeURIComponent(item.title)}`} alt={item.title} className="max-w-full max-h-full object-contain" />
                      </div>
                      
                      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                        <div className="flex flex-col text-center sm:text-left">
                          <h3 className="text-lg font-black text-black leading-tight mb-1 font-serif uppercase">{item.title}</h3>
                          <p className="text-[11px] font-black text-[#67bc45] uppercase tracking-widest">{item.brand}</p>
                        </div>

                        <div className="flex items-center gap-8">
                          {/* Quantity Control */}
                          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                            <button onClick={() => handleUpdateQuantity(item.id, -1)} className="text-gray-400 hover:text-black font-black text-xl transition">-</button>
                            <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.id, 1)} className="text-gray-400 hover:text-black font-black text-xl transition">+</button>
                          </div>

                          {/* Price */}
                          <div className="w-24 text-right">
                            <span className="text-lg font-black text-black">P {(parsePrice(item.price) * item.quantity).toLocaleString()}</span>
                          </div>

                          {/* Remove */}
                          <button onClick={() => handleRemove(item.id)} className="w-10 h-10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="bg-white rounded-[30px] p-8 shadow-2xl border border-gray-100 sticky top-[100px]">
                <h2 className="text-xl font-black text-black mb-6 uppercase tracking-tight font-serif border-b pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span className="text-black">P {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-wider">
                    <span>Tax</span>
                    <span className="text-black">P {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-500 uppercase tracking-wider">
                    <span>Shipping</span>
                    <span className="text-green-600 font-black">Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-end">
                  <span className="text-base font-black text-gray-900 uppercase tracking-widest">Total Amount</span>
                  <span className="text-3xl font-black text-[#1a4724] leading-none">P {total.toLocaleString()}</span>
                </div>

                <button 
                  disabled={cartItems.length === 0}
                  onClick={() => navigate('/delivery')}
                  className={`w-full py-4 text-white font-black text-base rounded-2xl tracking-widest transition-all shadow-lg uppercase ${cartItems.length > 0 ? 'bg-[#1a4724] hover:bg-[#143c1f] hover:-translate-y-1' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={() => navigate('/products')}
                  className="w-full py-3 mt-4 text-[#1a4724] bg-transparent border-2 border-[#1a4724] font-black text-sm rounded-2xl hover:bg-[#1a4724] hover:text-white transition-all uppercase tracking-widest"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
