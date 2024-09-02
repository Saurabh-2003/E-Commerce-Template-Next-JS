
import NewArrival from '@/components/products/new-arrival'
import {SingleProduct} from '@/components/products/product'
import React from 'react'

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div className='flex  container py-10 gap-20 flex-col'><SingleProduct  id={params.id}/></div>
  )
}

export default page