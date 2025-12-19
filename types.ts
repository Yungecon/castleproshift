
import { ReactNode } from 'react';

export interface GemStyle {
  bg: string;
  text: string;
  border: string;
}

export type DepthLevel = 'essential' | 'useful' | 'deep';
export type MomentTag = 'pre_shift' | 'table_story' | 'rush_safe';

export interface ContentContract {
  say: string;       // "The Script"
  anchor: string;    // "What it is" / Definition
  why: string;       // "Why it works" / "Why here"
  proof?: string;    // "Cool fact" / "Validation"
  ifTheyAsk?: string;// Objection handling / specific Qs
  ifTheyLikeX?: string; // Bridging / Recommendation
}

export interface LayerContentItem {
  label: string;
  info: string;
}

export interface DepthLayer {
  id: string; // Recommended: l_flavor, l_history, l_distillery, l_terroir
  title: string;
  content: string | LayerContentItem[];
  visualId?: string;
  depth: DepthLevel;
  tags?: MomentTag[];
  isEnabled?: boolean;
}

export interface BatchComponent {
  name: string;
  productId?: string; 
}

export interface Product {
  id: string;
  name: string; 
  producer?: string; 
  role: string;
  gem: 'emerald' | 'garnet' | 'citrine';
  contract: ContentContract;
  depthLayers: DepthLayer[];
  batchComponents?: BatchComponent[];
}

export interface Concept {
  id: string;
  name: string;
  visualId?: string;
  gem: 'emerald' | 'garnet' | 'citrine';
  contract: ContentContract;
  depthLayers: DepthLayer[];
}

export interface CocktailSpecIngredient {
  name: string;
  amount: string;
  subIngredients?: CocktailSpecIngredient[]; 
}

export interface CocktailSpecs {
  glass: string;
  method: string;
  garnish: string;
  ingredients: CocktailSpecIngredient[];
}

export interface Cocktail {
  id: string;
  type: string;
  name: string;
  nameMeaning?: string; 
  headline: string; 
  visualId?: string;
  contract: ContentContract & {
    whyExists: string; 
    menuRole: string;  
  };
  productIds: string[];
  conceptIds: string[];
  depthLayers: DepthLayer[];
  specs: CocktailSpecs;
}

export type ActiveLayersState = Record<string, boolean>;

export interface AppData {
  cocktails: Cocktail[];
  products: Record<string, Product>;
  concepts: Record<string, Concept>;
}

// API Response Types
export interface AIProductResponse {
  contract: {
    anchor?: string;
    say?: string;
    why?: string;
    proof?: string;
  };
  layers: {
    flavor_aroma?: string;
    style_region?: string;
    distillery_story?: string;
    history?: string;
    botanicals?: Array<{ label: string; info: string }>;
    [key: string]: string | Array<{ label: string; info: string }> | undefined;
  };
}

export interface AICocktailResponse {
  contract: {
    anchor?: string;
    say?: string;
    why?: string;
    whyExists?: string;
    menuRole?: string;
    ifTheyLikeX?: string;
  };
  depthLayers: {
    flavor_mechanics?: string;
    history?: string;
    [key: string]: string | undefined;
  };
}

export interface ExtractedCocktailResponse {
  cocktails: Array<{
    name: string;
    glass?: string;
    method?: string;
    garnish?: string;
    ingredients?: Array<{
      name: string;
      amount: string;
      role?: string;
      subIngredients?: Array<{ name: string; amount: string }>;
    }>;
  }>;
}
