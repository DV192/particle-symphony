import { Special_Elite  } from "next/font/google";
import "./globals.css";

const special_Elite = Special_Elite ({ subsets: ["latin"], weight: '400' });

export const metadata = {
  title: "Particle Symphony",
  description: "Beautiful particle animation using Three.js and React Three Fiber",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${special_Elite.className} bg-[#101720] max-w-[84rem]`}>
        {children}
      </body>
    </html>
  );
}
