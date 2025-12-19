import React from 'react';

export const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600&display=swap');
      .font-serif { font-family: 'Cormorant Garamond', serif; }
      .font-sans { font-family: 'Inter', sans-serif; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      
      /* Legibility boost for the thinner luxury font */
      .font-serif.italic {
        letter-spacing: 0.02em;
        font-weight: 400; 
      }

      @keyframes text-shimmer {
        0% { color: #888888; text-shadow: none; }
        50% { color: #E0B945; text-shadow: 0 0 8px rgba(224, 185, 69, 0.4); }
        100% { color: #888888; text-shadow: none; }
      }
      .animate-text-shimmer {
        animation: text-shimmer 4s infinite ease-in-out;
      }
    `}
  </style>
);