"use client";

import Product from "@/components/Product";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [tempAllProducts, setTempAllProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [cart, SetCart] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortOrder, setSortOrder] = useState("");

 

  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  const getAllProduct = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  };

  useEffect(() => {
    getAllProduct().then((data) => {
      setAllProducts(data);
      setTempAllProducts(data);
    });
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    // Search
    if (searchText) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category.toLowerCase())
      );
    }

    // Price Range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sorting
if (sortOrder === "lowToHigh") {
  filtered.sort((a, b) => a.price - b.price);
} else if (sortOrder === "highToLow") {
  filtered.sort((a, b) => b.price - a.price);
} else if (sortOrder === "aToZ") {
  filtered.sort((a, b) => a.title.localeCompare(b.title));
} else if (sortOrder === "zToA") {
  filtered.sort((a, b) => b.title.localeCompare(a.title));
}


    setTempAllProducts(filtered);
  }, [searchText, selectedCategories, priceRange, sortOrder, allProducts]);



  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded"
        >
          <FiFilter />
          Filter
        </button>
      </div>

      <div className="flex gap-4">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-lg z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex justify-between items-center lg:hidden p-4 border-b">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-md font-semibold mb-2">Category</h3>
              {categories.map((cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <label className="capitalize">{cat}</label>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-md font-semibold mb-2">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: Number(e.target.value),
                    })
                  }
                  className="w-20 border px-1 py-0.5 text-sm"
                  placeholder="Min"
                />
                <span>—</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value),
                    })
                  }
                  className="w-20 border px-1 py-0.5 text-sm"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <h3 className="text-md font-semibold mb-2">Sort</h3>
              <select
                className="border w-full px-2 py-1 text-sm"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Default</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="aToZ">Title : A to Z</option>
                <option value="highToLow">Title : Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className="my-2">
            <input
              type="text"
              className="px-2 py-1 w-full border border-gray-800 outline-none rounded"
              placeholder="Search Product"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tempAllProducts.length > 0 ? (
              tempAllProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
