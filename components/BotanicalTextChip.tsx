import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface BotanicalTextChipProps {
  label: string;
  info: string;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

export const BotanicalTextChip: React.FC<BotanicalTextChipProps> = ({ label, info, isOpen, onToggle, isLast }) => {
  const randomDelay = `${Math.random() * 5}s`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverState, setPopoverState] = useState({ 
    top: 0, 
    left: 0, 
    placement: 'top', 
    arrowOffset: 0 
  });

  // Calculate position when opening
  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popoverWidth = 192; // w-48 is 12rem = 192px
      const margin = 8;
      
      // Calculate Horizontal Position (Center aligned initially)
      const triggerCenter = rect.left + rect.width / 2;
      let left = triggerCenter - popoverWidth / 2;
      
      // Clamp to viewport edges
      const padding = 16;
      if (left < padding) left = padding;
      if (left + popoverWidth > window.innerWidth - padding) {
        left = window.innerWidth - popoverWidth - padding;
      }

      // Calculate Arrow Offset relative to the popover's left edge
      // The arrow needs to point to triggerCenter.
      // Arrow is naturally at 50% of popover. We need to offset it if popover shifted.
      // arrowLeft = triggerCenter - left (popover's x). 
      // We will apply this as a specific left style to the arrow.
      const arrowOffset = triggerCenter - left;

      // Calculate Vertical Position
      // Default: Top (which means we position it at rect.top and translate -100%)
      let top = rect.top - margin;
      let placement = 'top';

      // Check for top collision (if closer than ~150px to top of screen)
      if (rect.top < 150) {
        top = rect.bottom + margin;
        placement = 'bottom';
      }

      setPopoverState({ top, left, placement, arrowOffset });
    }
  }, [isOpen]);

  // Close on scroll (capture phase to catch any scrollable parent)
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => onToggle();
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [isOpen, onToggle]);

  const popover = (
    <div 
        className="fixed z-[9999] w-48 p-3 bg-[#1A1D21] border border-[#B08D57] rounded-md shadow-2xl animate-in zoom-in-95 fade-in duration-200"
        style={{ 
            top: popoverState.top, 
            left: popoverState.left,
            transform: popoverState.placement === 'top' ? 'translateY(-100%)' : 'translateY(0)'
        }}
        onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="absolute top-1 right-1 p-0.5 text-[#666] hover:text-[#E2E2E2] hover:bg-[#2A2E35] rounded-full transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
      
      <div className="text-[#B08D57] text-[10px] uppercase tracking-wider font-bold mb-1 pr-4">
        {label}
      </div>
      
      <p className="text-[#E2E2E2] text-sm italic font-serif leading-relaxed">
        "{info}"
      </p>

      {/* Dynamic Arrow */}
      <div 
        className={`absolute w-2 h-2 bg-[#1A1D21] border-[#B08D57] transform rotate-45 ${
            popoverState.placement === 'top' 
            ? 'bottom-[-5px] border-r border-b' 
            : 'top-[-5px] border-l border-t'
        }`}
        style={{
            left: popoverState.arrowOffset,
            transform: 'translateX(-50%) rotate(45deg)' // Center on the calculated offset
        }}
      />
    </div>
  );

  return (
    <>
      <span className="relative inline-block">
        <button
          ref={triggerRef}
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          style={{ animationDelay: randomDelay }}
          className={`
            text-xs font-medium transition-all duration-300 cursor-pointer
            ${isOpen 
              ? 'text-[#E0B945] font-bold shadow-none' 
              : 'text-[#888888] hover:text-[#E2E2E2] animate-text-shimmer'}
          `}
        >
          {label}
        </button>
        {!isLast && <span className="text-[#666666] mr-1.5">, </span>}
      </span>
      {isOpen && createPortal(popover, document.body)}
    </>
  );
};