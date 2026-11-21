import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users2,
  Cpu,
  SlidersHorizontal,
  ShieldAlert,
  ShoppingBag,
  Settings,
  ArrowLeft,
  ChevronDown,
  X
} from 'lucide-react';

export const AppSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();

  const navItems = [
    {
      to: '/app/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/app/suppliers',
      label: 'Suppliers Directory',
      icon: Users2,
      badge: '18',
    },
    {
      to: '/app/optimizer',
      label: 'Order Optimizer',
      icon: Cpu,
      badge: 'FastAPI',
      badgeColor: 'bg-[#00E5A0]/20 text-[#00E5A0]',
    },
    {
      to: '/app/simulator',
      label: 'What-If Simulator',
      icon: SlidersHorizontal,
      badge: 'Live',
      badgeColor: 'bg-[#22D3EE]/20 text-[#22D3EE]',
    },
    {
      to: '/app/risk',
      label: 'Risk Center',
      icon: ShieldAlert,
      badge: '2 Alerts',
      badgeColor: 'bg-rose-500/20 text-rose-300',
    },
    {
      to: '/app/orders',
      label: 'Orders & Fulfillment',
      icon: ShoppingBag,
      badge: null,
    },
    {
      to: '/app/settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 bg-[#070A0F]/95 backdrop-blur-2xl border-r border-white/[0.08] text-slate-300 overflow-hidden">
      {/* Top Header & Navigation Container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 py-3 mb-4 shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00E5A0] via-[#22D3EE] to-[#8B5CF6] p-[1.5px] shadow-[0_0_15px_rgba(0,229,160,0.3)]">
              <div className="w-full h-full rounded-full bg-[#05070A] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5A0]" />
              </div>
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">
              Source<span className="text-[#00E5A0]">Flow</span>
            </span>
          </Link>

          {isMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              aria-label="Close Sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Workspace Switcher Pill */}
        <div className="p-2.5 mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center font-bold text-black text-xs shrink-0">
              A
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Apex Hardware Co.</div>
              <div className="text-[10px] text-slate-400 font-mono truncate">SMB Pro Tier</div>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </div>

        {/* Navigation Items (Scrollable internally if screen height is constrained) */}
        <nav className="space-y-1 overflow-y-auto no-scrollbar flex-1 pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || (item.to === '/app/dashboard' && location.pathname === '/app');

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                className={`
                  flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group
                  ${
                    isActive
                      ? 'bg-white/[0.08] text-white border border-[#00E5A0]/30 shadow-[0_4px_20px_rgba(0,229,160,0.1)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#00E5A0]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      item.badgeColor || 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer stays pinned at bottom */}
      <div className="pt-3 border-t border-white/[0.08] space-y-2.5 shrink-0">
        {/* API Engine Health Pill */}
        <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-[11px] font-mono">
          <div className="flex items-center justify-between text-slate-400 mb-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" />
              FastAPI Optimizer
            </span>
            <span className="text-[#00E5A0]">v2.4.1</span>
          </div>
          <div className="text-[10px] text-slate-500">Latency: 14ms (Optimal)</div>
        </div>

        {/* Return to Landing Page */}
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Landing Page</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen shrink-0 z-40 select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
