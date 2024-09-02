'use client'
import Image from 'next/image';
import { Button } from '../ui/button';

const NewArrival = () => {
  return (
    <div className="relative flex flex-col h-full">
      <div className="h-[60dvh] max-sm:h-[55dvh]">
        <Image
          src="/p1.jpg"
          alt="NewArrival Image"
          height={1920}
          width={1080}
          className="brightness-75 max-sm:blur-sm h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col absolute  max-sm:px-8 gap-3 right-10 max-sm:right-0   top-32 p-4 w-full sm:w-80  bg-opacity-75 sm:bg-transparent">
        <h3 className="font-semibold text-4xl capitalize">Discover our new Arrival</h3>
        <p className="text-sm font-medium">
          Beyond Bags is committed to providing high quality designer vegan bags.
        </p>
        <Button  className='bg-black rounded-none w-52'>
          Explore
        </Button>
      </div>

      
      
    </div>


  );
};

export default NewArrival;
