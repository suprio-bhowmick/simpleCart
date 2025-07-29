"use client";

import React, { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Amount } from "@/lib/lib";
import { FiTrash } from "react-icons/fi";

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const updateQuantity = (index, newQty) => {
    const qty = parseInt(newQty);
    if (qty <= 0 || isNaN(qty)) return;
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: qty } : item
    );
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium">
                    {item.title || "Unnamed Product"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Price: {Amount(item.price)} × Qty: {item.quantity || 1}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => updateQuantity(index, e.target.value)}
                    className="w-14 h-10 border border-gray-400 rounded px-2 text-center outline-none"
                  />
                  <button
                    onClick={() => removeItem(index)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <span className="text-lg font-semibold">
                Total: {Amount(totalPrice)}
              </span>
              <button className="bg-gray-700 hover:bg-gray-800 text-white  px-4 py-2 rounded">
               Process to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
