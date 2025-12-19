import React from 'react';
import { Martini, ChevronDown, CornerDownRight } from 'lucide-react';
import { Cocktail, AppData } from '../types';

interface BarViewProps {
  hidden: boolean;
  cocktailId: string;
  setCocktailId: (id: string) => void;
  data: AppData;
}

export const BarView: React.FC<BarViewProps> = ({ hidden, cocktailId, setCocktailId, data }) => {
  const cocktail = data.cocktails.find(c => c.id === cocktailId);
  const specs = cocktail?.specs;

  if (hidden) return null;
  if (!cocktail) return <div className="p-8 text-center text-[#666]">Cocktail not found.</div>;

  return (
    <div className="flex flex-col h-full bg-transparent relative animate-in fade-in duration-300">
        {/* Toolbar Header for Bar Mode (Matching Service Mode Style) */}
        <div className="z-10 px-4 py-4 flex items-center justify-between border-b border-[#1A1D21]/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Martini className="w-4 h-4 text-[#B08D57]" />
            <select 
              value={cocktailId}
              onChange={(e) => setCocktailId(e.target.value)}
              className="bg-transparent text-[#E2E2E2] font-serif font-bold text-lg outline-none cursor-pointer hover:text-[#B08D57] transition-colors appearance-none pr-4"
            >
              {data.cocktails.map(c => (
                 <option key={c.id} value={c.id} className="bg-[#1A1D21]">{c.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#666] -ml-2 pointer-events-none" />
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#666] font-bold border border-[#2A2E35] px-2 py-1 rounded">
             Spec Sheet
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar no-scrollbar flex justify-center">
            <div className="w-full max-w-md bg-[#E2E2E2] text-[#0F1113] p-8 rounded-sm shadow-xl min-h-[500px] font-mono">
                {/* Header */}
                <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-tight">{cocktail.name}</h1>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#555] mt-1">Standard Build</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-bold uppercase">Glass</div>
                        <div className="text-sm">{specs?.glass || 'N/A'}</div>
                    </div>
                </div>

                {/* Ingredients */}
                <div className="mb-8">
                     <div className="text-xs font-bold uppercase border-b border-[#AAA] pb-1 mb-3 text-[#555]">Ingredients</div>
                     <table className="w-full text-sm">
                        <tbody>
                            {specs?.ingredients.map((ing, i) => (
                                <React.Fragment key={i}>
                                    <tr className="border-b border-[#DDD] last:border-0">
                                        <td className="py-2 font-bold w-20 align-top">{ing.amount}</td>
                                        <td className="py-2 align-top">{ing.name}</td>
                                    </tr>
                                    {/* Render Sub-ingredients (Batch breakdown) */}
                                    {ing.subIngredients && ing.subIngredients.length > 0 && (
                                        ing.subIngredients.map((sub, j) => (
                                            <tr key={`${i}-${j}`} className="text-[#666] text-xs">
                                                <td className="py-1 pl-4 flex justify-end pr-2"><CornerDownRight className="w-3 h-3" /></td>
                                                <td className="py-1">
                                                    <span className="font-bold mr-2">{sub.amount}</span> 
                                                    {sub.name}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </React.Fragment>
                            ))}
                            {!specs && <tr><td colSpan={2} className="py-2 text-[#888] italic">No specs available</td></tr>}
                        </tbody>
                     </table>
                </div>

                {/* Method & Garnish */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <div className="text-xs font-bold uppercase border-b border-[#AAA] pb-1 mb-2 text-[#555]">Method</div>
                        <p className="text-sm leading-relaxed">{specs?.method || 'N/A'}</p>
                    </div>
                    <div>
                        <div className="text-xs font-bold uppercase border-b border-[#AAA] pb-1 mb-2 text-[#555]">Garnish</div>
                        <p className="text-sm leading-relaxed">{specs?.garnish || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};