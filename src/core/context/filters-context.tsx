"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedSort: string | null;
  setSelectedSort: (sort: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
  selectedDiscount: string | null;
  setSelectedDiscount: (discount: string | null) => void;
  ratings: number | null;
  setRatings: (rating: number | null) => void;
  searchText: string;
  setSearchText: (text: string) => void; // Added searchText state
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [ratings, setRatings] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>(""); // Added searchText state

  return (
    <FilterContext.Provider
      value={{
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
        searchText,
        setSearchText,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
