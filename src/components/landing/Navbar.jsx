import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PillButton } from '../common/PillButton';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Live Demo', href: '#live-demo' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Risk Radar', href: '#problem-solution' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-6 pointer-events-none transition-all duration-300">
        <nav
          className={`
            pointer-events-auto w-full max-w-6xl
            flex items-center justify-between
            transition-all duration-500 ease-out
            rounded-full
            ${
              isScrolled
                ? 'py-2 px-4 sm:py-2.5 sm:px-6 bg-black/75 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)]'
                : 'py-2.5 px-4 sm:py-3.5 sm:px-6 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.37)]'
            }
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#00E5A0] via-[#22D3EE] to-[#8B5CF6] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(0,229,160,0.3)]">
              <div className="w-full h-full rounded-full bg-[#05070A] flex items-center justify-center">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00E5A0] animate-pulse" />
              </div>
            </div>
            <span className="font-semibold text-base sm:text-lg tracking-tight text-white flex items-center">
              Source<span className="text-[#00E5A0]">Flow</span>
              <span className="ml-1 sm:ml-1.5 px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-medium rounded-full bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20">
                AI
              </span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs lg:text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/app/dashboard"
              className="text-xs lg:text-sm font-medium text-slate-300 hover:text-[#00E5A0] px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Right Action (Desktop) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <PillButton
              variant="primary"
              size="sm"
              onClick={() => navigate('/app/optimizer')}
              className="shadow-[0_0_20px_rgba(255,255,255,0.2)] text-xs sm:text-sm"
            >
              Launch App
            </PillButton>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <PillButton
              variant="primary"
              size="sm"
              onClick={() => navigate('/app/optimizer')}
              icon={false}
              className="text-xs px-2.5 py-1 sm:px-3 sm:py-1.5"
            >
              App
            </PillButton>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-full bg-white/[0.06] border border-white/10 text-slate-200 hover:text-white transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-start">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative mx-4 mt-20 bg-[#080B10]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200 z-10 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-slate-200 hover:text-[#00E5A0] py-2.5 px-3 rounded-xl hover:bg-white/[0.04] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/app/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-200 hover:text-[#00E5A0] py-2.5 px-3 rounded-xl hover:bg-white/[0.04] transition-colors flex items-center justify-between"
            >
              <span>App Dashboard</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00E5A0]/20 text-[#00E5A0]">Live</span>
            </Link>

            <div className="pt-2">
              <PillButton
                variant="gradient"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/app/optimizer');
                }}
                className="w-full text-sm"
              >
                Launch Optimizer Studio
              </PillButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
