import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="font-sans bg-background min-h-[100dvh] flex flex-col">
      <a
        href="#main-content"
        className="fixed left-[max(0.75rem,env(safe-area-inset-left))] top-[max(6rem,calc(env(safe-area-inset-top)+5rem))] z-[70] rounded-md bg-background px-4 py-3 text-sm font-medium text-foreground opacity-0 pointer-events-none -translate-x-2 shadow-lg ring-2 ring-accent transition-[opacity,transform] duration-200 hover:underline focus-visible:pointer-events-auto focus-visible:translate-x-0 focus-visible:opacity-100 focus-visible:no-underline"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 scroll-mt-20 outline-none" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}