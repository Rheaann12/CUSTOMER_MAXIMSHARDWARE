import React from 'react';

export default function ProductDetailsOverlay({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  // Placeholder details if none provided
  const details = product.details || "High-quality industrial grade tool designed for precision and durability. Manufactured with premium materials to ensure long-lasting performance in various construction and DIY projects.";
  const usage = product.usage || ["Construction Sites", "Home Improvement", "Professional Workshops", "DIY Projects"];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 md:p-6 backdrop-blur-sm bg-black/50 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-[800px] h-fit max-h-[90vh] rounded-[24px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-6 md:right-6 z-20 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-all group"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Side: Product Image */}
        <div className="w-full md:w-[42%] bg-[#f8f9f8] p-4 md:p-8 flex items-center justify-center relative min-h-[180px] md:min-h-auto">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#67bc45 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
          <img 
            src={product.img || product.imgSrc || `https://placehold.co/600x600/f8f9f8/888888?text=${encodeURIComponent(product.title)}`} 
            alt={product.title} 
            className="max-w-full max-h-[150px] md:max-h-[340px] object-contain drop-shadow-lg relative z-10"
          />
        </div>

        {/* Right Side: Product Info */}
        <div className="w-full md:w-[58%] p-5 md:p-8 flex flex-col overflow-y-auto">
          <div className="mb-3 md:mb-5">
            <span className="text-[9px] font-black text-[#67bc45] uppercase tracking-[0.2em] mb-1 block">{product.brand || "Maxims Select"}</span>
            <h2 className="text-xl md:text-2xl font-black text-black leading-tight tracking-tight uppercase font-serif">{product.title}</h2>
          </div>

          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <span className="text-[24px] md:text-[32px] font-black text-[#1a4724] leading-none">{product.price}</span>
            <div className="px-2 py-0.5 bg-green-50 text-[#1a4724] text-[8px] font-black rounded-full border border-green-100 uppercase tracking-widest">Available</div>
          </div>

          <div className="space-y-4 md:space-y-6 flex-1">
            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Details</h4>
              <p className="text-gray-600 font-medium leading-relaxed text-[12px] md:text-sm">
                {details}
              </p>
            </div>

            {/* Usage */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Best For</h4>
              <div className="flex flex-wrap gap-1.5">
                {usage.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100 transition-colors">
                    <div className="w-1 h-1 bg-[#67bc45] rounded-full"></div>
                    <span className="text-[9px] font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-4 md:mt-auto">
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full py-3.5 md:py-4 bg-[#1a4724] hover:bg-[#143c1f] text-white font-black rounded-lg shadow-md transition-all hover:-translate-y-0.5 uppercase tracking-widest flex items-center justify-center gap-2 text-xs group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
