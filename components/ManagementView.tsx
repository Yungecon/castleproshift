
import React, { useState, useEffect, useRef } from 'react';
import { Database, Plus, Sparkles, Lock, FileText, Search, ShieldCheck, Loader2, ArrowLeft, Check, ChevronRight, Upload, X, ChevronDown, Layers, Trash2, CornerDownRight, Martini, GlassWater } from 'lucide-react';
import { FIELD_PROMPTS, AI_PERSONA, API_CONFIG, GENERATE_PROMPT_BY_ROLE, GENERATE_COCKTAIL_PROMPT } from '../prompts';
import { AppData, Product, DepthLayer, LayerContentItem, Cocktail, CocktailSpecIngredient, BatchComponent, Concept, AIProductResponse, AICocktailResponse, ExtractedCocktailResponse } from '../types';
import { GoogleGenAI } from "@google/genai";
import { GEM_COLORS } from '../constants';
import { BotanicalTextChip } from './BotanicalTextChip';
import { VisualContainer } from './VisualContainer';
import { toTitleCase } from '../utils';

interface ManagementViewProps {
  hidden: boolean;
  data: AppData;
  onUpdateProduct: (product: Product) => void;
  onUpdateCocktail: (cocktail: Cocktail) => void;
}

type WizardStep = 'upload' | 'review_names' | 'review_specs' | 'match_products' | 'enhance_cocktails';

interface ExtractedIngredient {
  name: string;
  amount: string;
  role_guess: string; 
  subIngredients?: ExtractedIngredient[]; 
}

interface ExtractedCocktail {
  id: string; 
  name: string;
  specs: {
    glass: string;
    method: string;
    garnish: string;
    ingredients: ExtractedIngredient[];
  }
}

interface ProductMatch {
  rawName: string; 
  matchedProductId: string | 'new' | 'skip' | 'batch_container';
  role: string; 
  draftProducer: string; 
  draftProductName: string;
  subMatches?: ProductMatch[];
}

