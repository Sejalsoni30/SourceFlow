import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppNavbar } from './AppNavbar';
import { GlobalSearchModal } from './GlobalSearchModal';
import { BackgroundOrbs } from '../common/BackgroundOrbs';

export const AppLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#05070A] text-slate-100 flex relative bg-grain">
      {/* Subtle background ambient orbs */}
      <BackgroundOrbs className="opacity-30" />

      {/* Fixed Sidebar: Pinned to the left and never scrolls with page */}
      <AppSidebar
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area: Independent smooth scrolling while sidebar stays fixed */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth">
        {/* Sticky App Header */}
        <AppNavbar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-16">
          <Outlet />
        </main>
      </div>

      {/* Global Search Palette Modal (Cmd+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};
