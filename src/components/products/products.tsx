"use client";
import { useFilterContext } from "@/core/context/filters-context";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import ProductCard from "./product-card";
import Sidebar from "./sidebar";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  color: string;
  discount: string;
}

const Products: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useFilterContext(); // Get filters from context
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Update context based on URL parameters
    const params = new URLSearchParams(window.location.search);
    filters.setSearchText(params.get("searchText") || "");
    filters.setSelectedCategory(params.get("category") || null);
    filters.setSelectedSort(params.get("sort") || null);
    filters.setPriceRange([
      parseFloat(params.get("minPrice") || "0"),
      parseFloat(params.get("maxPrice") || "100000"),
    ]);
    filters.setSelectedColor(params.get("color") || null);
    filters.setSelectedDiscount(params.get("discount") || null);
    filters.setRatings(
      params.has("rating") ? parseInt(params.get("rating") || "0") : null,
    );

    // Update current page from URL, default to 1 if not present
    const page = parseInt(params.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const filteredProducts = products
    .filter((product) => {
      // Filter products based on selected filters
      const matchesCategory =
        !filters.selectedCategory ||
        product.category === filters.selectedCategory;
      const matchesColor =
        !filters.selectedColor || product.color === filters.selectedColor;
      const matchesDiscount =
        !filters.selectedDiscount ||
        product.discount === filters.selectedDiscount;
      const matchesRating =
        filters.ratings === null || product.rating.rate >= filters.ratings;

      const matchesSearchText =
        !filters.searchText ||
        product.title.toLowerCase().includes(filters.searchText.toLowerCase());

      // Apply price range filter
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      return (
        matchesCategory &&
        matchesColor &&
        matchesDiscount &&
        matchesRating &&
        matchesSearchText &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      // Sort products based on selected sort option
      if (filters.selectedSort === "Highest") {
        return b.price - a.price;
      }
      if (filters.selectedSort === "Lowest") {
        return a.price - b.price;
      }
      return 0; // No sorting
    });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Update URL with new page number
      const query = new URLSearchParams(window.location.search);
      query.set("page", page.toString());
      router.push(`?${query.toString()}`);
    }
  };

  return (
    <div className="container max-sm:px-0 max-sm:py-0 flex flex-col py-10 gap-y-10">
      <div className="flex max-sm:flex-col  h-fit">
        <section className="w-fit max-h-[800px] max-sm:w-full rounded-xl border shadow-lg dark:border-zinc-600 bg-white flex-shrink overflow-y-auto overflow-x-hidden dark:bg-zinc-800/75">
          <Sidebar />
        </section>

        <section className="flex flex-col w-full justify-between h-full items-center gap-10">
          {loading ? (
            <p className="h-dvh">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          )}

          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
