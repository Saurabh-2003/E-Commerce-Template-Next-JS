"use client";
import Crown from "@/resources/assets/svg/crown"; // Adjust the path based on your file structure
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

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
      <div className="flex flex-col mt-40 border-4 border-zinc-900 gap-4 px-4 items-center w-full h-64 justify-center">
        <h1 className="text-3xl text-center font-semibold mt-16">{title}</h1>
        <Button onClick={handleOrderNowClick}>Order Now</Button>
      </div>
    </div>
  );
};

const SpecialOffer: React.FC = () => {
  const cardData = [
    {
      title: "Snacks Gift Pack",
      url: "/products",
      image: "/sweet1.jpg",
    },
    {
      title: "Snacks Return Gifts",
      url: "/products",
      image: "/sweet2.jpg",
    },
    {
      title: "Cooking & Catering",
      url: "/products",
      image: "/sweet3.jpg",
    },
  ];

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex justify-center  pr-16 items-center">
        <Crown />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">Special Offers</h1>
      <p className="text-sm text-center">
        Transforming ordinary moments into extraordinary shopping experiences
      </p>
      <div className="w-full h-fit flex flex-wrap items-center justify-around mt-10">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            url={card.url}
            image={card.image}
          />
        ))}
      </div>

      <div className="relative w-full  mt-20 h-fit flex items-center justify-end ">
        <div className=" h-80 border-2 border-white mx-40 max-md:mx-20 max-sm:mx-0 max-md:w-full flex flex-col gap-8 items-center justify-center w-[60%] bg-gradient-to-l from-amber-500/90 to-amber-800/90">
          <h1 className="text-5xl text-center text-white  font-bold">
            {" "}
            Find Your Best <br /> Kaju Sweets
          </h1>
          <Button>Order Now</Button>
        </div>

        <div className="absolute left-0">
          <Image
            alt="special offer"
            src={"/sweet1.jpg"}
            height={1920}
            width={1080}
            className=" size-96 max-md:hidden ml-40 object cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
