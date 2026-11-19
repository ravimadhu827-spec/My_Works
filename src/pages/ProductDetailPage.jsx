import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  getProductBySlug, 
  getRelatedProducts 
} from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  Flame,
  Leaf,
  Info
} from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImage, setActiveImage] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      const defaultWeight = product.weights && product.weights.length > 0 
        ? product.weights[0].label 
        : product.weight;
      setSelectedWeight(defaultWeight);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF7F2] px-4 text-center">
        <h2 className="font-serif-indian text-2xl font-bold text-stone-800">Product Not Found</h2>
        <p className="text-stone-500 text-sm mt-2">The delicacy you are looking for is currently unavailable.</p>
        <Link
          to="/shop"
          className="mt-6 px-6 py-3 rounded-full bg-[#164E32] text-white text-xs font-bold uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Calculate dynamic price based on selected weight
  const currentPrice = (() => {
    if (product.weights && product.weights.length > 0) {
      const match = product.weights.find((w) => w.label === selectedWeight);
      if (match) return match.price;
    }
    return product.price;
  })();

  const currentOriginalPrice = Math.round(currentPrice * 1.25);
  const isFavorited = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product.id, product.category, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    navigate('/checkout');
  };

  const imagesList = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6 font-medium">
          <Link to="/" className="hover:text-[#164E32]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/${product.category}`} className="capitalize hover:text-[#164E32]">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-900 font-semibold truncate">{product.name}</span>
        </nav>

        {/* Main Product Presentation */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3D6] shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Product Images Gallery */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Display Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs">
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-[#164E32] text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {product.badge}
                  </div>
                )}

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow transition-all ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-white/90 text-stone-600 hover:text-rose-600'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnails row */}
              {imagesList.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {imagesList.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImage === imgUrl
                          ? 'border-[#164E32] ring-2 ring-emerald-500/30'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Delivery info bullets */}
              <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-3 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#164E32]" />
                  <span>Free shipping above ₹499</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#EA580C]" />
                  <span>Dispatched fresh within 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#164E32]" />
                  <span>100% Homemade Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Zero chemical additives</span>
                </div>
              </div>

            </div>

            {/* Right: Product Buying Actions & Details */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div>
                {/* Category & Veg indicator */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                    {product.subcategory}
                  </span>

                  <div className="flex items-center gap-2">
                    {product.isVeg ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 100% Vegetarian
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                        <span className="w-2 h-2 rounded-full bg-rose-600"></span> Non-Veg Specialty
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Name */}
                <h1 className="font-serif-indian text-2xl sm:text-3xl font-extrabold text-stone-900 leading-snug">
                  {product.name}
                </h1>

                {/* Star rating */}
                <div className="flex items-center gap-3 mt-2.5">
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-900">{product.rating}</span>
                  </div>
                  <span className="text-xs text-stone-500">
                    ({product.reviewsCount} customer reviews)
                  </span>
                  <span className="text-stone-300">|</span>
                  <span className="text-xs text-emerald-700 font-semibold">
                    In Stock (Fresh Batch)
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-sm text-stone-600 leading-relaxed mt-4">
                  {product.shortDescription}
                </p>

                {/* Dynamic Price Display */}
                <div className="mt-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D6] flex items-baseline gap-3">
                  <span className="font-bold text-3xl text-[#164E32]">₹{currentPrice}</span>
                  <span className="text-sm text-stone-400 line-through">₹{currentOriginalPrice}</span>
                  <span className="text-xs font-bold text-[#EA580C] bg-orange-100 px-2 py-0.5 rounded">
                    Save 20%
                  </span>
                  <span className="text-xs text-stone-500 ml-auto">
                    Inclusive of all taxes
                  </span>
                </div>

                {/* Available Weights Selector */}
                {product.weights && product.weights.length > 0 && (
                  <div className="mt-6">
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
                      Select Pack Size / Weight:
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {product.weights.map((w) => (
                        <button
                          key={w.label}
                          onClick={() => setSelectedWeight(w.label)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                            selectedWeight === w.label
                              ? 'bg-[#164E32] text-white border-[#164E32] shadow-sm scale-105'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          <span>{w.label}</span>
                          <span className="ml-1.5 opacity-80 font-normal">₹{w.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="mt-6 flex items-center gap-4">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-stone-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isAddedSuccess
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#EA580C] hover:bg-[#D9480F] text-white hover:shadow'
                  }`}
                >
                  {isAddedSuccess ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart (₹{currentPrice * quantity})
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#164E32] hover:bg-[#0F3824] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow"
                >
                  Buy Now Instantly
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Tabbed Product Information (Description, Ingredients, Preparation, Storage, Specs) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3D6] shadow-sm mb-12">
          
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto mb-6">
            {[
              { id: 'description', label: 'Detailed Description' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'preparation', label: 'Homemade Preparation' },
              { id: 'storage', label: 'Storage & Shelf Life' },
              { id: 'specs', label: 'Packaging & Details' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#164E32] text-white'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-stone-700 text-sm leading-relaxed max-w-3xl">
            {activeTab === 'description' && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <p className="text-xs text-stone-500 italic">
                  Crafted strictly in accordance with traditional South Indian culinary principles. No artificial preservatives, synthetic colorants, or chemical stabilizers added.
                </p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">Natural Ingredients Used:</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.ingredients.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#164E32] text-xs font-semibold"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preparation' && (
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">Traditional Method:</h4>
                <p>{product.preparation}</p>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  ⚡ <strong>Fresh Batch Promise:</strong> Cooked in small artisanal batches to maintain maximum crispness and authentic aroma.
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">Storage Instructions:</h4>
                <p>{product.storageInstructions}</p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-xs text-stone-500 block">Shelf Life</span>
                    <span className="font-bold text-sm text-[#164E32]">{product.shelfLife}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-xs text-stone-500 block">Net Weight</span>
                    <span className="font-bold text-sm text-stone-800">{product.netWeight}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">Packaging & Quality Details:</h4>
                <ul className="space-y-2 text-xs">
                  <li><strong>Packaging Type:</strong> {product.packaging}</li>
                  <li><strong>Spice Level:</strong> {product.spiceLevel || 'Standard'}</li>
                  <li><strong>Origin:</strong> Handcrafted in Tamil Nadu, India</li>
                  <li><strong>Preservatives:</strong> 0% (Naturally salt & oil cured)</li>
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* "Why You'll Love It" Section */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#EAE3D6] mb-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
              The Homemade Difference
            </span>
            <h3 className="font-serif-indian text-2xl font-bold text-[#164E32] mt-1">
              Why You'll Love This Dish
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: '100% Homemade', desc: 'Family kitchen authenticity' },
              { title: 'No Artificial Taste', desc: 'Zero synthetic enhancers' },
              { title: 'Traditional Recipe', desc: 'Passed down 3 generations' },
              { title: 'Fresh Ingredients', desc: 'Farm spices & cold-pressed oils' },
              { title: 'Hygienically Prepared', desc: 'Clean brass & food-grade steel' }
            ].map((p, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-stone-200 text-center shadow-2xs">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-[#164E32] flex items-center justify-center font-bold text-xs mx-auto mb-2">
                  ✓
                </span>
                <h4 className="text-xs font-bold text-stone-900">{p.title}</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif-indian text-2xl font-bold text-stone-900">
                Related Homemade Products
              </h3>
              <Link
                to={`/${product.category}`}
                className="text-xs font-bold text-[#164E32] hover:text-[#EA580C]"
              >
                View all in {product.category.replace('-', ' ')}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
