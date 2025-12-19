import React from 'react';
import { VISUALS } from '../constants';

interface VisualContainerProps {
  visualId?: string;
  className?: string;
}

export const VisualContainer = ({ visualId, className = "" }: VisualContainerProps) => {
  if (!visualId || !VISUALS[visualId]) return null;
  return (
    <div className={`flex items-center justify-center bg-[#0F1113] border border-[#2A2E35] rounded-lg p-4 ${className}`}>
      <div className="w-16 h-16 opacity-90">
        {VISUALS[visualId]}
      </div>
    </div>
  );
};