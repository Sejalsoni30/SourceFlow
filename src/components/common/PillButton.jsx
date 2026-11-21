import React, { useRef } from 'react';
import { ArrowUpRight, ArrowRight, Loader2 } from 'lucide-react';

export const PillButton = ({
  children,
  variant = 'primary', // primary | secondary | gradient | ghost
  size = 'md', // sm | md | lg
  icon = true,
  iconComponent: IconComponent,
  loading = false,
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
  const buttonRef = useRef(null);

  // Subtle magnetic hover feel
  const handleMouseMove = (e) => {
    if (disabled || loading || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.15;
    const y = (e.clientY - (top + height / 2)) * 0.15;
    buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = 'translate3d(0, 0, 0)';
  };

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-medium',
  };

  const variantClasses = {
    primary:
      'bg-white text-slate-950 font-semibold hover:bg-slate-100 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all',
    secondary:
      'bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/[0.12] hover:border-white/[0.25] backdrop-blur-md shadow-sm transition-all',
    gradient:
      'bg-gradient-to-r from-[#00E5A0] via-[#22D3EE] to-[#00E5A0] bg-[length:200%_auto] hover:bg-[position:right_center] text-slate-950 font-semibold shadow-[0_0_25px_rgba(0,229,160,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] transition-all duration-300',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all',
  };

  const RenderIcon = IconComponent || ArrowUpRight;

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        group relative inline-flex items-center justify-center
        rounded-full tracking-normal
        transition-all duration-200 select-none cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          <span>{children}</span>
          {icon && (
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <RenderIcon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-4 h-4' : 'w-4 h-4'} />
            </span>
          )}
        </>
      )}
    </button>
  );
};
