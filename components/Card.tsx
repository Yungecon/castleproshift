import React, { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hoverEffect = true, style }) => (
  <div 
    style={style}
    className={`
      bg-[#1A1D21] border border-[#2A2E35] rounded-lg p-5
      relative transition-all duration-300 ease-out
      ${hoverEffect ? 'hover:translate-y-[-2px] hover:border-[#B08D57]/50 hover:shadow-lg group' : ''}
      ${className}
    `}
  >
    {hoverEffect && (
      <div className="absolute top-0 left-0 w-[3px] h-full bg-[#B08D57] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    )}
    {children}
  </div>
);