import React, { ReactNode } from 'react';
import { DepthLevel } from '../types';

interface LayerDrawerProps {
  title: string;
  isActive: boolean;
  onToggle: () => void;
  children?: ReactNode;
  depth?: DepthLevel;
}

const DepthBadge = ({ depth }: { depth?: DepthLevel }) => {
  if (!depth || depth === 'essential') return null;
  
  const colors = {
    useful: 'bg-[#B08D57]/20 text-[#B08D57]',
    deep: 'bg-[#2A2E35] text-[#666]'
  };

  const labels = {
    useful: 'Useful',
    deep: 'Deep Dive'
  };

  return (
    <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ml-2 ${colors[depth]}`}>
      {labels[depth]}
    </span>
  );
};

export const LayerDrawer: React.FC<LayerDrawerProps> = ({ title, isActive, onToggle, children, depth }) => (
  <div className="border-t border-[#2A2E35]/50 last:border-b-0">
    <div className="flex items-center justify-between py-3 cursor-pointer group" onClick={onToggle}>
      <div className="flex items-center">
        <span className={`text-[10px] uppercase tracking-wider font-semibold transition-colors ${isActive ? 'text-[#B08D57]' : 'text-[#666] group-hover:text-[#888]'}`}>
          {title}
        </span>
        <DepthBadge depth={depth} />
      </div>
      <button 
        className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors duration-300 ${isActive ? 'bg-[#B08D57]' : 'bg-[#2A2E35]'}`}
      >
        <div className={`bg-[#0F1113] w-3 h-3 rounded-full shadow-sm transform transition-transform duration-300 ${isActive ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
    </div>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-96 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
      {children}
    </div>
  </div>
);