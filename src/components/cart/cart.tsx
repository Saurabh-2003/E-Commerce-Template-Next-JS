'use client'
import React, { Fragment, useState, useEffect } from 'react';
import CartItemCard from './cart-item-card';
import { ShoppingCart, BaggageClaim } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import eventEmitter from '@/core/utils/eventEmitter';

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

interface CartItem {
  product: Product;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
    setCartItems(storedCartItems);
  }, []);

  const updateCartItems = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    eventEmitter.emit('cartUpdated', updatedItems);
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    const total = getTotal();
    router.push(`/checkout?total=${total}`);
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="h-dvh gap-14 grid place-items-center place-content-center text-slate-500 text-2xl capitalize">
          <BaggageClaim size={150} className="text-slate-400" />
          Your cart is currently empty!
          <Button
            onClick={() => router.push('/products')}
            className="group flex px-6 gap-4 min-w-60 py-2 rounded-sm text-xl"
          >
            <div className="group-hover:-rotate-12 group-hover:-translate-y-1 transition-all ease-in-out duration-300 group-hover:translate-x-2">
              <ShoppingCart />
            </div>
            Add Products
          </Button>
        </div>
      ) : (
        <main className="pt-24 px-20 max-sm:px-0 box-content min-h-[100svh] dark:bg-black">
          <section className="grid px-2 grid-cols-3 max-sm:grid-cols-2 bg-black py-2 text-white">
            <div className=" col-span-1">Product</div>
            <div className="col-span-1 text-end">Quantity</div>
            <div className="text-end max-sm:hidden col-span-1 mr-3">Subtotal</div>
          </section>

          {cartItems.map((item, index) => (
            <CartItemCard
              key={index}
              item={item}
              onUpdateCartItems={updateCartItems}
            />
          ))}

          <section className="grid grid-cols-5 bg-gray-50 dark:bg-gray-50/5 border-t-[.5px] border-black py-6">
            <div className="ml-3 text-right col-span-4 ">Grand Total</div>
            <div className="col-span-1 text-end mr-6 text-slate-500 dark:text-slate-300">{`$${getTotal().toFixed(2)}`}</div>
          </section>

          <div className="w-full flex justify-center">
            <Button onClick={handleCheckout} className=" w-40 mt-10 py-2">
              Checkout
            </Button>
          </div>
        </main>
      )}
    </Fragment>
  );
};

export default Cart;
