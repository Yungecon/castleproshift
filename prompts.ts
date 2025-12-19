
import { Type } from "@google/genai";

// --- API CONFIGURATION ---
export const API_CONFIG = {
  model: "gemini-3-pro-preview", 
  temperature: 0.1, 
  topK: 40,
  topP: 0.95,
  tools: [
    { googleSearch: {} } 
  ]
};

export const AI_PERSONA = `You are a veteran Beverage Director at a World's 50 Best Bar. 
Your goal is to educate professional bartenders with verified, actionable knowledge.

CRITICAL INTEGRITY PROTOCOL:
1. ACCURACY IS PARAMOUNT. Use Google Search to verify every technical detail.
2. NO TRUNCATION. You must provide all 4 requested depth layers for every spirit.
3. SOURCE TRUTH. Prioritize technical sheets and reputable industry journalism.`;

export const FIELD_PROMPTS = {
  contract: {
    anchor: {
      instruction: "Define this product in 4-6 words. Be clinical but evocative.",
      example: "Sonoran-style desert gin"
    },
    say: {
      instruction: "Write a single, romantic sentence a bartender can say to sell this.",
      example: "A desert-driven spirit with citrus peel and a dry, savory finish."
    },
    why: {
      instruction: "Explain the functional role in a cocktail. Focus on structural impact.",
      example: "Provides a savory backbone that cuts through floral sweeteners."
    }
  },
  layers: {
    distillery_story: {
      instruction: "Still types, Master Distiller names, and specific harvesting methods."
    },
    history: {
      instruction: "Dates, figureheads, and specific events (wars, decrees)."
    },
    style_region: {
      instruction: "Sub-category, region, soil, and climate details."
    },
    flavor_aroma: {
      instruction: "Dominant notes for Nose, Palate, and Finish."
    }
  }
};

export const GENERATE_PROMPT_BY_ROLE = (name: string, role: string) => {
    const baseTask = `${AI_PERSONA}\n\nTASK: Research "${name}" (Role: ${role}) and generate a JSON object.`;
    
    const contractSchema = `
        contract: {
            anchor: { type: Type.STRING },
            say: { type: Type.STRING },
            why: { type: Type.STRING },
            proof: { type: Type.STRING }
        },
    `;

    if (['Base Spirit', 'Modifier', 'Liqueur', 'Spirit'].includes(role)) {
        return `
            ${baseTask}
            RULES: Use Google Search. You MUST provide all four layers below. Do not leave them empty.
            
            JSON Schema required:
            {
                ${contractSchema}
                layers: {
                    flavor_aroma: { type: Type.STRING, description: "Nose, Palate, Finish notes" },
                    style_region: { type: Type.STRING, description: "Technical category and terroir" },
                    distillery_story: { type: Type.STRING, description: "Production specifics (stills/people)" },
                    history: { type: Type.STRING, description: "Historical origin and dates" },
                    botanicals: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: {type: Type.STRING}, info: {type: Type.STRING} } } }
                }
            }
        `;
    }

    return `
        ${baseTask}
        JSON Schema required:
        {
            ${contractSchema}
            layers: {
                flavor_aroma: { type: Type.STRING },
                origin_story: { type: Type.STRING },
                production_notes: { type: Type.STRING }
            }
        }
    `;
};

export const GENERATE_COCKTAIL_PROMPT = (name: string, specs: string) => {
    return `
        ${AI_PERSONA}
        TASK: Analyze "${name}" with specs: ${specs}.
        JSON Schema required:
        {
            contract: {
                anchor: { type: Type.STRING },
                say: { type: Type.STRING },
                why: { type: Type.STRING },
                whyExists: { type: Type.STRING },
                menuRole: { type: Type.STRING },
                ifTheyLikeX: { type: Type.STRING }
            },
            depthLayers: {
                flavor_mechanics: { type: Type.STRING },
                history: { type: Type.STRING }
            }
        }
    `;
};
