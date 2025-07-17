"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <nav className="w-full border-b border-neutral-200 bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold tracking-tight uppercase text-black">
          Deadball
        </Link>
        {/* Desktop Nav */}
        <div className="hidden sm:flex gap-6 text-sm font-medium text-neutral-700">
          <Link href="/debate" className="hover:text-black transition">Debate</Link>
          <Link href="/explore/drag-vs-hr" className="hover:text-black transition">Drag vs. HRs</Link>
          <Link href="/explore/exit-velocity" className="hover:text-black transition">Exit Velocity</Link>
          <Link href="/analytics" className="hover:text-black transition">Analytics</Link>
          <Link href="/learn" className="hover:text-black transition">Learn</Link>
          <Link href="/reference" className="hover:text-black transition">Reference</Link>
        </div>
        {/* Hamburger for Mobile */}
        <button
          className="sm:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setDrawerOpen(false)}></div>
      )}
      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-200 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
          <span className="text-xl font-extrabold uppercase">Menu</span>
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4 p-6 text-base font-medium text-neutral-800">
          <Link href="/debate" className="hover:text-black transition" onClick={() => setDrawerOpen(false)}>Debate</Link>
          <Link href="/explore/drag-vs-hr" className="hover:text-black transition" onClick={() => setDrawerOpen(false)}>Drag vs. HRs</Link>
          <Link href="/explore/exit-velocity" className="hover:text-black transition" onClick={() => setDrawerOpen(false)}>Exit Velocity</Link>
          <Link href="/analytics" className="hover:text-black transition" onClick={() => setDrawerOpen(false)}>Analytics</Link>
          <Link href="/learn" className="hover:text-black transition" onClick={() => setDrawerOpen(false)}>Learn</Link>
          <Link href="/reference" className="hover:text-black transition" onClick={() => setDrawerOpen(false)}>Reference</Link>
        </div>
      </div>
    </nav>
  );
} 