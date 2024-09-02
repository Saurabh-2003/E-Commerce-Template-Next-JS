"use client";
import eventEmitter from "@/core/utils/eventEmitter";
import { useCallback, useState, useTransition } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface Variant {
  color: string;
  priceId: string;
  images: string[];
}

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface Session {
  user: {
    name: string;
    email: string;
  };
}

const dummySession: Session = {
  user: { name: "John Doe", email: "john@example.com" },
};

const colorMapping: Record<string, string> = {
  Red: "bg-red-500",
  Blue: "bg-blue-500",
};

const CustomLoader: React.FC<{ height: number; width: number }> = ({
  height,
  width,
}) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`,
      border: "4px solid rgba(0, 0, 0, 0.1)",
      borderTop: "4px solid #000",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    }}
  />
);

const AddToCart = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [selectedVariant, setSelectedVariant] = useState<Variant>({
    color: "Red",
    priceId: "price_1",
    images: ["/p1.jpg"],
  });
  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (!dummySession) {
      toast.info(
        "You must be registered to be able to add a product to the cart.",
      );
      return;
    }

    startTransition(() => {
      const existingCartItems = localStorage.getItem("cartItems");
      let cartItems: CartItem[] = existingCartItems
        ? JSON.parse(existingCartItems)
        : [];

      const existingItemIndex = cartItems.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
      } else {
        cartItems.push({
          product: product,
          quantity: 1,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log("Cart Items:", cartItems);

      // Emit an event to notify other components about the cart update
      eventEmitter.emit("cartUpdated", cartItems);

      toast.success("Product added to cart!");
    });
  }, [product]);

  return (
    <div className="flex flex-col py-4 gap-10 w-full">
      <div className="flex gap-4 items-center w-full">
        <Button
          type="submit"
          onClick={handleAddToCart}
          className="w-full bg-black"
        >
          {isPending ? <CustomLoader height={20} width={20} /> : "Add To Cart"}
        </Button>
        <Button variant={"ghost"} onClick={() => setIsLiked((prev) => !prev)}>
          {isLiked ? <FaHeart size={20} /> : <CiHeart size={20} />}
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;

interface CartItem {
  product: Product;
  quantity: number;
}
