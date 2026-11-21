import React from 'react';

export const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  glowColor = 'emerald', // emerald | cyan | violet | none
  onClick,
  ...props
}) => {
  const glowStyles = {
    emerald: 'hover:border-[#00E5A0]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(0,229,160,0.15)]',
    cyan: 'hover:border-[#22D3EE]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(34,211,238,0.15)]',
    violet: 'hover:border-[#8B5CF6]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(139,92,246,0.15)]',
    none: 'hover:border-white/20',
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden
        rounded-[24px]
        bg-white/[0.035]
        backdrop-blur-xl
        border border-white/[0.08]
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.08)]
        transition-all duration-300 ease-out
        ${hoverEffect ? `hover:-translate-y-1 ${glowStyles[glowColor] || glowStyles.emerald} cursor-pointer` : ''}
        ${className}
      `}
      {...props}
    >
      {/* Subtle top inner gradient sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
