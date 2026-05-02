import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { addToCart } from './cartUtils';
import AddedToCartOverlay from './AddedToCartOverlay';
import ProductDetailsOverlay from './ProductDetailsOverlay';

export default function Product_Tools() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Tools");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Cement", "Nails", "Paint", "Plumbing", "Electrical", "Tools"];

  const toolProducts = [
    { id: 1, title: "Hammer Claw", brand: "Tools", price: "P 245", img: "https://www.totaltools.com.au/media/catalog/product/55817-stanley-20oz-565g-hercules-fibreglass-claw-hammer-51061-HERO.jpg?optimize=medium&bg-color=255" },
    { id: 2, title: "Screwdriver Set", brand: "Tools", price: "P 450", img: "https://www.stanleytools.com/NA/product/images/3000x3000x96/STHT60025/STHT60025_1.jpg" },
    { id: 3, title: "Adjustable Wrench", brand: "Tools", price: "P 350", img: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/383250a5-beb0-43ca-ad9e-5c7021cd529b.__CR0,0,970,600_PT0_SX970_V1___.jpg" },
    { id: 4, title: "Hand Saw", brand: "Tools", price: "P 285", img: "https://i.pinimg.com/originals/f0/88/4c/f0884c1e807d9e465c6ef428d8a18788.jpg" },
    { id: 5, title: "Level Bar", brand: "Tools", price: "P 185", img: "http://www.gigatools.ph/cdn/shop/files/STANLEYLEVELBAR.jpg?v=1695431103" },
    { id: 6, title: "Tape Measure", brand: "Tools", price: "P 125", img: "https://i5.walmartimages.com/asr/bc5115aa-6aef-4ef1-b8f4-2892d16b0224_1.703ae051dc43ce85d21ec8934712690a.jpeg" },
  ];

  // Filtering Logic
  const filteredProducts = toolProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));


  const [showAddedOverlay, setShowAddedOverlay] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const triggerOverlay = (name) => {
    setAddedProductName(name);
    setShowAddedOverlay(true);
    setTimeout(() => setShowAddedOverlay(false), 2000);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const handleAddToCart = (product) => {
    const success = addToCart(product);
    if (success) {
      triggerOverlay(product.title);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen font-body flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div
        className="flex-1 w-full relative"
        style={{
          backgroundColor: '#dbdbdb',
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-[1300px] mx-auto px-4 md:px-10 pt-8 md:pt-10 pb-16 flex flex-col items-center relative z-10">

          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full mb-6 gap-4 md:gap-6">
            <h1 className="text-[24px] md:text-[32px] text-[#2c2c2c] font-normal tracking-tight">Tools Category</h1>
            <div className="relative w-full md:w-auto">
              <div className="flex items-center bg-white rounded-md px-4 py-2 w-full md:w-[400px] shadow-sm border border-gray-200">
                <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input
                  type="text"
                  placeholder="Search Tools..."
                  className="w-full bg-transparent focus:outline-none text-[14px] text-gray-700 placeholder-gray-400 font-medium"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Categories Filter Bar */}
          <div className="w-full bg-[#ccddc2] rounded-xl py-3 px-4 flex gap-3 md:gap-4 md:justify-center mb-8 md:mb-10 shadow-sm border border-[#b8cfa9]/40 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === "All") navigate('/products');
                  else if (cat === "Cement") navigate('/products/cement');
                  else if (cat === "Nails") navigate('/products/nails');
                  else if (cat === "Paint") navigate('/products/paint');
                  else if (cat === "Plumbing") navigate('/products/plumbing');
                  else if (cat === "Electrical") navigate('/products/electrical');
                  else if (cat === "Tools") navigate('/products/tools');
                  else setActiveCategory(cat);
                }}
                className={`px-4 md:px-6 py-2 rounded-lg font-medium text-[13px] md:text-[14px] transition-all duration-300 shadow-sm whitespace-nowrap shrink-0 ${activeCategory === cat ? 'bg-[#5ea73c] text-white shadow-md' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full flex flex-col items-center gap-6">

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-x-6 md:gap-y-8 justify-items-center w-full mt-4 min-h-[400px]">
              {currentItems.length > 0 ? (
                currentItems.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleProductClick(p)}
                    className="relative bg-[#d6d6d6] rounded-[12px] md:rounded-[16px] p-3 md:p-5 flex flex-col shadow-md border border-white/40 transition-transform transform hover:-translate-y-1 w-full cursor-pointer group"
                  >
                    <div className="flex-1 w-full flex items-center justify-center mb-3 md:mb-4 overflow-hidden min-h-[100px] md:min-h-[160px]">
                      <img src={p.img || `https://placehold.co/300x300/d6d6d6/888888?text=${encodeURIComponent(p.title)}`} alt={p.title} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110" />
                    </div>

                    <div className="px-0.5 md:px-1 shrink-0 text-left flex flex-col justify-end">
                      <h3 className="text-[13px] md:text-[17px] font-bold text-gray-900 leading-tight mb-0.5 md:mb-1 whitespace-nowrap overflow-hidden text-ellipsis font-serif">{p.title}</h3>
                      <p className="text-[10px] md:text-[11px] font-medium text-gray-500 mb-2 md:mb-3">{p.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[18px] md:text-[24px] font-black text-black leading-none">{p.price}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(p);
                          }}
                          className="w-7 h-7 md:w-8 md:h-8 rounded-full border-[1.5px] border-[#377b42] flex items-center justify-center text-[#377b42] hover:bg-[#377b42] hover:text-white transition-all duration-300 bg-transparent shrink-0"
                        >
                          <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-gray-500 font-bold text-lg">No products found matching "{searchTerm}"</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 pb-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                  <button
                    key={num}
                    onClick={() => paginate(num)}
                    className={`w-8 h-8 rounded shadow-sm text-[13px] font-bold transition-colors ${currentPage === num ? 'bg-[#5ea73c] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 h-8 rounded shadow-sm text-[13px] font-medium transition-colors flex items-center gap-1 ml-1 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  Next page <span className="font-serif">»</span>
                </button>
              </div>
            )}

          </div>
        </div>

        <AddedToCartOverlay isVisible={showAddedOverlay} productName={addedProductName} />

        <ProductDetailsOverlay
          product={selectedProduct}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onAddToCart={handleAddToCart}
        />
      </div>

      <Footer />
    </div>
  );
}
