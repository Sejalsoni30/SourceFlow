import React from 'react';
import { Cpu, Box, Shirt, Wrench, Apple, FlaskConical, Layers, Anchor } from 'lucide-react';

export const Marquee = () => {
  const categories = [
    { label: 'Precision Electronics', icon: Cpu, sub: 'SMT, PCB, Microcontrollers' },
    { label: 'Sustainable Packaging', icon: Box, sub: 'FSC Corrugated, Bio-polymers' },
    { label: 'Technical Textiles', icon: Shirt, sub: 'GOTS Organic, Recycled Fibers' },
    { label: 'Auto & CNC Hardware', icon: Wrench, sub: 'Aerospace Billet, Die Casting' },
    { label: 'Food & Cold Chain', icon: Apple, sub: 'HACCP, Certified Bio-ingredients' },
    { label: 'Chemical Polymers', icon: FlaskConical, sub: 'REACH Green Resins, Specialty' },
    { label: 'High-Tolerance Molds', icon: Layers, sub: 'Injection Tooling, Rapid Prototyping' },
    { label: 'Global Freight & Air', icon: Anchor, sub: 'Multi-modal Ocean, Express Air' },
  ];

  // Repeat for smooth infinite scroll
  const marqueeItems = [...categories, ...categories, ...categories];

  return (
    <section className="relative py-12 overflow-hidden border-y border-white/[0.06] bg-black/20">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-mono">
          Intelligently orchestrating supplier ecosystems across 14+ global manufacturing categories
        </p>
      </div>

      {/* Side Vignette Fades */}
      <div className="absolute left-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-r from-[#05070A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-l from-[#05070A] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee gap-4 py-2 hover:[animation-play-state:paused] cursor-default">
        {marqueeItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:border-[#00E5A0]/40 hover:bg-white/[0.06] transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-[#00E5A0] group-hover:scale-110 transition-all">
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white group-hover:text-[#00E5A0] transition-colors whitespace-nowrap">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                  {item.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
