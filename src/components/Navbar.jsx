"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const cartCount = cart?.length || 0;

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center container mx-auto">
      <Link href="/" className="text-xl font-bold text-gray-800">
        MyShop
      </Link>

      <Link href="/cart" className="relative">
        <FiShoppingCart className="text-2xl text-gray-700" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
