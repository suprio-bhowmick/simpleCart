import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import React, { useContext } from "react";

const Product = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const existingIndex = cart.findIndex((item) => item.id === product.id);

  const handleAddToCart = (product) => {
    if (existingIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="border rounded shadow p-3 hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-4"
      />
      <h2 className="text-sm font-semibold truncate">{product.title}</h2>
      <p className="text-gray-700 font-medium">₹{product.price}</p>

      <div className="flex gap-1 mt-3">
        <Link
          href={`/product/${product.id}`}
          className="flex-1 text-center bg-gray-800 text-white py-2 text-sm"
        >
          View Product
        </Link>

        {existingIndex === -1 ? (
          <button
            className="flex-1 bg-gray-800 text-white py-2 text-sm"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        ) : (
          <Link
            href="/cart"
            className="flex-1 bg-gray-800 text-white py-2 text-sm text-center"
          >
            Go to Cart
          </Link>
        )}
      </div>
    </div>
  );
};

export default Product;
