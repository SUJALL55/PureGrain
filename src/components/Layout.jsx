import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import BottomNavigationBar from './BottomNavigationBar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-body">
      <Navbar />
      <main className="flex-1 pb-16"> {/* Added padding-bottom to account for fixed bottom nav */}
        <Outlet />
      </main>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
}