
import DashboardSidebar from "@/components/layout/dashboard/DashboardSidebar";
import { type IChildren } from "@/resources/types";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const SiteLayout = ({ children }: IChildren) => (
  <main className=" container px-0  bg-red-50 flex ">
    <TooltipProvider>
      <DashboardSidebar />
      {children}
    </TooltipProvider>
  </main>
);

export default SiteLayout;
