import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard Auth",
  description: "Authentication Layout for Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center p-4 md:p-0 bg-[#faf8f6]">
      
      {/* Top Left Logo */}
      <div className="absolute top-16 mx-auto container">
        <Image
          src="/images/logo.png" 
          width={200}
          height={90}
          alt="Company Logo"
          priority
        />
      </div>

      {/* Auth Form */}
      <div>{children}</div>
    </div>
  );
}
