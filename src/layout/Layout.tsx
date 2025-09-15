import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './SimpleNavbar';
import Footer from './ImprovedFooter';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;