"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Crown from "@/resources/assets/svg/crown"; // Adjust the path based on your file structure
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsStars } from "react-icons/bs";
import { ImTrophy } from "react-icons/im";
import { PiSmileyFill } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface CardProps {
  title: string;
  url: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, url, image }) => {
  const router = useRouter();

  const handleOrderNowClick = () => {
    router.push(url);
  };

  return (
    <div className="relative flex flex-col items-center p-2 w-72">
      <Image
        alt={title}
        height={1920}
        width={1080}
        className="absolute object-cover rounded-full size-60"
        src={image}
      />
    </div>
  );
};

const Categories: React.FC = () => {
  const cardData = [
    {
      title: "Snacks Gift Pack",
      url: "/products",
      image: "/hero.jpg",
    },
    {
      title: "Snacks Return Gifts",
      url: "/products",
      image: "/hero.jpg",
    },
    {
      title: "Cooking & Catering",
      url: "/products",
      image: "/hero.jpg",
    },
  ];

  const features = [
    {
      name: "Free Standard Delivery",
      icon: <RiVerifiedBadgeFill size={50} />,
    },
    {
      name: "Freshely Prepared ingredients",
      icon: <BsStars size={50} />,
    },
    {
      name: "98% of happy clients",
      icon: <PiSmileyFill size={50} />,
    },
    {
      name: "Winner of 15 awards",
      icon: <ImTrophy size={50} />,
    },
  ];
  const images = [
    {
      image: "/hero.jpg",
    },
    {
      image: "/sweet1.jpg",
    },
    {
      image: "/sweet2.jpg",
    },
    {
      image: "/sweet3.jpg",
    },
    {
      image: "/sweet4.jpg",
    },
  ];

  return (
    <div className=" container flex flex-col h-full">
      <div className="flex justify-center  pr-16 items-center">
        <Crown />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">Categories</h1>
      <p className="text-sm text-center">
        Transforming ordinary moments into extraordinary Shopping experiences
      </p>
      <div className=" w-full mt-10">
        <Carousel className=" relative select-none">
          <div className=" absolute left-4 top-1/2 z-10 ">
            <CarouselPrevious className=" size-14 shadow-xl " />
          </div>
          <div className=" absolute right-4 top-1/2 z-10">
            <CarouselNext className=" size-14 shadow-xl" />
          </div>
          <CarouselContent className="-ml-1 flex gap-2">
            {images.map((image) => (
              <CarouselItem
                key={image.image}
                className="pl-1 md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <div className="flex flex-col">
                    <div className="relative h-72 ">
                      <Image
                        fill={true}
                        src={image.image}
                        alt={image.image}
                        className="object-cover w-full h-full rounded-xl"
                      />
                    </div>
                  </div>
                </div>
                {/* <CarouselPrevious/>
                  <CarouselNext/> */}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <Separator className="mt-20 bg-black h-[1px] mx-10" />
      <div className=" grid grid-cols-1 gap-4 place-items-center lg:grid-cols-4 md:grid-cols-2 ">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative flex flex-col justify-end items-center"
          >
            <div className=" bg-white text-amber-900 shadow-lg translate-y-8 size-20 rounded-full grid place-items-center">
              {feature.icon}
            </div>
            <div className=" bg-amber-800 w-60 h-24 rounded-sm  text-white font-medium text-center">
              <div className="mt-10">{feature.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
