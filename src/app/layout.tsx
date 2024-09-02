import { fontSans, rootMetadata } from "@/resources";
import { rootViewport } from "@/resources/meta/root";
import { IChildren } from "@/resources/types";
import { Toaster } from "sonner";
import "./globals.css";
const RootLayout = ({ children }: IChildren) => (
  <html lang="en" suppressHydrationWarning={true}>
    <body suppressHydrationWarning={true} className={fontSans.className}>
      <div className=" container px-0 max-w-[1920px] bg-zinc-50">
        {children}
      </div>
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
export const metadata = rootMetadata;
export const viewport = rootViewport;
