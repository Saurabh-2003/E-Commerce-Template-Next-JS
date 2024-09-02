"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="relative  flex flex-col h-full">
      <div className="h-[640px] ">
        <Image
          src="/her.jpg"
          alt="Hero Image"
          height={1920}
          width={1080}
          className="brightness-50 contrast-125 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col absolute max-md:justify-center max-md:h-full max-md:w-full max-md:items-center max-sm:px-0 gap-3 md:top-32 md:right-32 w-fit    ">
        <h3 className=" font-extrabold text-6xl max-sm:w-full max-md:text-center leading-tight text-white capitalize">
          Discover <br /> something special <br /> for every need
        </h3>

        <Button
          onClick={() => router.push("/products")}
          className=" w-40  border-2 bg-white text-black hover:text-white"
        >
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default Hero;
