import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { SectionHeading } from '../common/SectionHeading';
import { PillButton } from '../common/PillButton';
import { MOCK_PRICING_TIERS } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Zap, Shield } from 'lucide-react';

export const Pricing = () => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const navigate = useNavigate();

  return (
    <section id="pricing" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Transparent Pricing"
        title={
          <>
            Predictable investment.{' '}
            <span className="font-serif italic text-gradient-emerald">Guaranteed ROI</span> on Order #1.
          </>
        }
        subtitle="Most customers save more on their first dual-supplier order split than the entire annual cost of SourceFlow."
      />

      {/* Billing Switch */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <span className={`text-xs sm:text-sm font-medium ${!annualBilling ? 'text-white' : 'text-slate-400'}`}>
          Monthly Billing
        </span>
        <button
          onClick={() => setAnnualBilling(!annualBilling)}
          className="relative w-14 h-7 rounded-full bg-white/10 border border-white/20 p-1 transition-colors cursor-pointer"
        >
          <div
            className={`w-5 h-5 rounded-full bg-gradient-to-r from-[#00E5A0] to-[#22D3EE] transition-transform duration-300 ${
              annualBilling ? 'translate-x-7' : 'translate-x-0'
            }`}
          />
        </button>
        <span className={`text-xs sm:text-sm font-medium flex items-center gap-1.5 ${annualBilling ? 'text-white' : 'text-slate-400'}`}>
          <span>Annual Billing</span>
          <span className="px-2 py-0.5 rounded-full bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30 text-[10px] font-mono">
            Save 20%
          </span>
        </span>
      </div>

      {/* Tiers Grid */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {MOCK_PRICING_TIERS.map((tier) => {
          const isFeatured = tier.popular;

          // Adjust price if annual
          const baseNum = parseInt(tier.price.replace('$', '').replace(',', ''));
          const displayPrice = isNaN(baseNum)
            ? tier.price
            : annualBilling
            ? `$${Math.round(baseNum * 0.8).toLocaleString()}`
            : tier.price;

          return (
            <div
              key={tier.name}
              className={`relative rounded-[26px] p-[1.5px] ${
                isFeatured
                  ? 'bg-gradient-to-b from-[#00E5A0] via-[#22D3EE] to-[#8B5CF6] shadow-[0_0_40px_rgba(0,229,160,0.2)]'
                  : 'bg-transparent'
              }`}
            >
              <GlassCard
                hoverEffect={true}
                glowColor={isFeatured ? 'emerald' : 'none'}
                className={`h-full p-8 flex flex-col justify-between ${
                  isFeatured ? 'bg-[#080D14]' : 'bg-white/[0.03]'
                }`}
              >
                <div>
                  {/* Badge & Title */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                        isFeatured
                          ? 'bg-[#00E5A0] text-black font-semibold shadow-sm'
                          : 'bg-white/[0.05] border border-white/10 text-slate-300'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 min-h-[36px] mb-6">
                    {tier.desc}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/[0.08]">
                    <span className="text-4xl sm:text-5xl font-bold font-mono text-white tracking-tight">
                      {displayPrice}
                    </span>
                    <span className="text-slate-400 text-xs sm:text-sm font-mono">
                      {tier.period}
                    </span>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3.5 mb-8">
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#00E5A0] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <PillButton
                  variant={isFeatured ? 'gradient' : 'secondary'}
                  size="md"
                  onClick={() => navigate('/app/optimizer')}
                  className="w-full"
                >
                  {tier.cta}
                </PillButton>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
};
