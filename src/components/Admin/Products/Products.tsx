'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const dummyFetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Laser Lemonade Machine',
          status: 'Draft',
          price: 499.99,
          totalSales: 25,
          createdAt: '2023-07-12 10:42 AM',
          image: '/sweet1.jpg',
        },
        {
          id: 2,
          name: 'Hypernova Headphones',
          status: 'Active',
          price: 129.99,
          totalSales: 100,
          createdAt: '2023-10-18 03:21 PM',
          image: '/hero2.jpg',
        },
        {
          id: 3,
          name: 'AeroGlow Desk Lamp',
          status: 'Active',
          price: 39.99,
          totalSales: 50,
          createdAt: '2023-11-29 08:15 AM',
          image: '/sweet2.jpg',
        },
        {
          id: 4,
          name: 'TechTonic Energy Drink',
          status: 'Draft',
          price: 2.99,
          totalSales: 0,
          createdAt: '2023-12-25 11:59 PM',
          image: '/sweet3.jpg',
        },
        {
          id: 5,
          name: 'Gamer Gear Pro Controller',
          status: 'Active',
          price: 59.99,
          totalSales: 75,
          createdAt: '2024-01-01 12:00 AM',
          image: '/sweet4.jpg',
        },
        {
          id: 6,
          name: 'Luminous VR Headset',
          status: 'Active',
          price: 199.99,
          totalSales: 30,
          createdAt: '2024-02-14 02:14 PM',
          image: '/hero.jpg',
        },
      ]);
    }, 1000);
  });
};

export function Products() {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await dummyFetchProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4  w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/sweet2.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="hidden lg:flex">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px] sm:w-[192px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem>Active</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete all</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className="h-7">
                        <PanelLeft className="h-4 w-4" />
                        <span className="sr-only">Toggle Filters</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[240px]">
                      Open filters
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <TabsContent value="all" className="space-y-4">
              <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  All Products
                </h1>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Products
                  </CardTitle>
                  <CardDescription className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    <p>
                      You can manage your products here. Select the row to
                      navigate to the product page.
                    </p>
                    <div className="flex w-full items-center space-x-2 md:w-auto">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="h-8 w-full md:w-[224px]"
                      />
                      <Button size="sm" className="h-8">
                        Search
                      </Button>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="h-auto py-4">Product</TableHead>
                        <TableHead className="h-auto py-4">Status</TableHead>
                        <TableHead className="h-auto py-4">Price</TableHead>
                        <TableHead className="h-auto py-4">Total Sales</TableHead>
                        <TableHead className="h-auto py-4">Created At</TableHead>
                        <TableHead className="hidden h-auto py-4 md:block">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product:any) => (
                        <TableRow key={product.id}>
                          <TableCell className="flex items-center space-x-2 py-4">
                            <Image
                              src={product.image}
                              alt="Product Image"
                              height="64"
                              width="64"
                              className="aspect-square rounded-md object-cover"
                            />
                            <Link href="#" className="font-medium">
                              {product.name}
                            </Link>
                          </TableCell>
                          <TableCell className="py-4">{product.status}</TableCell>
                          <TableCell className="py-4">${product.price.toFixed(2)}</TableCell>
                          <TableCell className="py-4">{product.totalSales}</TableCell>
                          <TableCell className="py-4">{product.createdAt}</TableCell>
                          <TableCell className="hidden py-4 md:block">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default Products;
