import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PillButton } from '../common/PillButton';
import { Cpu, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

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
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none transition-all duration-300">
      <nav
        className={`
          pointer-events-auto w-full max-w-6xl
          flex items-center justify-between
          transition-all duration-500 ease-out
          rounded-full
          ${
            isScrolled
              ? 'py-2.5 px-5 bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)]'
              : 'py-3.5 px-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.37)]'
          }
        `}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#00E5A0] via-[#22D3EE] to-[#8B5CF6] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(0,229,160,0.3)]">
            <div className="w-full h-full rounded-full bg-[#05070A] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E5A0] animate-pulse" />
            </div>
          </div>
          <span className="font-semibold text-lg tracking-tight text-white flex items-center">
            Source<span className="text-[#00E5A0]">Flow</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-full bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20">
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
              className="text-xs lg:text-sm font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/app/dashboard"
            className="text-xs lg:text-sm font-medium text-slate-300 hover:text-[#00E5A0] px-3.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
          >
            Dashboard
          </Link>
        </div>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-3">
          <PillButton
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/optimizer')}
            className="shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Launch App
          </PillButton>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <PillButton
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/optimizer')}
            icon={false}
            className="text-xs px-3 py-1.5"
          >
            App
          </PillButton>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-20 inset-x-4 bg-[#080B10]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-slate-300 hover:text-[#00E5A0] py-2 border-b border-white/[0.05]"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/app/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-slate-300 hover:text-[#00E5A0] py-2 border-b border-white/[0.05]"
          >
            Live App Dashboard
          </Link>
          <PillButton
            variant="gradient"
            size="md"
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/app/optimizer');
            }}
            className="w-full mt-2"
          >
            Launch SourceFlow App
          </PillButton>
        </div>
      )}
    </header>
  );
};
