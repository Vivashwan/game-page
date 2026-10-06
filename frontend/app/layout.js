import { Inter, Ubuntu } from "next/font/google";
import { AppProvider } from "@/components/AppProvider";
import { IconSprite } from "@/components/Icons";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"], style: ["normal", "italic"], variable: "--font-ubuntu" });

export const metadata = {
  title: "Gaming Gadgets on Rent | Bangalore",
  description: "Rent PS5, Xbox, VR headsets and racing wheels in Bangalore.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${ubuntu.variable}`}>
      <body>
        <IconSprite />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
