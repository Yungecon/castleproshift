
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Martini, 
  Sparkles,
  Droplet,
  Lightbulb,
  Share,
  ArrowRight
} from 'lucide-react';

import { Card } from './Card';
import { SectionHeader } from './SectionHeader';
import { LayerDrawer } from './LayerDrawer';
import { VisualContainer } from './VisualContainer';
import { BotanicalTextChip } from './BotanicalTextChip';
import { GEM_COLORS, VISUALS } from '../constants';
import { ActiveLayersState, Cocktail, LayerContentItem, DepthLayer, AppData, Product } from '../types';

interface ServiceViewProps {
  hidden: boolean;
  cocktailId: string;
  setCocktailId: (id: string) => void;
  data: AppData;
}

export const ServiceView: React.FC<ServiceViewProps> = ({ hidden, cocktailId, setCocktailId, data }) => {
  const [selectedConceptId, setSelectedConceptId] = useState<string>('');
  const [openBotanicalLabel, setOpenBotanicalLabel] = useState<string | null>(null);
  
  // Ensure we have a valid concept ID selected when cocktail changes
  useEffect(() => {
    const c = data.cocktails.find(item => item.id === cocktailId);
    if (c && c.conceptIds.length > 0) {
      setSelectedConceptId(c.conceptIds[0]);
    }
  }, [cocktailId, data.cocktails]);
  
  // Initialize layers: Essential layers default to TRUE, others FALSE
  const initializeLayers = (cId: string, currentData: AppData) => {
    const c = currentData.cocktails.find(item => item.id === cId);
    if (!c) return {};
    
    const state: ActiveLayersState = {};
    
    const add = (id: string, layers: DepthLayer[]) => {
      layers.forEach(l => {
        if (l.isEnabled !== false) {
           state[`${id}_${l.id}`] = l.depth === 'essential';
        }
      });
    };

    if (c.depthLayers) add(c.id, c.depthLayers);
    c.productIds.forEach(pid => {
        if (currentData.products[pid]) {
            add(pid, currentData.products[pid].depthLayers)
        }
    });
    c.conceptIds.forEach(cid => {
        if (currentData.concepts[cid]) {
            add(cid, currentData.concepts[cid].depthLayers)
        }
    });
    return state;
  };

  const [activeLayers, setActiveLayers] = useState<ActiveLayersState>(() => initializeLayers(cocktailId, data));

  useEffect(() => {
    setActiveLayers(initializeLayers(cocktailId, data));
  }, [cocktailId, data]);
  
  const cocktail = data.cocktails.find(c => c.id === cocktailId);

  const toggleLayer = (nodeId: string, layerId: string) => {
    const key = `${nodeId}_${layerId}`;
    setActiveLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenBotanicalLabel(null);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenBotanicalLabel]);

  const resolveDisplayProducts = (productIds: string[], allProducts: Record<string, Product>): Product[] => {
    const list: Product[] = [];
    productIds.forEach(pid => {
      const p = allProducts[pid];
      if (!p) return;
      
      if (p.role === 'Batch' && p.batchComponents && p.batchComponents.length > 0) {
        p.batchComponents.forEach(comp => {
          if (comp.productId && allProducts[comp.productId]) {
            list.push(allProducts[comp.productId]);
          }
        });
      } else {
        list.push(p);
      }
    });
    return Array.from(new Map(list.map(item => [item.id, item])).values());
  };

  if (hidden) return null;
  if (!cocktail) return <div className="p-8 text-center text-[#666]">No cocktails available. Please import a menu.</div>;

  const displayProducts = useMemo(
    () => resolveDisplayProducts(cocktail.productIds, data.products),
    [cocktail.productIds, data.products]
  );

  return (
    <div className="flex flex-col h-full bg-transparent relative transition-all duration-300">
        <div className="z-10 bg-[#0F1113]/95 backdrop-blur-md border-b border-[#1A1D21]">
          <div className="flex overflow-x-auto no-scrollbar py-3 px-4 gap-3 items-center">
            <Martini className="w-4 h-4 text-[#B08D57] shrink-0 mr-1" />
            {data.cocktails.map(c => (
               <button
                 key={c.id}
                 onClick={() => setCocktailId(c.id)}
                 className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all border ${
                   cocktailId === c.id 
                     ? 'bg-[#B08D57] text-[#0F1113] border-[#B08D57]' 
                     : 'bg-[#1A1D21] text-[#666] border-[#2A2E35] hover:border-[#B08D57]/50 hover:text-[#999]'
                 }`}
               >
                 {c.name}
               </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex justify-center p-4 md:p-8 custom-scrollbar relative z-0 no-scrollbar">
          <div className="w-full max-w-md pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Identity Header */}
              <div className="mb-8 text-center pt-4">
                <div className="inline-block px-3 py-1 mb-4 rounded-full border border-[#B08D57]/30 bg-[#B08D57]/10 text-[#B08D57] text-[10px] uppercase tracking-widest font-semibold">
                  {cocktail.contract.menuRole || "Featured"}
                </div>
                
                {cocktail.visualId && VISUALS[cocktail.visualId] && (
                  <div className="w-24 h-24 mx-auto mb-6">
                    {VISUALS[cocktail.visualId]}
                  </div>
                )}
                
                <h1 className="font-serif text-3xl md:text-4xl text-[#E2E2E2] mb-3 leading-tight">{cocktail.name}</h1>
                <p className="text-[#888] font-sans text-sm mb-6">{cocktail.headline}</p>
                <div className="h-[1px] w-12 bg-[#B08D57]/50 mx-auto"></div>
              </div>

              {/* NEW TOP: Selling Point */}
              <div className="mb-8">
                <SectionHeader icon={Share} title="The Hook" />
                <div className="p-6 rounded-lg bg-gradient-to-r from-[#1A1D21] to-[#22252B] border-l-2 border-[#B08D57] shadow-lg">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#666] block mb-2">If they like {cocktail.contract.ifTheyLikeX ? '...' : 'this style...'}</span>
                  <p className="font-serif text-lg text-[#E2E2E2] italic leading-relaxed">
                    "{cocktail.contract.ifTheyLikeX || cocktail.contract.proof || cocktail.contract.say}"
                  </p>
                </div>
              </div>

              {/* NEW TOP: Focus Concept */}
              {cocktail.conceptIds && cocktail.conceptIds.length > 0 && selectedConceptId && data.concepts[selectedConceptId] && (
              <div className="mb-8">
                 <SectionHeader icon={Lightbulb} title="Focus Concept" />
                 
                 <Card className="bg-[#B08D57]/5 border-[#B08D57]/20">
                   <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                      {cocktail.conceptIds.map(cid => {
                        const c = data.concepts[cid];
                        if (!c) return null;
                        const isSelected = selectedConceptId === cid;
                        return (
                          <button
                            key={cid}
                            onClick={() => setSelectedConceptId(cid)}
                            className={`px-3 py-1 rounded text-xs uppercase tracking-wider font-semibold transition-all ${isSelected ? 'bg-[#B08D57] text-[#0F1113]' : 'text-[#666] hover:text-[#B08D57] bg-[#1A1D21] border border-[#2A2E35]'}`}
                          >
                            {c.name}
                          </button>
                        )
                      })}
                   </div>

                   {(() => {
                     const c = data.concepts[selectedConceptId];
                     if (!c) return null;
                     return (
                       <div className="animate-in fade-in duration-300">
                         <div className="flex justify-between mb-2">
                           <div>
                              <h3 className="font-serif text-xl text-[#B08D57] mb-2">{c.name}</h3>
                              <p className="text-[#E2E2E2] text-sm leading-relaxed mb-4">{c.contract.anchor || "—"}</p>
                           </div>
                           {c.visualId && (
                             <VisualContainer visualId={c.visualId} className="ml-4 shrink-0 bg-[#0F1113]/80 w-16 h-16" />
                           )}
                         </div>
                         
                         <div className="flex items-start gap-2 text-xs text-[#999] mb-4">
                           <ArrowRight className="w-3 h-3 text-[#B08D57] mt-0.5" />
                           <span><strong className="text-[#CCCCCC]">Why here:</strong> {c.contract.why || "—"}</span>
                         </div>

                         {c.depthLayers && c.depthLayers.length > 0 && (
                            <div className="border-t border-[#B08D57]/20 pt-1">
                              {c.depthLayers
                                .filter(l => l.isEnabled !== false)
                                .map(l => (
                                <LayerDrawer
                                  key={l.id}
                                  title={l.title}
                                  depth={l.depth}
                                  isActive={!!activeLayers[`${c.id}_${l.id}`]}
                                  onToggle={() => toggleLayer(c.id, l.id)}
                                >
                                  <p className="text-[#AAA] text-xs leading-relaxed">{l.content as string}</p>
                                </LayerDrawer>
                              ))}
                            </div>
                         )}
                       </div>
                     );
                   })()}
                 </Card>
              </div>
              )}

              {/* Orientation Card (What it is / Say This) */}
              <div className="mb-8">
                <div className="bg-[#1A1D21]/50 p-4 rounded-lg border border-[#2A2E35] mb-6 text-left">
                  {cocktail.nameMeaning && (
                    <div className="mb-3">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#666] block mb-1">Naming Convention</span>
                      <p className="text-[#CCC] text-xs leading-relaxed opacity-80">{cocktail.nameMeaning}</p>
                    </div>
                  )}
                  <div className="mb-3">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#666] block mb-1">What it is</span>
                    <p className="text-[#E2E2E2] font-serif italic text-lg leading-snug">{cocktail.contract.anchor || "—"}</p>
                  </div>
                   <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#B08D57] block mb-1">Say This</span>
                    <p className="text-[#CCC] text-sm leading-relaxed">"{cocktail.contract.say || "—"}"</p>
                  </div>
                </div>
              </div>

              {/* The Build */}
              <div className="space-y-4 mb-12">
                <SectionHeader icon={Droplet} title="The Build" />
                
                {displayProducts.map((p, idx) => {
                  const gemStyle = GEM_COLORS[p.gem];
                  
                  return (
                    <Card key={p.id} className="animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-lg text-[#E2E2E2]">{p.name}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider ${gemStyle.bg} ${gemStyle.text} ${gemStyle.border}`}>
                          {p.role}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-[#888] text-sm leading-relaxed">
                            <span className="text-[#B08D57] font-medium text-xs uppercase mr-1">Why:</span>
                            {p.contract.why || "To be defined"}
                          </p>
                        </div>
                        <div className="bg-[#0F1113]/50 p-3 rounded border border-[#2A2E35]">
                          <p className="text-[#CCCCCC] italic text-base font-serif">"{p.contract.say || "Pending script..."}"</p>
                        </div>
                      </div>

                      {p.depthLayers && p.depthLayers.length > 0 && (
                        <div className="mt-4 pt-1 border-t border-[#2A2E35]">
                          {p.depthLayers
                            .filter(l => l.isEnabled !== false)
                            .map(l => (
                            <LayerDrawer
                              key={l.id}
                              title={l.title}
                              depth={l.depth}
                              isActive={!!activeLayers[`${p.id}_${l.id}`]}
                              onToggle={() => toggleLayer(p.id, l.id)}
                            >
                              <div className="flex flex-col justify-start items-start pt-1">
                                {Array.isArray(l.content) ? (
                                  <div className="flex flex-wrap items-baseline leading-relaxed">
                                    {(l.content as LayerContentItem[]).map((item, i) => (
                                      <BotanicalTextChip 
                                        key={i} 
                                        label={item.label} 
                                        info={item.info}
                                        isOpen={openBotanicalLabel === item.label}
                                        onToggle={() => setOpenBotanicalLabel(openBotanicalLabel === item.label ? null : item.label)}
                                        isLast={i === (l.content as LayerContentItem[]).length - 1}
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex justify-between items-start w-full">
                                    <p className="text-[#999] text-xs leading-relaxed pr-4">{l.content as string}</p>
                                    {l.visualId && <VisualContainer visualId={l.visualId} className="ml-3 shrink-0 w-12 h-12 p-2" />}
                                  </div>
                                )}
                              </div>
                            </LayerDrawer>
                          ))}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* Cocktail Depth Layers (Flavor Alchemy moved to bottom) */}
              {cocktail.depthLayers && cocktail.depthLayers.length > 0 && (
                <div className="mb-10 animate-in fade-in duration-500">
                   <SectionHeader icon={Sparkles} title="Flavor Alchemy" />
                   <div className="bg-[#1A1D21] border border-[#2A2E35] rounded-lg overflow-hidden">
                     {cocktail.depthLayers
                        .filter(l => l.isEnabled !== false)
                        .map(l => (
                       <div key={l.id} className="px-5">
                          <LayerDrawer 
                            title={l.title} 
                            depth={l.depth}
                            isActive={!!activeLayers[`${cocktail.id}_${l.id}`]} 
                            onToggle={() => toggleLayer(cocktail.id, l.id)}
                          >
                             <div className="p-3 rounded-lg border border-[#B08D57]/30 bg-[#B08D57]/5">
                                <p className="text-[#E2E2E2] text-base leading-relaxed italic font-serif">"{l.content as string}"</p>
                             </div>
                          </LayerDrawer>
                       </div>
                     ))}
                   </div>
                </div>
              )}

            </div>
        </div>
    </div>
  );
};
