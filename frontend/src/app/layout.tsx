import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { useState } from "react";
import Navbar from "../components/Navbar";
import CacheManager from "../components/CacheManager";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 font-sans">
        <Navbar />
        <main>{children}</main>
        <footer className="w-full border-t border-neutral-200 py-8 mt-8 text-center text-neutral-500 text-xs">
          &copy; {new Date().getFullYear()} Deadball
        </footer>
        <CacheManager />
      </body>
    </html>
  );
}
