import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { SectionHeading } from '../common/SectionHeading';
import { MOCK_TESTIMONIALS } from '../../data/mockData';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Proven Supply Chain ROI"
        title={
          <>
            Loved by SMB founders who{' '}
            <span className="font-serif italic text-gradient-emerald">refuse stockouts</span>.
          </>
        }
        subtitle="Discover how fast-growing hardware, ecommerce, and consumer product brands protect their gross margins with algorithmic multi-sourcing."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_TESTIMONIALS.map((item, idx) => (
          <GlassCard
            key={item.author}
            glowColor={idx === 1 ? 'emerald' : idx === 0 ? 'cyan' : 'violet'}
            className="p-7 flex flex-col justify-between"
          >
            <div>
              {/* Star Rating & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#00E5A0]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] border border-white/10 text-slate-300">
                  {item.badge}
                </span>
              </div>

              {/* Verified Result Metric */}
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] text-xs font-mono font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{item.stats}</span>
              </div>

              {/* Quote */}
              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                "{item.quote}"
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <div>
                <h4 className="text-sm font-semibold text-white">{item.author}</h4>
                <p className="text-xs text-slate-400">
                  {item.role}, <span className="text-slate-300">{item.company}</span>
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
