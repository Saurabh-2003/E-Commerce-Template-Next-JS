"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { BsFillHandbagFill } from "react-icons/bs";

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
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="cursor-pointer bg-white shadow-sm border rounded-xl relative dark:bg-black dark:hover:bg-zinc-700 hover:shadow-lg hover:-translate-y-3 p-2 flex flex-col w-[250px] h-[350px] max-sm:items-center transition-all ease-in-out duration-500">
      <div className="relative w-full h-[85%]">
        <Image
          loading="lazy"
          width={1920}
          height={1080}
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div className="flex justify-between items-center text-sm h-fit w-full font-semibold mt-2">
        <h3 className="dark:text-slate-300 truncate">{product.title}</h3>
        <p className="flex-shrink-0">{`$${product.price}`}</p>
      </div>
      <div className="flex items-center mt-1">
        <Star className="w-4 h-4 text-yellow-500" />
        <p className="ml-1 text-sm dark:text-slate-300">
          {product.rating.rate}
        </p>
        <p className="ml-1 text-xs text-gray-500 dark:text-slate-400">{`(${product.rating.count} reviews)`}</p>
      </div>
      <div className="p-2 rounded-full bg-white absolute right-4 top-4">
        <BsFillHandbagFill size={20} />
      </div>
    </div>
  );
};

export default ProductCard;
