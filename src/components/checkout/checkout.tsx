'use client'
import React, { useState } from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useRouter, useSearchParams } from 'next/navigation';
import eventEmitter from '@/core/utils/eventEmitter';
import { Button } from '../ui/button';

// Replace this with your Stripe publishable key
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const total = searchParams.get('total') || '0.00';

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate successful payment process and redirect to /confirmed after a delay
    setTimeout(() => {
      // Clear cart items
      localStorage.removeItem('cartItems');
      eventEmitter.emit('cartUpdated', []);

      router.push('/checkout/confirmed');
      setIsLoading(false);
    }, 1000); // 1-second delay to simulate processing
  };

  return (
    <div className='w-full h-[80dvh] grid place-items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96 max-sm:w-72'>
        <PaymentElement />
        <Button className='flex gap-4' type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : `Pay $${parseFloat(total).toFixed(2)}`}
        </Button>
      </form>
    </div>
  );
};

const options: StripeElementsOptions = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  appearance: {
    /*...*/
  },
};

const Checkout: React.FC = () => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
