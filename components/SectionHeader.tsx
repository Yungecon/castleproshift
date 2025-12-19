import React, { ElementType } from 'react';

interface SectionHeaderProps {
  icon: ElementType;
  title: string;
}

export const SectionHeader = ({ icon: Icon, title }: SectionHeaderProps) => (
  <div className="flex items-center gap-2 mb-4 text-[#888888] uppercase tracking-widest text-xs font-semibold">
    <Icon className="w-3 h-3" />
    <span>{title}</span>
  </div>
);