import React from 'react';

export const ScoreRing = ({
  score = 0,
  size = 64,
  strokeWidth = 5,
  showLabel = true,
  className = '',
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  // Color logic
  let colorStart = '#00E5A0';
  let colorEnd = '#22D3EE';
  let badgeColor = 'text-[#00E5A0]';

  if (clampedScore < 70) {
    colorStart = '#F43F5E';
    colorEnd = '#FB7185';
    badgeColor = 'text-rose-400';
  } else if (clampedScore < 85) {
    colorStart = '#F59E0B';
    colorEnd = '#FCD34D';
    badgeColor = 'text-amber-400';
  }

  const gradientId = `score-grad-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
        {/* Track background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-mono font-bold leading-none ${size > 50 ? 'text-sm' : 'text-xs'} ${badgeColor}`}>
            {clampedScore}
          </span>
        </div>
      )}
    </div>
  );
};
