'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AddToCart from './add-to-cart';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const SingleProduct = ({ id }: { id: number }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        const productData: Product = {
          id: data.id,
          title: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
          rating: data.rating,
        };
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row max-sm:flex-col antialiased justify-between gap-8">
      <div className="w-full relative select-none max-w-md">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Image
                height={1920}
                width={1080}
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          </CarouselContent>
          <div className=" absolute z-20 top-1/2 left-14">
            <CarouselPrevious />
          </div>
          <div className=" absolute z-20 top-1/2 right-14">
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <div className="w-full rounded bg-background-secondary">
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.round(product.rating.rate) }).map((_, index) => (
              <FaStar key={index} className="text-amber-400" />
            ))}
            <span className="text-sm font-medium">{`Reviews (${product.rating.count})`}</span>
          </div>
          <div className="flex flex-col justify-between gap-3 py-5 border-b border-solid border-border-primary">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <p className="text-sm mb-8 max-sm:mb-0">{product.description}</p>
            <span className="text-2xl max-sm:text-lg font-medium">${product.price}</span>
          </div>

          <div className="flex w-full justify-center">
            <AddToCart product={product} />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-0">
            <AccordionTrigger className="text-sm">PRODUCT DESCRIPTION</AccordionTrigger>
            <AccordionContent>
              <p>
                {product.description}
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm">COMPOSITION</AccordionTrigger>
            <AccordionContent>
              <p>
                We work with monitoring programmes to ensure compliance with our
                social, environmental and health and safety standards for our
                products. To assess compliance, we have developed a programme of
                audits and continuous improvement plans.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm">CARE</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>Caring for your clothes is caring for the environment.</p>
              <p>
                Lower temperature washes and delicate spin cycles are gentler on
                garments and help to protect the colour, shape and structure of
                the fabric. Furthermore, they reduce the amount of energy used
                in care processes.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm">ORIGIN</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>
                We work with our suppliers, workers, unions and international
                organisations to develop a supply chain in which human rights
                are respected and promoted, contributing to the United Nations
                Sustainable Development Goals.
              </p>
              <p>
                Thanks to the collaboration with our suppliers, we work to know
                the facilities and processes used to manufacture our products in
                order to understand their traceability.
              </p>
              <p>Made in Portugal</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SingleProduct;
