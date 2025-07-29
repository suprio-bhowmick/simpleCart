"use client";
import { CartContext } from "@/context/CartContext";
import { Amount } from "@/lib/lib";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [singleProduct, setSingleProduct] = useState(null);
  const [error, setError] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const existingIndex = cart.findIndex((item) => item.id === singleProduct?.id);

  const handleAddToCart = (product) => {
    if (existingIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setSingleProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-lg font-medium">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  }

  if (!singleProduct) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded shadow border border-gray-700">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{singleProduct.title}</h1>
          <p className="text-gray-700 text-sm">{singleProduct.description}</p>
          <p className="text-gray-600 text-sm capitalize">
            Category:{" "}
            <span className="font-medium">{singleProduct.category}</span>
          </p>
          <p className="text-xl font-semibold text-gray-600">
            {Amount(singleProduct.price)}
          </p>

          {existingIndex === -1 ? (
            <button
              className="px-5  bg-gray-800 text-white py-2 text-sm"
              onClick={() => handleAddToCart(singleProduct)}
            >
              Add to Cart
            </button>
          ) : (
            <Link
              href="/cart"
              className="px-5 bg-gray-800 text-white py-2 text-sm text-center"
            >
              Go to Cart
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
