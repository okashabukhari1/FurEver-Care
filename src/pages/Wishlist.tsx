import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import productData from '../data/petProducts.json';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
}

const Wishlist: React.FC = () => {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  useEffect(() => {
    const loadWishlist = () => {
      const raw = localStorage.getItem('wishlist');
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as unknown;
          const ids = Array.isArray(parsed)
            ? Array.from(new Set(parsed.map((v) => Number(v)).filter((n) => Number.isFinite(n))))
            : [];
          setWishlistIds(ids);
        } catch {
          setWishlistIds([]);
        }
      } else {
        setWishlistIds([]);
      }
    };

    loadWishlist();

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'wishlist') {
        loadWishlist();
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadWishlist();
      }
    };
    const onFocus = () => loadWishlist();

    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const allProducts: Product[] = productData.products as unknown as Product[];

  const wishlistProducts = useMemo(() => {
    const idSet = new Set(wishlistIds);
    return allProducts.filter(p => idSet.has(p.id));
  }, [allProducts, wishlistIds]);

  const removeFromWishlist = (id: number) => {
    setWishlistIds(prev => prev.filter(pid => pid !== id));
  };

  const clearWishlist = () => setWishlistIds([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Navbar />
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-600 mr-3" />
              Your Wishlist
            </h1>
            <p className="text-gray-600 mt-2">Saved products are stored locally in your browser.</p>
          </motion.div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-700">Items: {wishlistProducts.length}</p>
            {wishlistProducts.length > 0 && (
              <button onClick={clearWishlist} className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition">
                Clear Wishlist
              </button>
            )}
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No items yet</h3>
              <p className="text-gray-600">Add products to your wishlist from the Product Showcase.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    {!product.inStock && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium">
                        {product.category}
                      </span>
                      <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!product.inStock}
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Buy Now</span>
                      </motion.button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="flex items-center space-x-2 px-3 py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Wishlist;


