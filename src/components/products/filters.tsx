"use client";
import { useFilterContext } from "@/core/context/filters-context";
import { ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaCheck, FaCircle } from "react-icons/fa6";

const colors = [
  { name: "Beige", color: "#F5F5DC" },
  { name: "Black", color: "#000000" },
  { name: "Blue", color: "#0000FF" },
  { name: "Brown", color: "#A52A2A" },
  { name: "Dark Blue", color: "#00008B" },
  { name: "Gold", color: "#FFD700" },
];

const discounts = [
  "30% or more",
  "40% or more",
  "50% or more",
  "60% or more",
  "70% or more",
];

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCategoryVisible, setIsCategoryVisible] = useState(true);
  const [isPriceSortVisible, setIsPriceSortVisible] = useState(true);
  const [isRatingSortVisible, setIsRatingSortVisible] = useState(true);
  const [isColorVisible, setIsColorVisible] = useState(true);
  const [isDiscountVisible, setIsDiscountVisible] = useState(true);

  const {
    selectedCategory,
    setSelectedCategory,
    selectedSort,
    setSelectedSort,
    priceRange,
    setPriceRange,
    selectedColor,
    setSelectedColor,
    selectedDiscount,
    setSelectedDiscount,
    ratings,
    setRatings,
  } = useFilterContext();

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedCategory(params.get("category") || null);
    setSelectedSort(params.get("sort") || null);
    setPriceRange([
      parseFloat(params.get("minPrice") || "0"),
      parseFloat(params.get("maxPrice") || "100000"),
    ]);
    setSelectedColor(params.get("color") || null);
    setSelectedDiscount(params.get("discount") || null);
    setRatings(
      params.has("rating") ? parseInt(params.get("rating") || "0") : null,
    );
  }, [searchParams]);

  const updateURL = useCallback(() => {
    const query = new URLSearchParams();
    if (selectedCategory) query.set("category", selectedCategory);
    if (selectedSort) query.set("sort", selectedSort);
    if (priceRange[0] > 0 || priceRange[1] < 100000) {
      query.set("minPrice", priceRange[0].toString());
      query.set("maxPrice", priceRange[1].toString());
    }
    if (selectedColor) query.set("color", selectedColor);
    if (selectedDiscount) query.set("discount", selectedDiscount);
    if (ratings !== null) query.set("rating", ratings.toString());

    router.push(`?${query.toString()}`, { scroll: false });
  }, [
    router,
    selectedCategory,
    selectedSort,
    priceRange,
    selectedColor,
    selectedDiscount,
    ratings,
  ]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const toggleCategory = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const toggleSort = (sort: string) => {
    setSelectedSort((prev) => (prev === sort ? null : sort));
  };

  const toggleColor = (color: string) => {
    setSelectedColor((prev) => (prev === color ? null : color));
  };

  const toggleDiscount = (discount: string) => {
    setSelectedDiscount((prev) => (prev === discount ? null : discount));
  };

  const toggleRating = (rating: number) => {
    setRatings((prev) => (prev === rating ? null : rating));
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriceRange: [number, number] = [
      Number(e.target.value),
      priceRange[1],
    ];
    setPriceRange(newPriceRange);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriceRange: [number, number] = [
      priceRange[0],
      Number(e.target.value),
    ];
    setPriceRange(newPriceRange);
  };

  return (
    <section className="flex flex-col gap-5 transition duration-800 select-none">
      <div className="w-full">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex gap-4 dark:text-slate-300 text-slate-500 justify-between">
          <input
            type="number"
            placeholder="Min Price"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className="bg-gray-100 dark:bg-gray-700 dark:text-white outline-none rounded-sm w-24 pl-3 pr-3 py-2"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className="bg-gray-100 dark:bg-gray-700 dark:text-white outline-none rounded-sm w-24 pl-3 pr-3 py-2"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <h1
          onClick={() => setIsCategoryVisible((prev) => !prev)}
          className="font-semibold flex items-center group gap-3 cursor-pointer"
        >
          Category
          <ChevronUp
            size={18}
            className={`group-hover:rotate-180 transition-transform duration-500 ${isCategoryVisible && "rotate-180"}`}
          />
        </h1>
        <ul
          className={`mt-4 ${isCategoryVisible ? "flex" : "hidden"} dark:text-slate-300 flex-col gap-1 text-slate-600`}
        >
          {categories.map((category) => (
            <li
              onClick={() => toggleCategory(category)}
              className={`text-sm cursor-pointer flex gap-2 items-center ${selectedCategory === category ? "text-slate-500 dark:text-slate-200 font-semibold" : ""}`}
              key={category}
            >
              {selectedCategory === category ? (
                <FaCheck
                  className="text-white rounded-full bg-black p-1"
                  size={18}
                />
              ) : (
                <FaCircle
                  className="fill-slate-300 dark:fill-slate-500"
                  size={18}
                />
              )}
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <h1
          onClick={() => setIsPriceSortVisible((prev) => !prev)}
          className="font-semibold flex items-center group gap-3 cursor-pointer"
        >
          Price
          <ChevronUp
            size={20}
            className={`group-hover:rotate-180 transition-transform duration-500 ${isPriceSortVisible && "rotate-180"}`}
          />
        </h1>
        <ul
          className={`mt-4 text-sm flex-col gap-1 text-slate-600 dark:text-slate-300 ${isPriceSortVisible ? "flex" : "hidden"}`}
        >
          <li
            className={`hover:cursor-pointer flex gap-2 items-center ${selectedSort === "Highest" ? "text-slate-500 dark:text-slate-200 font-semibold" : ""}`}
            onClick={() => toggleSort("Highest")}
          >
            {selectedSort === "Highest" ? (
              <FaCheck
                className="text-white rounded-full bg-black p-1"
                size={18}
              />
            ) : (
              <FaCircle
                className="fill-slate-300 dark:fill-slate-500"
                size={18}
              />
            )}
            High to Low
          </li>
          <li
            className={`hover:cursor-pointer flex gap-2 items-center ${selectedSort === "Lowest" ? "text-slate-500 dark:text-slate-200 font-semibold" : ""}`}
            onClick={() => toggleSort("Lowest")}
          >
            {selectedSort === "Lowest" ? (
              <FaCheck
                className="text-white rounded-full bg-black p-1"
                size={18}
              />
            ) : (
              <FaCircle
                className="fill-slate-300 dark:fill-slate-500"
                size={18}
              />
            )}
            Low to High
          </li>
        </ul>
      </div>

      <div className="flex flex-col">
        <h1
          onClick={() => setIsRatingSortVisible((prev) => !prev)}
          className="font-semibold flex items-center group gap-3 cursor-pointer"
        >
          Rating
          <ChevronUp
            size={20}
            className={`group-hover:rotate-180 transition-transform duration-500 ${isRatingSortVisible && "rotate-180"}`}
          />
        </h1>
        <ul
          className={`mt-4 text-sm flex-col gap-1 text-slate-600 dark:text-slate-300 ${isRatingSortVisible ? "flex" : "hidden"}`}
        >
          {[5, 4, 3, 2, 1].map((rating) => (
            <li
              className={`hover:cursor-pointer flex gap-2 items-center ${ratings === rating ? "text-slate-500 dark:text-slate-200 font-semibold" : ""}`}
              key={rating}
              onClick={() => toggleRating(rating)}
            >
              {ratings === rating ? (
                <FaCheck
                  className="text-white rounded-full bg-black p-1"
                  size={18}
                />
              ) : (
                <FaCircle
                  className="fill-slate-300 dark:fill-slate-500"
                  size={18}
                />
              )}
              {rating} Stars
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <h1
          onClick={() => setIsColorVisible((prev) => !prev)}
          className="font-semibold flex items-center group gap-3 cursor-pointer"
        >
          Color
          <ChevronUp
            size={20}
            className={`group-hover:rotate-180 transition-transform duration-500 ${isColorVisible && "rotate-180"}`}
          />
        </h1>
        <ul
          className={`mt-4 text-sm flex-col gap-1 text-slate-600 dark:text-slate-300 ${isColorVisible ? "flex" : "hidden"}`}
        >
          {colors.map((color) => (
            <li
              onClick={() => toggleColor(color.name)}
              className={`flex gap-2 items-center cursor-pointer ${selectedColor === color.name ? "text-slate-500 dark:text-slate-200 font-semibold" : ""}`}
              key={color.name}
            >
              {selectedColor === color.name ? (
                <FaCheck
                  className="text-white rounded-full bg-black p-1"
                  size={18}
                />
              ) : (
                <FaCircle
                  className="fill-slate-300 dark:fill-slate-500"
                  size={18}
                />
              )}
              <div
                style={{ backgroundColor: color.color }}
                className="w-5 h-5 rounded-full border border-gray-200"
              />
              {color.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <h1
          onClick={() => setIsDiscountVisible((prev) => !prev)}
          className="font-semibold flex items-center group gap-3 cursor-pointer"
        >
          Discount
          <ChevronUp
            size={20}
            className={`group-hover:rotate-180 transition-transform duration-500 ${isDiscountVisible && "rotate-180"}`}
          />
        </h1>
        <ul
          className={`mt-4 text-sm flex-col gap-1 text-slate-600 dark:text-slate-300 ${isDiscountVisible ? "flex" : "hidden"}`}
        >
          {discounts.map((discount) => (
            <li
              onClick={() => toggleDiscount(discount)}
              className={`flex gap-2 items-center cursor-pointer ${selectedDiscount === discount ? "text-slate-500 dark:text-slate-200 font-semibold" : ""}`}
              key={discount}
            >
              {selectedDiscount === discount ? (
                <FaCheck
                  className="text-white rounded-full bg-black p-1"
                  size={18}
                />
              ) : (
                <FaCircle
                  className="fill-slate-300 dark:fill-slate-500"
                  size={18}
                />
              )}
              {discount}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Category;
