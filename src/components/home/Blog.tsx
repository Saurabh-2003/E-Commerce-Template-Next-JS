'use client'
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Blog {
  id: number;
  src: string;
  title: string;
  description: string;
  link: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    src: '/sweet1.jpg',
    title: 'Traditional Indian Sweets',
    description: 'Indulge in our traditional Indian sweets made from the finest ingredients.',
    link: '/',
  },
  {
    id: 2,
    src: '/sweet2.jpg',
    title: 'Festive Delights',
    description: 'Celebrate with our special festive sweets collection. Perfect for all occasions.',
    link: '/',
  },
  {
    id: 3,
    src: '/sweet3.jpg',
    title: 'Healthy Sweets',
    description: 'Enjoy our range of healthy sweets made with natural ingredients.',
    link: '/',
  },
];

interface BlogCardProps {
  src: string;
  title: string;
  description: string;
  link: string;
  isMain?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ src, title, description, link, isMain = false }) => (
  <div className={`relative ${isMain ? 'w-full lg:w-2/5 max-sm:h-[250px] lg:max-h-full h-[520px]' : 'w-full h-[250px]'}`}>
    <Image
      fill={true}
      src={src}
      alt="Image"
      className="object-cover brightness-75 w-full h-full rounded"
    />
    <div className="absolute px-10 py-10 flex flex-col gap-2 justify-end bg-opacity-45 items-start w-full h-full bg-black p-2">
      <h2 className="text-2xl text-white font-bold">{title}</h2>
      <p className="text-xs text-stone-200">{description}</p>
      <Link className="text-white text-sm" href={link}>Read More</Link>
    </div>
  </div>
);

const Blog: React.FC = () => {
  const router = useRouter()
  return (
    <div className="space-y-4 px-6">
      <h1 className="text-4xl max-sm:text-center font-bold">Blogs</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Blog Card */}
        <BlogCard
          src="/sweet4.jpg"
          title="Discover the Flavors of India"
          description="Experience the rich and diverse flavors of Indian mithai. Explore our top picks."
          link="/"
          isMain
        />

        <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4 w-full lg:w-3/5">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
          
          <Button onClick={() => router.push('/products')} variant={'outline'} className="grid place-items-center w-full h-[250px] rounded">
            See More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
