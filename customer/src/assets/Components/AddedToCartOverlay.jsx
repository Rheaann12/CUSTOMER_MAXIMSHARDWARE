import React from 'react';

export default function AddedToCartOverlay({ isVisible, productName }) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce-short">
      <div className="bg-[#1a4724] text-white px-8 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#67bc45]/30 backdrop-blur-sm">
        <div className="w-6 h-6 bg-[#67bc45] rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <span className="font-black text-sm uppercase tracking-tight">{productName} added to cart!</span>
      </div>
    </div>
  );
}
