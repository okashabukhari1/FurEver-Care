import { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import productsData from "../data/petProducts.json";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const products = productsData.products; // ensure it's an array

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

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      const ids = JSON.parse(stored) as number[];
      const items = products.filter((p) => ids.includes(p.id));
      setWishlist(items);
    }

    const syncWishlist = () => {
      const stored = localStorage.getItem("wishlist");
      if (stored) {
        const ids = JSON.parse(stored) as number[];
        const items = products.filter((p) => ids.includes(p.id));
        setWishlist(items);
      }
    };

    window.addEventListener("storage", syncWishlist);
    return () => window.removeEventListener("storage", syncWishlist);
  }, []);

  const removeFromWishlist = (productId: number) => {
    const updated = wishlist.filter((p) => p.id !== productId);
    setWishlist(updated);

    const ids = updated.map((p) => p.id);
    localStorage.setItem("wishlist", JSON.stringify(ids));

    window.dispatchEvent(new StorageEvent("storage", { key: "wishlist" }));
  };

  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Heart className="text-red-500" /> My Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="relative border rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden bg-white"
              >
                {/* Product image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />

                {/* Product info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-blue-600 font-bold mt-2">${product.price}</p>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
