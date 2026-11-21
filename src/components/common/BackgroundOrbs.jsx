import React from 'react';

export const BackgroundOrbs = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Top Left Emerald Orb */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[550px] h-[550px] rounded-full bg-[#00E5A0]/15 blur-[130px] animate-float-slow" 
      />

      {/* Center Right Cyan Orb */}
      <div 
        className="absolute top-[25%] -right-[15%] w-[600px] h-[600px] rounded-full bg-[#22D3EE]/12 blur-[150px] animate-float-reverse" 
      />

      {/* Bottom Violet Orb */}
      <div 
        className="absolute top-[60%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/10 blur-[140px] animate-pulse-glow" 
      />

      {/* Subtle radial center spotlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-radial from-white/[0.02] to-transparent blur-3xl pointer-events-none" 
      />
    </div>
  );
};
