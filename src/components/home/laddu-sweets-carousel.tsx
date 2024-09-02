import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";

const products = [
  { id: 1, src: '/hero.jpg', alt: 'Image 1', name: 'Mawa Petha Roll', price: 'Rs. 49.99' },
  { id: 2, src: '/hero.jpg', alt: 'Image 2', name: 'Petha Roll', price: 'Rs. 59.99' },
  { id: 3, src: '/hero.jpg', alt: 'Image 3', name: 'Petha Orange Roll', price: 'Rs. 39.99' },
  { id: 4, src: '/hero.jpg', alt: 'Image 4', name: 'Mawa Petha Roll', price: 'Rs. 79.99' },
  { id: 5, src: '/hero.jpg', alt: 'Image 5', name: 'Kulfi Roll', price: 'Rs. 75.99' },
];

export function LadduSweetsCarousel() {
  return (
    <Carousel className="w-full container ">
      <div className="flex relative  justify-between flex-col md:flex-row  py-10">
        <div className="flex  flex-col max-sm:items-center max-md:gap-4 w-[60%] max-md:w-full gap-4">
          <h1 className="text-4xl font-extrabold max-sm:text-center">Luscious Laddu Sweets</h1>
          <p className="text-sm capitalize font-medium mb-2">a taste of tradition : petha sweets at their finest</p>
        </div>
        <div className="absolute flex border-2 right-48 top-14 max-md:bottom-16 max-md:top-auto max-md:right-16 ">
          <CarouselPrevious>Previous</CarouselPrevious>
          <CarouselNext>Next</CarouselNext>
        </div>

        <Button variant={'outline'} className=" max-md:w-40 bg-transparent border border-black px-6">View all</Button>

      </div>
      <CarouselContent className="-ml-1">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-1 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <div className="flex flex-col">
                <div className="relative size-64 w-full">
                  <Image 
                  	fill={true}
                    src={product.src} 
                    alt={product.alt} 
                    className="object-cover w-full h-full rounded-xl" 
                  />
                </div>
                <div className="flex flex-col justify-between items-start py-2">
                  <div className="text-xl font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.price}</div>
                </div>
                <div className="flex gap-1">
                  <Button className="rounded-full text-xs h-7">
                      250gm
                  </Button>
                  <Button variant={'outline'} className="rounded-full border-black text-xs h-7 ">
                      500gm
                  </Button>
                </div>

                <Button className="text-xs rounded-none mt-4 ">Add to Cart</Button>
              </div>
            </div>
            {/* <CarouselPrevious/>
            <CarouselNext/> */}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
