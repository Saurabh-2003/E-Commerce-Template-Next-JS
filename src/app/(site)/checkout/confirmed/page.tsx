'use client'
import { Button } from '@/components/ui/button'
import {CheckCircle} from 'lucide-react'
import { useRouter } from 'next/navigation'

const Success = () => {
  const router = useRouter()
  return (
    <main className='flex items-center justify-center gap-10 flex-col h-[100svh] '>
        <CheckCircle className='size-40 ' />
        <h1 className='text-3xl '> Payment Successful</h1>
        <Button 
        onClick={() => router.push('/products')}
        >Browse More Products</Button>
    </main>
  )
}

export default Success