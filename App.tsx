
import React, { useState, useEffect } from 'react';
import { FontStyles } from './components/FontStyles';
import { ServiceView } from './components/ServiceView';
import { BarView } from './components/BarView';
import { ManagementView } from './components/ManagementView';
import { DATA } from './constants';
import { AppData, Product, Cocktail } from './types';

type AppMode = 'management' | 'service' | 'bar';

export default function ProShiftApp() {
  const [mode, setMode] = useState<AppMode>(() => {
    try {
      const stored = localStorage.getItem('proshift_mode');
      return (stored as AppMode) || 'service';
    } catch {
      return 'service';
    }
  });
  const [selectedCocktailId, setSelectedCocktailId] = useState<string>(() => {
    try {
      return localStorage.getItem('proshift_cocktail') || 'c_fiore_dinverno';
    } catch {
      return 'c_fiore_dinverno';
    }
  });
  
  // Lifted State: Initialize with constant data
  const [appData, setAppData] = useState<AppData>(DATA);

  useEffect(() => {
    try {
      localStorage.setItem('proshift_mode', mode);
    } catch (error) {
      console.warn('Failed to save mode to localStorage:', error);
    }
  }, [mode]);

  useEffect(() => {
    try {
      localStorage.setItem('proshift_cocktail', selectedCocktailId);
    } catch (error) {
      console.warn('Failed to save cocktail to localStorage:', error);
    }
  }, [selectedCocktailId]);

  // Handler to update a product
  const updateProduct = (updatedProduct: Product) => {
    setAppData(prev => ({
      ...prev,
      products: {
        ...prev.products,
        [updatedProduct.id]: updatedProduct
      }
    }));
  };

  const updateCocktail = (updatedCocktail: Cocktail) => {
    setAppData(prev => ({
        ...prev,
        cocktails: prev.cocktails.map(c => 
            c.id === updatedCocktail.id ? updatedCocktail : c
        )
    }));
  };

  return (
    <div className="flex h-screen w-full bg-[#0F1113] font-sans text-[#E2E2E2] overflow-hidden relative flex-col">
      <FontStyles />
      
      {/* Background Texture (Global) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Global Mode Switcher */}
      <div className="z-50 w-full flex justify-center pt-4 pb-0 bg-[#0F1113] relative">
          <div className="flex bg-[#1A1D21] p-1 rounded-lg border border-[#2A2E35] shadow-lg">
            {['management', 'service', 'bar'].map((m) => (
                <button
                    key={m}
                    onClick={() => setMode(m as AppMode)}
                    className={`px-4 py-1.5 rounded-md text-xs uppercase tracking-widest font-bold transition-all ${
                        mode === m 
                        ? 'bg-[#B08D57] text-[#0F1113] shadow-sm' 
                        : 'text-[#666] hover:text-[#999]'
                    }`}
                >
                    {m}
                </button>
            ))}
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative z-10">
          <ServiceView 
            hidden={mode !== 'service'} 
            cocktailId={selectedCocktailId} 
            setCocktailId={setSelectedCocktailId}
            data={appData}
          />
          
          <BarView 
             hidden={mode !== 'bar'} 
             cocktailId={selectedCocktailId} 
             setCocktailId={setSelectedCocktailId}
             data={appData}
          />

          <ManagementView 
             hidden={mode !== 'management'}
             data={appData}
             onUpdateProduct={updateProduct}
             onUpdateCocktail={updateCocktail}
          />
      </div>
    </div>
  );
}
