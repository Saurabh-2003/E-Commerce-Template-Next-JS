"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFilterContext } from "@/core/context/filters-context";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import Category from "./filters";

const Sidebar: React.FC = () => {
  const {
    searchText,
    setSearchText,
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
  const [inputValue, setInputValue] = useState<string>(searchText || "");
  const router = useRouter();

  const updateURL = useCallback(() => {
    console.log("Updating URL with:", inputValue); // Log the value being used
    const query = new URLSearchParams(window.location.search);

    // Handle searchText
    if (inputValue) {
      query.set("searchText", inputValue);
    } else {
      query.delete("searchText"); // Remove the parameter if inputValue is empty
    }

    // Handle other query parameters
    if (selectedCategory) query.set("category", selectedCategory);
    else query.delete("category");

    if (selectedSort) query.set("sort", selectedSort);
    else query.delete("sort");

    if (priceRange[0] > 0 || priceRange[1] < 100000) {
      query.set("minPrice", priceRange[0].toString());
      query.set("maxPrice", priceRange[1].toString());
    } else {
      query.delete("minPrice");
      query.delete("maxPrice");
    }

    if (selectedColor) query.set("color", selectedColor);
    else query.delete("color");

    if (selectedDiscount) query.set("discount", selectedDiscount);
    else query.delete("discount");

    if (ratings !== null) query.set("rating", ratings.toString());
    else query.delete("rating");

    router.push(`?${query.toString()}`, { scroll: false });
  }, [
    inputValue,
    selectedCategory,
    selectedSort,
    priceRange,
    selectedColor,
    selectedDiscount,
    ratings,
    router,
  ]);

  useEffect(() => {
    setSearchText(inputValue);
  }, [inputValue, setSearchText]);

  useEffect(() => {
    updateURL();
  }, [
    searchText,
    selectedCategory,
    selectedSort,
    priceRange,
    selectedColor,
    selectedDiscount,
    ratings,
    updateURL,
  ]);

  useEffect(() => {
    console.log("Current URL:", window.location.search); // Log URL on mount
    const params = new URLSearchParams(window.location.search);
    const urlSearchText = params.get("searchText") || "";
    setInputValue(urlSearchText);
    setSearchText(urlSearchText);
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
  }, [
    setSearchText,
    setSelectedCategory,
    setSelectedSort,
    setPriceRange,
    setSelectedColor,
    setSelectedDiscount,
    setRatings,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchText(inputValue);
    }
  };

  const onSearchClick = () => {
    setSearchText(inputValue);
  };

  return (
    <div className="w-full select-none flex-col items-center justify-center">
      <div className="w-full flex justify-between dark:text-stone-200 items-center">
        <div className="flex w-full">
          {/* Mobile Menu */}
          <Dialog>
            <DialogTrigger className="sm:hidden w-full">
              <div className="flex justify-between w-full p-2">
                <span className="font-bold text-lg">Filters</span>
                <IoFilterSharp size={20} className="cursor-pointer" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:hidden h-full overflow-y-scroll w-full">
              <DialogHeader>
                <DialogTitle>Filters</DialogTitle>
              </DialogHeader>
              <div className="flex relative mb-10">
                <input
                  type="text"
                  placeholder="Search Products..."
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  className="bg-gray-100 dark:bg-gray-700 focus:ring-black focus:ring dark:text-white outline-none rounded-sm w-full h-fit pl-3 pr-10 py-2"
                />
                <div
                  className="rounded-sm cursor-pointer absolute right-0 p-2 hover:bg-gray-200"
                  onClick={onSearchClick}
                >
                  <Search className="h-full" size={25} />
                </div>
              </div>
              <div className="dark:text-white flex flex-col gap-3 w-full">
                <Category />
              </div>
            </DialogContent>
          </Dialog>

          {/* Desktop Menu */}
          <div className="flex flex-col mb-2 p-6 max-sm:hidden rounded-xl">
            <div className="flex pb-6 justify-between w-full items-center">
              <span className="font-bold text-lg">Filters</span>
              <IoFilterSharp size={20} className="cursor-pointer" />
            </div>
            <div className="flex relative mb-10 sm:flex max-sm:hidden">
              <input
                type="text"
                placeholder="Search Products..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="bg-gray-100 dark:bg-gray-700 focus:ring-black focus:ring dark:text-white outline-none rounded-sm w-full pl-3 pr-10 py-2"
              />
              <div
                className="rounded-sm cursor-pointer absolute right-0 p-2 hover:bg-gray-200"
                onClick={onSearchClick}
              >
                <Search className="h-full" size={25} />
              </div>
            </div>
            <div className="dark:text-white max-sm:hidden flex flex-col gap-3 w-full sm:flex">
              <Category />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
