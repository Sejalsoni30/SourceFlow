import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PillButton } from '../common/PillButton';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Plus,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Activity
} from 'lucide-react';

export const AppNavbar = ({ onOpenMobileSidebar, onOpenSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Clean, concise breadcrumb label mapping
  const routeNames = {
    '/app': 'Dashboard Overview',
    '/app/dashboard': 'Dashboard Overview',
    '/app/suppliers': 'Suppliers Directory',
    '/app/optimizer': 'Optimizer Studio',
    '/app/simulator': 'What-If Simulator',
    '/app/risk': 'Global Risk Radar',
    '/app/orders': 'Orders & Logistics',
    '/app/settings': 'Settings & Webhooks',
  };

  const isOptimizerPage = location.pathname === '/app/optimizer';
  const currentTitle = routeNames[location.pathname] || 'Workspace';

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 bg-[#05070A]/75 backdrop-blur-2xl border-b border-white/[0.06] px-3 sm:px-6 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Left Breadcrumb & Mobile Menu */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white shrink-0 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs min-w-0">
          <span className="text-slate-400 font-medium hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]" />
            Apex Hardware Co.
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline shrink-0" />
          <span className="font-semibold text-slate-100 tracking-wide truncate max-w-[170px] sm:max-w-none">
            {currentTitle}
          </span>
        </div>
      </div>

      {/* Center Search Pill (Click to open Command palette) */}
      <div className="hidden lg:flex items-center">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 text-xs text-slate-400 hover:text-white transition-all w-72 justify-between shadow-inner"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Search suppliers, SKUs, POs...</span>
          </span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/10 text-[10px] font-mono text-slate-300">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* System Health Badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/25 text-[11px] font-mono text-[#00E5A0] shadow-[0_0_12px_rgba(0,229,160,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" />
          <span>FastAPI Live</span>
        </div>

        {/* Search icon on mobile */}
        <button
          onClick={onOpenSearch}
          className="lg:hidden p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          {/* Quick Notification Dropdown */}
          {notificationOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotificationOpen(false)}
              />
              <div className="absolute right-0 top-12 w-[calc(100vw-2rem)] max-w-sm p-4 rounded-2xl bg-[#090D14]/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 text-xs font-mono">
                  <span className="font-semibold text-white">Live Disruption Radar</span>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400">2 Critical</span>
                    <button
                      onClick={() => setNotificationOpen(false)}
                      className="p-1 rounded-md text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div
                    onClick={() => {
                      setNotificationOpen(false);
                      navigate('/app/risk');
                    }}
                    className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/30 hover:border-rose-500/60 cursor-pointer transition-all"
                  >
                    <div className="font-semibold text-rose-300">Port of Yantian Congestion</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      +7 days transit delay on Shenzen Rapid Mold POs.
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setNotificationOpen(false);
                      navigate('/app/risk');
                    }}
                    className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 hover:border-amber-500/60 cursor-pointer transition-all"
                  >
                    <div className="font-semibold text-amber-300">Raw Material Surcharge</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Bauxite spot price +18%. Action recommended.
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setNotificationOpen(false);
                    navigate('/app/risk');
                  }}
                  className="w-full mt-3 text-center text-xs font-mono text-[#00E5A0] hover:underline"
                >
                  Open Full Risk Center →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Action Button: Show "+ New Optimization" only when on OTHER pages */}
        {!isOptimizerPage ? (
          <PillButton
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/optimizer')}
            iconComponent={Plus}
            className="shadow-sm text-xs px-2.5 py-1.5 sm:px-4 sm:py-2"
          >
            <span className="hidden sm:inline">New Optimization</span>
            <span className="sm:hidden">Optimize</span>
          </PillButton>
        ) : (
          <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span>Studio Active</span>
          </div>
        )}
      </div>
    </header>
  );
};
