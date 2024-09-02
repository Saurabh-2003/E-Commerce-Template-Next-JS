"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import eventEmitter from "@/core/utils/eventEmitter";
import { DmSherif } from "@/resources/assets";
import {
  BookOpenCheck,
  Home,
  Menu,
  SearchIcon,
  ShoppingBasket,
  ShoppingCart,
  User,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/products", icon: ShoppingBasket },
  { name: "About", href: "/about", icon: BookOpenCheck },
];

const icons = {
  search: SearchIcon,
  cart: ShoppingCart,
  user: UserCircle,
  menu: Menu,
};

type CartItem = {
  id: string;
  quantity: number;
};

type User = {
  id: string;
  name: string;
  image?: string;
};

const classes = {
  header: "bg-white border-y shadow-sm p-4 flex items-center justify-between",
  searchInput: "w-40 rounded-md pl-8 pr-2 py-1 text-sm",
  searchIcon:
    "cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400",
  hiddenMd: "relative max-md:hidden",
  linkMdHidden: `md:hidden ${DmSherif.className}`,
  textMdHidden: "text-xl",
  nav: "hidden md:flex items-center gap-6 flex-grow justify-center",
  navLink: "flex items-center space-x-1",
  navLinkActive: "font-bold",
  navLinkInactive: "text-gray-800 hover:text-gray-600",
  flexItems: "flex items-center w-40 justify-end gap-4",
  searchInputMobile:
    "border rounded-md ease-in-out transition-all duration-500 pr-8 pl-2 py-1",
  searchInputMobileHidden: "w-0 border-transparent bg-transparent",
  searchIconMobile:
    "cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400",
  cartLink: "relative max-md:hidden",
  cartIcon: "text-lg text-gray-800 hover:text-gray-600",
  cartCount:
    "absolute -top-2 -right-2 bg-red-500 text-white font-bold rounded-full size-4 text-[9px] text-center text-xs",
  userContainer: "flex items-center space-x-4 max-md:hidden",
  userImage: "w-8 h-8 rounded-full border-2 border-gray-800",
  userFallback:
    "w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-300 flex items-center justify-center text-gray-800",
  userIcon: "cursor-pointer",
  sheetMdHidden: "md:hidden",
  sheetContent: "py-20",
  sheetLink:
    "px-4 rounded-xl flex gap-4 items-center py-2 text-gray-800 hover:text-gray-600",
  sheetLinkActive:
    "bg-black hover:text-slate-100 text-slate-100 dark:bg-white dark:text-black",
};

const SiteHeader: React.FC = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState(""); // Search text state
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const updateCartItemsCount = () => {
      const cartItems = localStorage.getItem("cartItems");
      const parsedCartItems: CartItem[] = cartItems
        ? JSON.parse(cartItems)
        : [];
      setCartItemsCount(parsedCartItems.length);
    };

    updateCartItemsCount();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "cartItems") {
        updateCartItemsCount();
      }
    };

    const handleCartUpdate = (newCartItems: CartItem[]) => {
      setCartItemsCount(newCartItems.length);
    };

    window.addEventListener("storage", handleStorageChange);
    eventEmitter.on("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      eventEmitter.off("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const parsedUser: User | null = storedUser
        ? JSON.parse(storedUser)
        : null;
      setUser(parsedUser);
    }
  }, []);

  const isActive = (link: string) => pathname === link;

  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(
        `/products?searchText=${encodeURIComponent(searchText.trim())}`,
      );
    }
  };

  return (
    <header className={classes.header}>
      <h1
        onClick={() => router.push("/sales")}
        className="text-xl font-bold text-gray-900"
      >
        E-Commerce
      </h1>

      <nav className={classes.nav}>
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} passHref>
            <span
              className={`${classes.navLink} ${
                isActive(link.href)
                  ? classes.navLinkActive
                  : classes.navLinkInactive
              }`}
            >
              {link.name}
            </span>
          </Link>
        ))}
      </nav>

      <div className={classes.flexItems}>
        <div className={classes.hiddenMd}>
          <input
            type="text"
            placeholder="Shop here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className={classes.searchInput}
          />
          <icons.search
            size={20}
            className={classes.searchIcon}
            onClick={handleSearch}
          />
        </div>

        <div className="relative md:hidden">
          <input
            disabled={!isSearchOpen}
            type="text"
            placeholder="Shop here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className={`${
              isSearchOpen ? "w-36" : classes.searchInputMobileHidden
            } ${classes.searchInputMobile}`}
          />
          <icons.search
            onClick={() => {
              if (isSearchOpen) {
                handleSearch();
              } else {
                setIsSearchOpen((prev) => !prev);
              }
            }}
            className={classes.searchIconMobile}
          />
        </div>

        <Link href="/cart" className={classes.cartLink}>
          <icons.cart className={classes.cartIcon} />
          {cartItemsCount > 0 && (
            <span className={classes.cartCount}>{cartItemsCount}</span>
          )}
        </Link>

        <div className={classes.userContainer}>
          {user ? (
            <div className="relative flex items-center">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="User Avatar"
                  className={classes.userImage}
                  onClick={() => router.push("/profile")}
                />
              ) : (
                <div
                  className={classes.userFallback}
                  onClick={() => router.push("/profile")}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ) : (
            <User
              className={classes.userIcon}
              onClick={() => router.push("/login")}
            />
          )}
        </div>

        <div className={classes.sheetMdHidden}>
          <Sheet>
            <SheetTrigger>
              <icons.menu
                className="text-gray-800 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </SheetTrigger>
            <SheetContent className={classes.sheetContent}>
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} passHref>
                  <p
                    className={`${classes.sheetLink} ${
                      isActive(link.href) ? classes.sheetLinkActive : ""
                    }`}
                  >
                    <link.icon size={20} />
                    {link.name}
                  </p>
                </Link>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
