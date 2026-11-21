import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  isPositive = true,
  changeLabel = 'vs last month',
  subtext,
  icon: Icon,
  glowColor = 'emerald',
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Smooth count-up animation if value is numeric
  useEffect(() => {
    const numericTarget = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, ''));
    if (isNaN(numericTarget)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200;
    const steps = 40;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(numericTarget * easedProgress);

      if (currentStep >= steps) {
        setDisplayValue(numericTarget);
        clearInterval(timer);
      } else {
        setDisplayValue(currentVal);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  const formattedDisplay = typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue;

  return (
    <GlassCard glowColor={glowColor} className={`p-6 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300">
            <Icon className="w-4 h-4 text-[#00E5A0]" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl lg:text-4xl font-bold font-mono tracking-tight text-white">
          {prefix}{formattedDisplay}{suffix}
        </span>
      </div>

      {(change !== undefined || subtext) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {change !== undefined && (
            <span
              className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-medium ${
                isPositive
                  ? 'bg-emerald-500/10 text-[#00E5A0] border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {change}
            </span>
          )}
          <span className="text-slate-400 truncate">{changeLabel || subtext}</span>
        </div>
      )}
    </GlassCard>
  );
};
