import SiteFooter from "@/components/layout/site/site-footer";
import SiteHeader from "@/components/layout/site/site-header";
import NavBarTop from "@/components/layout/site/site-top-header-bar";
import { FilterProvider } from "@/core/context/filters-context";
import { type IChildren } from "@/resources/types";

const SiteLayout = ({ children }: IChildren) => (
  <main>
    <NavBarTop />
    <SiteHeader />
    <FilterProvider>{children}</FilterProvider>
    <SiteFooter />
  </main>
);

export default SiteLayout;
