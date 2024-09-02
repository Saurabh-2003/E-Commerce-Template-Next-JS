import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

function SiteFooter() {
  const links = {
    section1: [
      { id: 1, href: "/about", text: "About Us" },
      { id: 2, href: "/shop", text: "Shop" },
      { id: 3, href: "/contact", text: "Contact" },
    ],
    section2: [
      { id: 4, href: "/privacy", text: "Privacy Policy" },
      { id: 5, href: "/terms", text: "Terms of Service" },
      { id: 6, href: "/faq", text: "FAQ" },
    ],
  };

  return (
    <footer className="flex flex-col mt-20 font-medium gap-4 pt-10 pb-4 px-10 bg-zinc-900 text-white">
      <div className="flex max-md:flex-col justify-between max-md:justify-center items-center">
        <div className="text-xs flex flex-col max-md:items-center gap-4">
          <h1 className="text-5xl font-bold max-md:text-center">
            Subscribe for Exclusive Deals
          </h1>
          <p className="max-md:mb-10">
            Join our newsletter for the latest offers and discounts.
          </p>
        </div>
        <div className="flex h-10 self-end max-md:self-center">
          <input
            type="text"
            placeholder="Enter your email"
            className="text-sm px-4 h-full rounded-l-xl"
          />
          <Button className="bg-amber-100/70 h-full text-black rounded-l-none rounded-r-xl">
            Subscribe
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 place-items-stretch py-20 w-full text-xs gap-10">
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl mb-4">ShopWithUs</h2>
          <p>
            Discover a wide range of products at unbeatable prices. Fast
            shipping and great deals await you.
          </p>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold text-2xl mb-4">Customer Care</h2>
          <ul className="flex flex-col gap-4 items-start">
            {links.section1.map((link) => (
              <li key={link.id}>
                <Link href={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold text-2xl mb-4">Recent Posts</h2>
          <ul className="flex flex-col gap-4 items-start">
            <li>Our Latest Collections</li>
            <li>Top Picks for You</li>
            <li>How to Shop Smart</li>
            <li>Customer Stories</li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold text-2xl mb-4">Contact Us</h2>
          <div className="flex flex-col gap-4">
            <p>123 E-commerce St, Shop City, EC 456789</p>
            <p>support@shopwithus.com</p>
            <p>+1 234 567 890</p>
          </div>
        </div>
      </div>

      <div className="flex max-sm:text-[10px] max-sm:px-2 text-black bg-amber-100/70 px-10 py-4 text-xs font-medium items-center justify-between">
        <p>© 2024 ShopWithUs. All rights reserved.</p>
        <p className="flex gap-0 items-center">
          <span className="max-sm:invisible">Follow us on</span>
          <span className="flex gap-2 w-40 justify-end">
            <FaTwitter size={20} />
            <FaInstagram size={20} />
            <FaFacebook size={20} />
            <FaYoutube size={20} />
          </span>
        </p>
      </div>

      <div className="py-2 text-center w-full text-xs">
        <ul className="flex items-center justify-center w-full gap-2">
          {links.section2.map((link) => (
            <li key={link.id}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default SiteFooter;