export const ManagementView: React.FC<ManagementViewProps> = ({ hidden, data, onUpdateProduct, onUpdateCocktail }) => {
  const [tab, setTab] = useState<'upload' | 'products' | 'cocktails' | 'concepts' | 'prompts'>('products');
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [openBotanicalLabel, setOpenBotanicalLabel] = useState<string | null>(null);
  
  // -- UPLOAD WIZARD STATE --
  const [wizardStep, setWizardStep] = useState<WizardStep>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedCocktails, setExtractedCocktails] = useState<ExtractedCocktail[]>([]);
  const [productMatches, setProductMatches] = useState<Record<string, ProductMatch[]>>({}); 
  const [importedCocktailIds, setImportedCocktailIds] = useState<string[]>([]); 
  const [enhancementProgress, setEnhancementProgress] = useState<Record<string, 'pending' | 'processing' | 'done'>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenBotanicalLabel(null);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenBotanicalLabel]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
         const result = reader.result as string;
         const base64 = result.split(',')[1];
         resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size validation (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      alert('File too large. Maximum size is 10MB.');
      return;
    }

    // File type validation
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a PDF file.');
      return;
    }

    setIsProcessing(true);
    try {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
        if (!apiKey) {
          throw new Error('API key not configured. Please set GEMINI_API_KEY in your environment variables.');
        }

        const base64Data = await fileToBase64(file);
        const ai = new GoogleGenAI({ apiKey });
        
        const prompt = `
            Analyze this document (Cocktail Menu, Recipe Sheet, or Inventory List).
            Extract every cocktail or house-made batch recipe found.
            
            Return JSON: 
            { 
              cocktails: [
                { 
                  name: "Drink Name", 
                  glass: "string", 
                  method: "string", 
                  garnish: "string", 
                  ingredients: [
                    { 
                      name: "Ingredient Name", 
                      amount: "string", 
                      role: "Base Spirit | Modifier | Citrus | Sweetener | Batch | Garnish",
                      subIngredients: [{ name: "string", amount: "string" }] 
                    }
                  ] 
                }
              ] 
            }
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [{ inlineData: { mimeType: file.type, data: base64Data } }, { text: prompt }],
            config: { responseMimeType: "application/json" }
        });

        const json: ExtractedCocktailResponse = JSON.parse(response.text || "{}");
        const list = json.cocktails || [];
        
        const mapped: ExtractedCocktail[] = list.map((c, idx: number) => ({
            id: `temp_${Date.now()}_${idx}`,
            name: toTitleCase(c.name),
            specs: {
                glass: toTitleCase(c.glass || "Unknown"),
                method: toTitleCase(c.method || "Build"),
                garnish: toTitleCase(c.garnish || "None"),
                ingredients: (c.ingredients || []).map((ing) => ({
                    name: toTitleCase(ing.name),
                    amount: ing.amount || "",
                    role_guess: ing.role || (ing.subIngredients?.length ? "Batch" : "Modifier"),
                    subIngredients: (ing.subIngredients || []).map((sub) => ({
                        name: toTitleCase(sub.name),
                        amount: sub.amount || "",
                        role_guess: "Modifier"
                    }))
                }))
            }
        }));

        if (mapped.length === 0) {
          throw new Error('No cocktails found in the document. Please ensure the PDF contains cocktail recipes.');
        }

        setExtractedCocktails(mapped);
        setWizardStep('review_names');
    } catch (err) {
        console.error('File upload error:', err);
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Extraction failed. Please check the PDF format and try again.';
        alert(`Error: ${errorMessage}`);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleNamesApproved = () => setWizardStep('review_specs');

  const slugifyId = (str: string) =>
    (str || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');

  const makeUniqueCocktailId = (name: string, usedIds: Set<string>) => {
    const base = `c_${slugifyId(name) || 'imported'}`;
    if (!usedIds.has(base)) return base;
    let n = 2;
    while (usedIds.has(`${base}_${n}`)) n += 1;
    return `${base}_${n}`;
  };

  const createMatchObject = (ingName: string, roleGuess: string): ProductMatch => {
    const potential = (Object.values(data.products) as Product[]).find(p => 
        p.name.toLowerCase().includes(ingName.toLowerCase()) || 
        ingName.toLowerCase().includes(p.name.toLowerCase())
    );
    return {
        rawName: ingName,
        matchedProductId: potential ? potential.id : 'new',
        role: roleGuess,
        draftProducer: "",
        draftProductName: toTitleCase(ingName),
    };
  };

  const handleSpecsApproved = () => {
    const initialMatches: Record<string, ProductMatch[]> = {};
    extractedCocktails.forEach(c => {
        initialMatches[c.id] = c.specs.ingredients.map(ing => {
            const match = createMatchObject(ing.name, ing.role_guess);
            if (ing.role_guess === 'Batch' && ing.subIngredients?.length) {
                match.matchedProductId = 'batch_container';
                match.subMatches = ing.subIngredients.map(sub => createMatchObject(sub.name, sub.role_guess));
            }
            return match;
        });
    });
    setProductMatches(initialMatches);
    setWizardStep('match_products');
  };

  const createEntities = () => {
    const createdCocktailIds: string[] = [];
    const usedCocktailIds = new Set<string>(data.cocktails.map(c => c.id));
    extractedCocktails.forEach(c => {
        const pIds: string[] = [];
        const matches = productMatches[c.id];
        if (!matches) return;

        const processMatch = (m: ProductMatch): string | null => {
            if (m.matchedProductId === 'skip') return null;
            if (m.matchedProductId !== 'new' && m.matchedProductId !== 'batch_container') return m.matchedProductId;

            if (m.matchedProductId === 'new') {
                const producer = toTitleCase(m.draftProducer);
                const pName = toTitleCase(m.draftProductName || m.rawName);
                const fullName = producer ? `${producer} ${pName}` : pName;
                
                // DATA GUARDRAIL: Check one last time if this exact full name already exists
                const existing = (Object.values(data.products) as Product[]).find(p => p.name.toLowerCase() === fullName.toLowerCase());
                if (existing) return existing.id;

                const newId = `p_${fullName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;
                onUpdateProduct({
                    id: newId,
                    name: fullName,
                    producer: producer,
                    role: m.role,
                    gem: 'emerald',
                    contract: { anchor: "", why: "", say: "" },
                    depthLayers: []
                });
                return newId;
            }

            if (m.matchedProductId === 'batch_container' && m.subMatches) {
                 const batchId = `p_${m.rawName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;
                 const batchComponents: BatchComponent[] = [];
                 m.subMatches.forEach(sub => {
                     const subId = processMatch(sub);
                     if (subId) {
                        const subName = sub.matchedProductId === 'new' 
                            ? (sub.draftProducer ? `${sub.draftProducer} ${sub.draftProductName}` : sub.draftProductName)
                            : (data.products[sub.matchedProductId]?.name || sub.rawName);
                        batchComponents.push({ name: subName, productId: subId });
                     }
                 });
                 onUpdateProduct({
                    id: batchId,
                    name: toTitleCase(m.rawName),
                    role: 'Batch',
                    gem: 'emerald',
                    contract: { anchor: "", why: "Batch Container", say: "" },
                    depthLayers: [],
                    batchComponents: batchComponents
                 });
                 return batchId;
            }
            return null;
        };

        matches.forEach(m => {
            const res = processMatch(m);
            if (res) pIds.push(res);
        });

        const cocktailId = makeUniqueCocktailId(c.name, usedCocktailIds);
        if (usedCocktailIds.has(`c_${slugifyId(c.name) || 'imported'}`) && cocktailId !== `c_${slugifyId(c.name) || 'imported'}`) {
          console.warn(`[Import] Cocktail id collision for "${c.name}". Using "${cocktailId}" to avoid overwriting an existing cocktail.`);
        }
        usedCocktailIds.add(cocktailId);
        createdCocktailIds.push(cocktailId);
        onUpdateCocktail({
            id: cocktailId,
            type: 'cocktail',
            name: c.name,
            headline: "Imported Content",
            contract: { anchor: "", say: "", why: "", whyExists: "", menuRole: "Imported", ifTheyLikeX: "" },
            productIds: pIds,
            conceptIds: [],
            depthLayers: [],
            specs: {
                glass: c.specs.glass,
                method: c.specs.method,
                garnish: c.specs.garnish,
                ingredients: c.specs.ingredients.map(ing => ({
                    name: toTitleCase(ing.name),
                    amount: ing.amount,
                    subIngredients: ing.subIngredients?.map(sub => ({ name: toTitleCase(sub.name), amount: sub.amount }))
                }))
            }
        });
    });
    return createdCocktailIds;
  };

  const finalizeImport = () => {
    setIsProcessing(true);
    const createdIds = createEntities();
    const progress: Record<string, 'pending' | 'processing' | 'done'> = {};
    createdIds.forEach(id => progress[id] = 'pending');
    setEnhancementProgress(progress);
    setImportedCocktailIds(createdIds);
    setWizardStep('enhance_cocktails');
    setIsProcessing(false);
  };

  const updateIngredient = (cIdx: number, iIdx: number, field: string, value: string) => {
    const next = [...extractedCocktails];
    if (field === 'name') value = toTitleCase(value);
    const ingredient = next[cIdx].specs.ingredients[iIdx];
    if (field === 'amount') ingredient.amount = value;
    else if (field === 'name') ingredient.name = value;
    else if (field === 'role_guess') ingredient.role_guess = value;
    setExtractedCocktails(next);
  };

  const addSubIngredient = (cocktailIndex: number, ingredientIndex: number) => {
    const next = [...extractedCocktails];
    const ing = next[cocktailIndex].specs.ingredients[ingredientIndex];
    if (!ing.subIngredients) ing.subIngredients = [];
    ing.subIngredients.push({ name: "", amount: "", role_guess: "Modifier" });
    setExtractedCocktails(next);
  };

  const updateSubIngredient = (cIdx: number, iIdx: number, sIdx: number, field: string, value: string) => {
      const next = [...extractedCocktails];
      const sub = next[cIdx].specs.ingredients[iIdx].subIngredients![sIdx];
      if (field === 'name') {
        sub.name = toTitleCase(value);
      } else if (field === 'amount') {
        sub.amount = value;
      } else if (field === 'role_guess') {
        sub.role_guess = value;
      }
      setExtractedCocktails(next);
  };

  const generateProductData = async (product: Product): Promise<Product | null> => {
    try {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
        if (!apiKey) {
          throw new Error('API key not configured. Please set GEMINI_API_KEY in your environment variables.');
        }

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
             model: API_CONFIG.model,
             contents: GENERATE_PROMPT_BY_ROLE(product.name, product.role),
             config: { responseMimeType: "application/json", temperature: API_CONFIG.temperature, tools: API_CONFIG.tools }
        });
        
        if (!response.text) {
          throw new Error('Empty response from AI service.');
        }

        const gen: AIProductResponse = JSON.parse(response.text);
        const layers = gen.layers || {};
        
        // Ensure standard IDs: l_flavor, l_terroir, l_distillery, l_history
        const newLayers: DepthLayer[] = Object.entries(layers).map(([key, content]) => ({
            id: `l_${key}`,
            title: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            depth: (['flavor', 'flavor_aroma', 'botanicals'].includes(key)) ? 'essential' : 'useful',
            content: content as any,
            isEnabled: true
        }));
        return { ...product, contract: { ...product.contract, ...gen.contract }, depthLayers: newLayers };
    } catch (e) {
        console.error('Error generating product data:', e);
        const errorMessage = e instanceof Error ? e.message : 'Failed to generate product data.';
        alert(`Error generating data for ${product.name}: ${errorMessage}`);
        return null;
    }
  };

  const handleGenerateProduct = async (product: Product) => {
    setGeneratingId(product.id);
    const updated = await generateProductData(product);
    if (updated) {
        onUpdateProduct(updated);
    }
    setGeneratingId(null);
  };

  const handleEnhanceCocktailFull = async (cocktailId: string) => {
    setEnhancementProgress(prev => ({ ...prev, [cocktailId]: 'processing' }));
    try {
        const cocktail = data.cocktails.find(c => c.id === cocktailId);
        if (!cocktail) {
          throw new Error('Cocktail not found.');
        }

        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
        if (!apiKey) {
          throw new Error('API key not configured. Please set GEMINI_API_KEY in your environment variables.');
        }

        const ai = new GoogleGenAI({ apiKey });
        const specsStr = cocktail.specs.ingredients.map(i => `${i.amount} ${i.name}`).join(', ');
        const response = await ai.models.generateContent({
             model: API_CONFIG.model,
             contents: GENERATE_COCKTAIL_PROMPT(cocktail.name, specsStr),
             config: { responseMimeType: "application/json", temperature: API_CONFIG.temperature }
        });

        if (!response.text) {
          throw new Error('Empty response from AI service.');
        }

        const gen: AICocktailResponse = JSON.parse(response.text);
        const updatedCocktail = {
            ...cocktail,
            contract: { ...cocktail.contract, ...gen.contract },
            depthLayers: Object.entries(gen.depthLayers || {}).map(([key, val]) => ({
                id: `l_${key}`,
                title: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                depth: 'useful',
                content: val as string,
                isEnabled: true
            }))
        };
        onUpdateCocktail(updatedCocktail);

        for (const pid of cocktail.productIds) {
            const product = data.products[pid];
            if (product && !product.contract.anchor && product.role !== 'Batch') {
                const updatedProd = await generateProductData(product);
                if (updatedProd) onUpdateProduct(updatedProd);
            }
        }
        setEnhancementProgress(prev => ({ ...prev, [cocktailId]: 'done' }));
    } catch (e) {
        console.error('Error enhancing cocktail:', e);
        const errorMessage = e instanceof Error ? e.message : 'Failed to enhance cocktail.';
        alert(`Error enhancing ${data.cocktails.find(c => c.id === cocktailId)?.name || 'cocktail'}: ${errorMessage}`);
        setEnhancementProgress(prev => ({ ...prev, [cocktailId]: 'pending' }));
    }
  };

  const handleToggleLayer = (product: Product, layerId: string) => {
     const updatedLayers = product.depthLayers.map(l => l.id === layerId ? { ...l, isEnabled: !l.isEnabled } : l);
     onUpdateProduct({ ...product, depthLayers: updatedLayers });
  };

  const renderMatchRow = (match: ProductMatch, cocktailId: string, idx: number) => {
    const isMatched = match.matchedProductId !== 'new' && match.matchedProductId !== 'skip' && match.matchedProductId !== 'batch_container';
    const existingProduct = isMatched ? data.products[match.matchedProductId] : null;
    const hasHighFidelityData = existingProduct && existingProduct.depthLayers.length > 0;

    return (
      <div key={`${cocktailId}-${idx}`} className="bg-[#0F1113] border border-[#333] rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-xs text-[#666] uppercase font-bold">{match.rawName}</span>
            {hasHighFidelityData && (
                <span className="text-[9px] text-[#2E9F85] flex items-center gap-1 mt-0.5"><ShieldCheck className="w-2.5 h-2.5" /> High Fidelity Match Found</span>
            )}
          </div>
          <select 
            value={match.matchedProductId} 
            onChange={(e) => {
              const next = { ...productMatches };
              next[cocktailId][idx].matchedProductId = e.target.value;
              setProductMatches(next);
            }}
            className={`bg-[#1A1D21] text-xs border rounded px-2 py-1 transition-colors ${hasHighFidelityData ? 'border-[#2E9F85] text-[#2E9F85]' : 'border-[#333] text-[#999]'}`}
          >
            <option value="new">Add as New (Draft)</option>
            <option value="skip">Skip</option>
            <option value="batch_container">Create as Batch</option>
            <optgroup label="System Products">
              {(Object.values(data.products) as Product[]).map(p => (
                <option key={p.id} value={p.id}>{p.name} {p.depthLayers.length > 0 ? '✓' : ''}</option>
              ))}
            </optgroup>
          </select>
        </div>
        
        {match.matchedProductId === 'new' && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input 
              placeholder="Producer" 
              value={match.draftProducer}
              onChange={(e) => {
                const next = { ...productMatches };
                next[cocktailId][idx].draftProducer = e.target.value;
                setProductMatches(next);
              }}
              className="bg-[#0F1113] border border-[#333] rounded px-2 py-1 text-xs"
            />
            <input 
              placeholder="Product Name" 
              value={match.draftProductName}
              onChange={(e) => {
                const next = { ...productMatches };
                next[cocktailId][idx].draftProductName = e.target.value;
                setProductMatches(next);
              }}
              className="bg-[#0F1113] border border-[#333] rounded px-2 py-1 text-xs"
            />
          </div>
        )}

        {match.matchedProductId === 'batch_container' && match.subMatches && (
            <div className="mt-2 pl-4 border-l border-[#333] space-y-2">
                <p className="text-[10px] uppercase text-[#666] font-bold">Batch Components:</p>
                {match.subMatches.map((sub, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-[#888]">{sub.rawName}</span>
                        <select 
                            value={sub.matchedProductId}
                            onChange={(e) => {
                                const next = { ...productMatches };
                                next[cocktailId][idx].subMatches![sIdx].matchedProductId = e.target.value;
                                setProductMatches(next);
                            }}
                            className="bg-[#1A1D21] text-[#999] text-[10px] border border-[#333] rounded px-1 py-0.5"
                        >
                            <option value="new">New</option>
                            <option value="skip">Skip</option>
                            {(Object.values(data.products) as Product[]).map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        )}
      </div>
    );
  };

  if (hidden) return null;

  if (editingProductId) {
      const product = data.products[editingProductId];
      const gemStyle = GEM_COLORS[product.gem];
      return (
          <div className="flex flex-col h-full bg-[#1A1D21] animate-in slide-in-from-right duration-300">
             <div className="p-4 border-b border-[#2A2E35] flex items-center gap-4 bg-[#0F1113]">
                 <button onClick={() => setEditingProductId(null)} className="p-2 hover:bg-[#2A2E35] rounded-full"><ArrowLeft className="w-5 h-5 text-[#E2E2E2]" /></button>
                 <div><span className="text-[10px] text-[#666] uppercase tracking-widest font-bold">Review Product</span><h2 className="text-[#E2E2E2] font-serif text-xl">{product.name}</h2></div>
                 <button onClick={() => handleGenerateProduct(product)} disabled={generatingId === product.id} className="ml-auto flex items-center gap-2 text-[10px] bg-[#1A1D21] border border-[#333] px-3 py-1.5 rounded text-[#B08D57] uppercase hover:bg-[#2A2E35] disabled:opacity-50">
                    {generatingId === product.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} Re-Enhance
                 </button>
             </div>
             <div className="flex-1 overflow-y-auto p-8 flex justify-center custom-scrollbar">
                 <div className="w-full max-w-2xl space-y-8">
                     <div className="bg-[#1A1D21] rounded-lg p-6 border border-[#2A2E35] shadow-lg relative">
                        <div className="absolute top-0 left-0 w-[3px] h-full bg-[#B08D57]" />
                        <div className="flex justify-between items-start mb-4">
                             <div><h1 className="text-3xl font-serif text-[#E2E2E2]">{product.name}</h1>{product.producer && <p className="text-[#666] text-xs font-bold uppercase">{product.producer}</p>}</div>
                             <span className={`px-3 py-1 rounded text-[10px] uppercase font-bold border ${gemStyle.bg} ${gemStyle.text} ${gemStyle.border}`}>{product.role}</span>
                        </div>
                        <div className="mb-4"><span className="text-[#666] font-bold text-[10px] uppercase block mb-1">What it is</span><p className="text-[#E2E2E2] font-serif italic text-lg">{product.contract.anchor || "—"}</p></div>
                        <div className="mb-4"><span className="text-[#B08D57] font-bold text-xs uppercase mr-2">WHY:</span><span className="text-[#999] text-sm">{product.contract.why || "—"}</span></div>
                        <div className="p-4 border border-[#2A2E35] rounded bg-[#0F1113]/50"><span className="text-[9px] uppercase font-bold text-[#666] block mb-2">Guest Script</span><p className="font-serif italic text-[#E2E2E2] text-lg">"{product.contract.say || "—"}"</p></div>
                     </div>
                     <div className="space-y-4">
                         {product.depthLayers.map((layer) => (
                             <div key={layer.id} className="bg-[#1A1D21] border border-[#2A2E35] rounded-lg p-4">
                                 <div className="flex items-center justify-between mb-3">
                                     <div className="flex items-center gap-3"><span className="text-[#B08D57] font-bold text-xs uppercase">{layer.title}</span><span className={`text-[9px] uppercase px-1.5 py-0.5 rounded ${layer.depth === 'useful' ? 'bg-[#B08D57]/20 text-[#B08D57]' : 'bg-[#2A2E35] text-[#666]'}`}>{layer.depth}</span></div>
                                     <button onClick={() => handleToggleLayer(product, layer.id)} className={`w-10 h-5 rounded-full p-0.5 transition-colors ${layer.isEnabled !== false ? 'bg-[#E0B945]' : 'bg-[#2A2E35]'}`}><div className={`w-4 h-4 rounded-full bg-[#0F1113] transform transition-transform ${layer.isEnabled !== false ? 'translate-x-5' : 'translate-x-0'}`} /></button>
                                 </div>
                                 <div className={layer.isEnabled === false ? 'opacity-30' : 'opacity-100'}>
                                     {Array.isArray(layer.content) ? (
                                         <div className="flex flex-wrap items-baseline leading-relaxed">
                                             {(layer.content as LayerContentItem[]).map((item, idx, arr) => (
                                                 <BotanicalTextChip key={idx} label={item.label} info={item.info} isOpen={openBotanicalLabel === item.label} onToggle={() => setOpenBotanicalLabel(openBotanicalLabel === item.label ? null : item.label)} isLast={idx === arr.length - 1} />
                                             ))}
                                         </div>
                                     ) : (
                                         <div className="flex justify-between items-start gap-4"><p className="text-[#999] text-sm leading-relaxed flex-1">{layer.content as string}</p>{layer.visualId && <VisualContainer visualId={layer.visualId} className="w-16 h-16 p-2 bg-[#0F1113]" />}</div>
                                     )}
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-transparent relative animate-in fade-in duration-300">
        <div className="z-10 px-4 py-4 border-b border-[#1A1D21]/50 backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-4"><Database className="w-4 h-4 text-[#B08D57]" /><span className="font-serif text-lg font-bold text-[#E2E2E2]">Management</span></div>
             <div className="flex gap-4 border-b border-[#2A2E35] overflow-x-auto no-scrollbar">
                {['upload', 'products', 'cocktails', 'concepts', 'prompts'].map((t) => (
                    <button key={t} onClick={() => setTab(t as any)} className={`pb-2 text-xs uppercase font-semibold transition-colors whitespace-nowrap ${tab === t ? 'text-[#B08D57] border-b-2 border-[#B08D57]' : 'text-[#666] hover:text-[#999]'}`}>
                        {t === 'upload' ? <span className="flex items-center gap-1"><Upload className="w-3 h-3" /> Import</span> : 
                         t === 'prompts' ? <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Prompts</span> : t}
                    </button>
                ))}
             </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar no-scrollbar">
            <div className="max-w-4xl mx-auto">
                {tab === 'upload' && (
                    <div className="max-w-xl mx-auto">
                        <h2 className="text-[#E2E2E2] font-serif text-2xl mb-2">Inventory or Menu Import</h2>
                        <p className="text-[#888] text-sm mb-6">Upload your cocktail menu. We'll extract items and detect batch recipes.</p>
                        {wizardStep === 'upload' && (
                            <div className="border-2 border-dashed border-[#333] rounded-xl p-10 text-center hover:border-[#B08D57]/50 transition-colors">
                                <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" id="pdf-upload" />
                                <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
                                    <div className="w-16 h-16 bg-[#1A1D21] rounded-full flex items-center justify-center mb-4">{isProcessing ? <Loader2 className="w-6 h-6 animate-spin text-[#B08D57]" /> : <Upload className="w-6 h-6 text-[#B08D57]" />}</div>
                                    <span className="text-[#E2E2E2] font-bold text-sm">Click to Upload PDF</span>
                                </label>
                            </div>
                        )}
                        {wizardStep === 'review_names' && (
                            <div className="space-y-4">
                                {extractedCocktails.map((c, i) => (
                                    <div key={c.id} className="bg-[#1A1D21] p-3 rounded border border-[#2A2E35] flex items-center gap-3">
                                        <input value={c.name} onChange={(e) => { const next = [...extractedCocktails]; next[i].name = toTitleCase(e.target.value); setExtractedCocktails(next); }} className="bg-transparent text-[#E2E2E2] font-serif text-lg outline-none w-full border-b border-transparent focus:border-[#B08D57]" />
                                        <button onClick={() => setExtractedCocktails(prev => prev.filter(it => it.id !== c.id))} className="text-[#666] hover:text-red-500"><X className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                <button onClick={handleNamesApproved} className="w-full py-3 bg-[#B08D57] text-[#0F1113] font-bold uppercase rounded mt-4">Review Specs</button>
                            </div>
                        )}
                        {wizardStep === 'review_specs' && (
                             <div className="space-y-6">
                                {extractedCocktails.map((c, i) => (
                                    <div key={c.id} className="bg-[#1A1D21] p-4 rounded border border-[#2A2E35]">
                                        <div className="text-[#E2E2E2] font-serif text-lg mb-4 border-b border-[#2A2E35] pb-2">{c.name}</div>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div><label className="text-[10px] uppercase text-[#666] font-bold block mb-1">Glass</label><input value={c.specs.glass} onChange={(e) => { const next = [...extractedCocktails]; next[i].specs.glass = toTitleCase(e.target.value); setExtractedCocktails(next); }} className="w-full bg-[#0F1113] border border-[#333] rounded px-2 py-1.5 text-sm" /></div>
                                            <div><label className="text-[10px] uppercase text-[#666] font-bold block mb-1">Garnish</label><input value={c.specs.garnish} onChange={(e) => { const next = [...extractedCocktails]; next[i].specs.garnish = toTitleCase(e.target.value); setExtractedCocktails(next); }} className="w-full bg-[#0F1113] border border-[#333] rounded px-2 py-1.5 text-sm" /></div>
                                        </div>
                                        <div className="space-y-3">
                                            {c.specs.ingredients.map((ing, ingIdx) => (
                                                <div key={ingIdx} className="bg-[#0F1113] border border-[#333] rounded p-3">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <input value={ing.amount} onChange={(e) => updateIngredient(i, ingIdx, 'amount', e.target.value)} className="w-16 bg-transparent border-b border-[#333] text-[#E2E2E2] text-sm text-center" />
                                                        <input value={ing.name} onChange={(e) => updateIngredient(i, ingIdx, 'name', e.target.value)} className="flex-1 bg-transparent border-b border-[#333] text-[#E2E2E2] text-sm" />
                                                        <select value={ing.role_guess} onChange={(e) => updateIngredient(i, ingIdx, 'role_guess', e.target.value)} className="bg-[#1A1D21] text-[#999] text-xs border border-[#333] rounded px-1 py-1">
                                                            <option value="Base Spirit">Spirit</option><option value="Modifier">Modifier</option><option value="Citrus">Citrus</option><option value="Sweetener">Syrup</option><option value="Batch">Batch</option><option value="Garnish">Garnish</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <button onClick={handleSpecsApproved} className="w-full py-3 bg-[#B08D57] text-[#0F1113] font-bold uppercase rounded mt-4">Confirm & Match</button>
                             </div>
                        )}
                        {wizardStep === 'match_products' && (
                            <div className="space-y-6">
                                <div className="p-4 bg-[#1A1D21] border border-[#B08D57]/30 rounded-lg">
                                    <p className="text-xs text-[#B08D57] flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> <strong>TIP:</strong> Match to products with a green shield for maximum educational context.</p>
                                </div>
                                {extractedCocktails.map(c => (
                                    <div key={c.id} className="bg-[#1A1D21] border border-[#2A2E35] rounded-lg p-4">
                                        <h3 className="text-[#E2E2E2] font-serif text-xl mb-4 border-b border-[#2A2E35]">{c.name}</h3>
                                        <div className="space-y-3">
                                            {productMatches[c.id]?.map((match, idx) => renderMatchRow(match, c.id, idx))}
                                        </div>
                                    </div>
                                ))}
                                <button onClick={finalizeImport} disabled={isProcessing} className="w-full py-3 bg-[#B08D57] text-[#0F1113] font-bold uppercase rounded mt-4">Review & Enhance</button>
                            </div>
                        )}
                        {wizardStep === 'enhance_cocktails' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <h3 className="text-[#E2E2E2] font-serif text-xl">Enhance Imported Content</h3>
                                <div className="space-y-3">
                                    {importedCocktailIds.map(cId => {
                                        const cocktail = data.cocktails.find(c => c.id === cId);
                                        const status = enhancementProgress[cId];
                                        if (!cocktail) return null;
                                        return (
                                            <div key={cId} className="bg-[#1A1D21] border border-[#2A2E35] rounded-lg p-4 flex items-center justify-between">
                                                <div><h4 className="text-[#E2E2E2] font-serif text-lg">{cocktail.name}</h4><p className="text-[#666] text-xs">{status === 'done' ? 'Enhanced' : status === 'processing' ? 'Processing...' : 'Ready'}</p></div>
                                                {status === 'done' ? <Check className="text-[#2E9F85]" /> : status === 'processing' ? <Loader2 className="animate-spin text-[#B08D57]" /> : <button onClick={() => handleEnhanceCocktailFull(cId)} className="px-4 py-1.5 bg-[#B08D57] text-[#0F1113] font-bold text-xs uppercase rounded">Enhance</button>}
                                            </div>
                                        );
                                    })}
                                </div>
                                <button onClick={() => { setWizardStep('upload'); setTab('cocktails'); }} className="w-full py-3 border border-[#333] text-[#666] font-bold uppercase rounded mt-4">Go to Dashboard</button>
                            </div>
                        )}
                    </div>
                )}

                {tab === 'products' && (
                    <div className="space-y-3">
                        {(Object.values(data.products) as Product[]).filter(p => p.role !== 'Batch').map(p => {
                            const hasContent = p.depthLayers.length > 0;
                            return (
                                <div key={p.id} onClick={() => setEditingProductId(p.id)} className="bg-[#1A1D21] border border-[#2A2E35] rounded-lg p-4 flex justify-between items-center group cursor-pointer">
                                    <div className="flex-1"><div className="flex items-center gap-3 mb-1"><h3 className="text-[#E2E2E2] font-serif text-lg">{p.name}</h3><span className="text-[#666] text-[10px] uppercase border border-[#333] px-1.5 py-0.5 rounded">{p.role}</span>{hasContent && <ShieldCheck className="w-3.5 h-3.5 text-[#2E9F85]" />}</div>{hasContent ? <p className="text-[#999] text-xs truncate max-w-lg">{p.contract.why}</p> : <span className="text-[10px] uppercase font-bold text-[#E0B945] bg-[#E0B945]/10 px-2 py-0.5 rounded">Needs Content</span>}</div>
                                    <ChevronRight className="w-5 h-5 text-[#333] group-hover:text-[#B08D57]" />
                                </div>
                            );
                        })}
                    </div>
                )}

                {tab === 'cocktails' && (
                    <div className="space-y-3">
                        {data.cocktails.map(c => (
                            <details key={c.id} className="bg-[#1A1D21] border border-[#2A2E35] rounded-lg group">
                                <summary className="flex justify-between items-center p-4 cursor-pointer list-none"><div className="flex items-center gap-4"><div className="p-2 rounded bg-[#0F1113] border border-[#2A2E35] text-[#B08D57]"><Martini className="w-4 h-4" /></div><div><h3 className="text-[#E2E2E2] font-serif text-lg">{c.name}</h3><p className="text-[#666] text-xs">{c.headline}</p></div></div><ChevronDown className="w-4 h-4 text-[#666]" /></summary>
                                <div className="p-4 pt-0 border-t border-[#2A2E35] mt-2"><div className="grid grid-cols-2 gap-4 mt-4"><div><span className="text-[10px] uppercase font-bold text-[#666] block mb-2">Specs</span><ul className="text-sm text-[#999] space-y-1">{c.specs.ingredients.map((ing, i) => (<li key={i} className="flex justify-between"><span>{ing.name}</span><span>{ing.amount}</span></li>))}</ul></div><div className="space-y-3"><div><span className="text-[10px] uppercase font-bold text-[#666] block mb-2">Glassware</span><div className="flex items-center gap-2 text-sm text-[#999]"><GlassWater className="w-3 h-3 text-[#B08D57]" />{c.specs.glass}</div></div></div></div></div>
                            </details>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
