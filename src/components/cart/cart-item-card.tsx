'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import eventEmitter from '@/core/utils/eventEmitter';
import Image from 'next/image';

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

interface CartItemCardProps {
  item: CartItem;
  onUpdateCartItems: (items: CartItem[]) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onUpdateCartItems }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateCartItems = (updatedItem: CartItem) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
    const updatedCartItems = cartItems.map((i) => (i.product.id === updatedItem.product.id ? updatedItem : i));
    onUpdateCartItems(updatedCartItems);
  };

  const removeCartItem = (id: number) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
    const updatedCartItems = cartItems.filter((i) => i.product.id !== id);
    onUpdateCartItems(updatedCartItems);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartItems({ ...item, quantity: newQuantity });
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateCartItems({ ...item, quantity: newQuantity });
  };

  const handleRemoveItem = () => {
    removeCartItem(item.product.id);
  };

  return (
    <section className='grid grid-cols-3 max-sm:grid-cols-2 hover:bg-gray-100 dark:hover:bg-gray-100/10'>
      <div className='col-span-1 flex ml-6 h-fit my-6 gap-4'>
        <Image height={1920} width={1080} src={item.product.image} className='size-20' alt='Product Image' />
        <div className='flex flex-col'>
          <p className='font-mono text-slate-600 dark:text-slate-300 text-ellipsis'>{item.product.title}</p>
          <p className='font-serif text-slate-500 dark:text-slate-400'>${item.product.price}</p>
          <button 
            onClick={handleRemoveItem}
            className='text-start font-serif text-red-400 hover:underline hover:text-red-500'>
            Remove
          </button>
        </div>
      </div>
      <div className='col-span-1 my-auto gap-4 flex items-center  justify-end font-serif text-slate-500'>
        <Button onClick={decreaseQuantity} className='size-6 px-0 text-lg rounded-full'>-</Button>
        {quantity}
        <Button onClick={increaseQuantity} className='size-6 px-0 text-lg rounded-full'>+</Button>
      </div>
      <div className='col-span-1 max-sm:hidden text-end mr-6 my-auto text-slate-500 dark:text-slate-400'>
        ${item.quantity * item.product.price}
      </div>
    </section>
  );
};

export default CartItemCard;
