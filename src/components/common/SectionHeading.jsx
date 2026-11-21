import React from 'react';

export const SectionHeading = ({
  badge,
  title, // Can contain html or markdown-style asterisks or render normal
  subtitle,
  align = 'center', // center | left
  className = '',
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`flex flex-col ${isCentered ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-slate-300 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,229,160,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_8px_#00E5A0]" />
          <span>{badge}</span>
        </div>
      )}

      {title && (
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white max-w-4xl leading-[1.12]">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
