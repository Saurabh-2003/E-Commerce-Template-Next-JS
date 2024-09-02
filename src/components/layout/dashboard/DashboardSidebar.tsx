'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { RiDashboard2Line } from 'react-icons/ri';

const navItems = [
  { href: "/sales", icon: RiDashboard2Line, label: "Acme Inc" },
  { href: "/sales", icon: Home, label: "Dashboard" },
  { href: "/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin-products", icon: Package, label: "Products" },
  { href: "/users", icon: Users2, label: "Customers" },
  { href: "/analytics", icon: LineChart, label: "Analytics" },
];

const settingsItem = { href: "#", icon: Settings, label: "Settings" };

const DashboardSidebar = () => {
  const router = useRouter();
  const pathname = usePathname()
  const isActive = (href:string) => pathname === href;

  return (
    <div>
      <aside className="h-dvh sticky inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          {navItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex size-10 rounded-full items-center justify-center transition-colors ${isActive(item.href) ? 'bg-black text-white' : 'text-muted-foreground hover:text-foreground'} md:h-8 md:w-8`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={settingsItem.href}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${isActive(settingsItem.href) ? 'bg-black text-white' : 'text-muted-foreground hover:text-foreground'} md:h-8 md:w-8`}
              >
                <settingsItem.icon className="h-5 w-5" />
                <span className="sr-only">{settingsItem.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{settingsItem.label}</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </div>
  );
}

export default DashboardSidebar;
