
import React from 'react';
import { AppData, GemStyle } from './types';

/**
 * --- DATA INTEGRITY GUARDRAIL ---
 * DO NOT TRUNCATE. DO NOT REMOVE CONTEXT LAYERS. 
 * Every Product MUST include:
 * 1. Flavor & Aroma (Essential)
 * 2. Style & Region (Useful)
 * 3. Distillery/Production Story (Deep)
 * 4. History/Cultural Context (Deep)
 */

export const GEM_COLORS: Record<string, GemStyle> = {
  emerald: { bg: 'bg-[#1E6F5C]/20', text: 'text-[#2E9F85]', border: 'border-[#1E6F5C]/50' },
  garnet:  { bg: 'bg-[#6E1F2B]/20', text: 'text-[#D65F6F]', border: 'border-[#6E1F2B]/50' },
  citrine: { bg: 'bg-[#C9A227]/10', text: 'text-[#E0B945]', border: 'border-[#C9A227]/40' },
};

export const VISUALS: Record<string, React.JSX.Element> = {
  cocktail_rocks: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#B08D57] stroke-[1.5] fill-none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M25,25 L30,85 Q30,90 35,90 L65,90 Q70,90 70,85 L75,25" opacity="0.8" />
      <ellipse cx="50" cy="25" rx="25" ry="5" opacity="0.3" />
      <path d="M29,75 L31,85 Q31,88 35,88 L65,88 Q69,88 69,85 L71,75" opacity="0.6" />
      <path d="M27,45 L29,75 C29,75 35,78 50,78 C65,78 71,75 71,75 L73,45" />
      <path d="M38,45 L62,45 L62,70 L38,70 Z" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  ),
  cocktail_coup: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#B08D57] stroke-[1.5] fill-none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20,25 Q50,65 80,25 Z" />
      <path d="M50,55 L50,85" />
      <path d="M35,85 L65,85" />
      <path d="M25,35 L75,35" strokeDasharray="2 2" opacity="0.3" />
    </svg>
  ),
  cocktail_collins: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#B08D57] stroke-[1.5] fill-none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M35,15 L38,85 Q38,90 43,90 L57,90 Q62,90 62,85 L65,15" opacity="0.8" />
      <path d="M40,30 L60,30" strokeDasharray="2 2" opacity="0.3" />
      <path d="M40,50 L60,50" strokeDasharray="2 2" opacity="0.3" />
      <path d="M40,70 L60,70" strokeDasharray="2 2" opacity="0.3" />
    </svg>
  ),
  cocktail_nick_nora: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#B08D57] stroke-[1.5] fill-none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30,20 Q50,55 70,20" />
      <ellipse cx="50" cy="20" rx="20" ry="3" opacity="0.3" />
      <path d="M50,42 L50,85" />
      <path d="M38,85 L62,85" />
    </svg>
  ),
  cocktail_snifter: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#B08D57] stroke-[1.5] fill-none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M38,35 L62,35 C75,35 80,50 80,65 C80,85 50,85 50,85 C50,85 20,85 20,65 C20,50 25,35 38,35 Z" />
      <path d="M50,85 L50,92" />
      <path d="M35,92 L65,92" />
      <path d="M22,60 L78,60" strokeDasharray="2 2" opacity="0.3" />
    </svg>
  ),
  bergamot: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#E0B945] stroke-[1.5] fill-none" strokeLinecap="round">
      <path d="M50,20 C70,20 85,35 85,55 C85,75 70,90 50,90 C30,90 15,75 15,55 C15,35 30,20 50,20 Z" />
    </svg>
  )
};

export const DATA: AppData = {
  cocktails: [
    {
      id: 'c_fiore_dinverno',
      type: 'cocktail',
      name: "Fiore D'Inverno",
      nameMeaning: "Italian for 'Winter Flower'—symbolizing the bright, floral notes of bergamot blooming in the cold season.",
      headline: "White Negroni Variation",
      visualId: 'cocktail_rocks', 
      contract: {
        anchor: "A bone-dry white Negroni variation",
        say: "A bright, aromatic high-proof sipper with floral bergamot and a sharp, herbal finish.",
        why: "To bridge light aperitivos and spirit-forward stirred drinks.",
        whyExists: "Fills the 'Adventurous but Approachable' slot.",
        menuRole: "Modern Classic Riff",
        proof: "Uses Diega Gin from the Sonoran desert for unique terroir.",
        ifTheyLikeX: "Negronis but wants something lighter and more citrus-forward."
      },
      productIds: ['p_diega_gin', 'p_italicus', 'p_cocchi'],
      conceptIds: ['con_white_negroni', 'con_bergamot'], 
      depthLayers: [
        { 
          id: 'l_flavor_mechanics', 
          title: "Flavor Mechanics", 
          depth: 'useful',
          content: "The dryness of the Sonoran Gin cuts through the floral sweetness of Italicus, while Cocchi provides the essential bitter backbone." 
        }
      ],
      specs: {
        glass: "Rocks",
        method: "Stir, Strain",
        garnish: "Orange Twist",
        ingredients: [
          { name: "Diega Amarillo Gin", amount: "1.5 oz" },
          { name: "Italicus", amount: "0.75 oz" },
          { name: "Cocchi Americano", amount: "0.75 oz" }
        ]
      }
    },
    {
        id: 'c_muralist',
        type: 'cocktail',
        name: "The Muralist",
        nameMeaning: "A tribute to the bold Mexican Muralism movement.",
        headline: "Spiced Reposado & Walnut Sour",
        visualId: 'cocktail_coup',
        contract: {
          anchor: "A savory, spiced Reposado Sour",
          say: "An earthy, spice-driven tequila sour featuring toasted walnut and dark Renaissance botanicals.",
          why: "To showcase the savory side of Reposado tequila through nutty tannins.",
          whyExists: "The sophisticated choice for tequila enthusiasts.",
          menuRole: "Signature Spiced",
          proof: "Uses Alchermes, a liqueur with a 500-year history.",
          ifTheyLikeX: "Paper Planes or complex, tannin-forward citrus drinks."
        },
        productIds: ['p_corrido_repo', 'p_lazzaroni_nocino', 'p_heirloom_alchermes', 'p_pink_grapefruit', 'p_lime_fresh', 'p_agave_nectar'],
        conceptIds: ['con_spiced_sour'],
        depthLayers: [
          {
            id: 'l_flavor_mechanics',
            title: "Flavor Mechanics",
            depth: 'useful',
            content: "Nocino (walnut) and Alchermes (clove/rose) create a 'third flavor' mimicking dry red wine."
          }
        ],
        specs: {
          glass: "Coup",
          method: "Shake, Fine Strain",
          garnish: "Grapefruit Twist (expressed)",
          ingredients: [
            { name: "Corrido Reposado", amount: "1.5 oz" },
            { name: "Lazzaroni Nocino", amount: "0.25 oz" },
            { name: "Heirloom Alchermes", amount: "0.25 oz" },
            { name: "Pink Grapefruit Juice", amount: "0.5 oz" },
            { name: "Fresh Lime Juice", amount: "0.5 oz" },
            { name: "Agave Nectar (2:1)", amount: "0.25 oz" }
          ]
        }
    },
    {
        id: 'c_high_desert',
        type: 'cocktail',
        name: "High Desert",
        nameMeaning: "Arid landscapes where heat meets refreshing citrus.",
        headline: "Spiced Grapefruit Vodka Sour",
        visualId: 'cocktail_rocks',
        contract: {
          anchor: "A refreshing, spiced vodka-based grapefruit sour",
          say: "A bright and zesty vodka sour with botanical ginger and a warm cinnamon finish.",
          why: "To provide a clean, approachable vodka sour with high-impact aromatics.",
          whyExists: "The primary 'Light & Zesty' vodka entry.",
          menuRole: "Signature Refreshing",
          proof: "Uses Fee Foam for a vegan, silky mouthfeel.",
          ifTheyLikeX: "Moscow Mules or Greyhounds but want more complexity."
        },
        productIds: ['p_ketel_one', 'p_giffard_pamplemousse', 'p_new_deal_ginger', 'p_fee_foam', 'p_cinnamon_tincture', 'p_scarborough_bitters'],
        conceptIds: ['con_spiced_sour'],
        depthLayers: [
          { id: 'l_flavor_mechanics', title: "Flavor Mechanics", depth: 'useful', content: "Thermal counterpoint: cold citrus meets ginger/cinnamon heat." }
        ],
        specs: {
          glass: "Large Rocks",
          method: "Shake, Strain over Fresh Ice",
          garnish: "Grapefruit Twist & Expressed Cinnamon",
          ingredients: [
            { name: "Ketel One Vodka", amount: "1.5 oz" },
            { name: "Giffard Pamplemousse", amount: "0.5 oz" },
            { name: "New Deal Ginger Liqueur", amount: "0.25 oz" },
            { name: "Fee Foam", amount: "2 dashes" },
            { name: "Cinnamon Tincture", amount: "1 dash" },
            { name: "Scarborough Bitters", amount: "2 dashes" }
          ]
        }
    },
    {
      id: 'c_don_cenote',
      type: 'cocktail',
      name: "Don Cenote",
      headline: "Passionfruit & Pandan Highball",
      visualId: 'cocktail_collins',
      contract: {
        anchor: "A carbonated tropical highball",
        say: "A bright, sparkling highball with tart passionfruit and creamy pandan aromatics.",
        why: "To provide a lower-ABV, high-refreshment option.",
        whyExists: "The primary tropical entry.",
        menuRole: "Signature Highball",
        ifTheyLikeX: "Piña Coladas or Gin & Tonics."
      },
      productIds: ['p_stiggins_rum', 'p_giffard_vanilla', 'p_fruitful_passion', 'p_kota_pandan', 'p_lime_fresh'],
      conceptIds: ['con_highball_refresh'],
      depthLayers: [
        { id: 'l_flavor_mechanics', title: "Flavor Mechanics", depth: 'useful', content: "Pandan and Vanilla create a 'phantom' creaminess." }
      ],
      specs: {
        glass: "Collins",
        method: "Whip Shake, Top with Soda",
        garnish: "Pandan Leaf",
        ingredients: [
          { name: "Stiggins Pineapple Rum", amount: "1.5 oz" },
          { name: "Giffard Vanilla", amount: "0.25 oz" },
          { name: "Fruitful Passionfruit", amount: "0.5 oz" },
          { name: "Kota Pandan", amount: "0.25 oz" },
          { name: "Fresh Lime Juice", amount: "0.5 oz" }
        ]
      }
    },
    {
      id: 'c_cashmere',
      type: 'cocktail',
      name: "Cashmere",
      headline: "Spiced Winter Bourbon Sipper",
      visualId: 'cocktail_nick_nora',
      contract: {
        anchor: "A rich, spirit-forward spiced bourbon cocktail",
        say: "A soft, luxurious sipper with warm winter spices and honeyed wine.",
        why: "To provide a seasonal, spirit-heavy option.",
        whyExists: "The slow-sipping winter signature.",
        menuRole: "Signature Spirituous",
        ifTheyLikeX: "Manhattans or Old Fashioneds."
      },
      productIds: ['p_spiced_buffalo', 'p_angostura_amaro', 'p_cocchi_torino', 'p_lustau_sherry', 'p_maple_syrup'],
      conceptIds: ['con_spiced_sour'],
      depthLayers: [
        { id: 'l_flavor_mechanics', title: "Flavor Mechanics", depth: 'useful', content: "Maple and Amaro provide weight, while Sherry cleans the finish." }
      ],
      specs: {
        glass: "Nick and Nora",
        method: "Stir, Strain",
        garnish: "Lemon Twist",
        ingredients: [
          { name: "Spiced Buffalo Trace", amount: "1.5 oz" },
          { name: "Angostura Amaro", amount: "0.5 oz" },
          { name: "Cocchi Torino", amount: "0.5 oz" },
          { name: "Lustau Sherry", amount: "0.25 oz" },
          { name: "Maple Syrup", amount: "1 barspoon" }
        ]
      }
    },
    {
      id: 'c_root_awakening',
      type: 'cocktail',
      name: "Root Awakening",
      headline: "Earthy Savory Highball",
      visualId: 'cocktail_snifter',
      contract: {
        anchor: "A savory, earthy Aquavit highball",
        say: "A bright and savory refresher with caraway-forward Aquavit and earthy beet.",
        why: "To offer a culinary-forward highball option.",
        whyExists: "The primary savory/earthy entry.",
        menuRole: "Savory Signature",
        ifTheyLikeX: "Dirty Martinis or Bloody Marys."
      },
      productIds: ['p_aquavit', 'p_beet_fennel_syrup', 'p_lemon_fresh', 'p_peychaud_bitters', 'p_ginger_beer'],
      conceptIds: ['con_highball_refresh'],
      depthLayers: [
        { id: 'l_flavor_mechanics', title: "Flavor Mechanics", depth: 'useful', content: "Beet's earthy geosmin is bridged by caraway and fennel." }
      ],
      specs: {
        glass: "Snifter",
        method: "Build",
        garnish: "Fennel Frond",
        ingredients: [
          { name: "Aquavit", amount: "1.5 oz" },
          { name: "Beet/Fennel Syrup", amount: "0.75 oz" },
          { name: "Fresh Lemon Juice", amount: "0.5 oz" },
          { name: "Peychaud Bitters", amount: "2 dashes" },
          { name: "Ginger Beer", amount: "Top" }
        ]
      }
    }
  ],
  products: {
    'p_diega_gin': {
      id: 'p_diega_gin',
      name: "Diega Amarillo Gin",
      role: "Base Spirit",
      gem: "emerald",
      contract: {
        anchor: "Sonoran-style desert gin",
        why: "Desert botanicals & savory backbone",
        say: "A bone-dry desert gin with lemon verbena, chamomile, and a resinous finish."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Juniper, chamomile, lemon verbena, and dry desert creosote." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Sonoran Style / Mexico. Defined by arid botanicals and winemaker-base spirits." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "Produced by winemaker Jorge Maciel in Valle de Guadalupe using a wine-grape base." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Pays homage to the 'Adelitas' (women warriors) of the Mexican Revolution." }
      ]
    },
    'p_italicus': {
      id: 'p_italicus',
      name: "Italicus Rosolio",
      role: "Modifier",
      gem: "citrine",
      contract: {
        anchor: "Bergamot-forward Italian liqueur",
        why: "Intense floral aromatics",
        say: "An aromatic Italian liqueur defined by zesty bergamot and rose."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Bergamot zest, lavender, rose petals, and chamomile." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Rosolio style / Italy. Based on a Renaissance recipe using bergamot from Calabria." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "Produced at a family distillery in Moncalieri, Torino." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Revived the 'Rosolio' (sun liqueur) category, once the drink of Italian royalty." }
      ]
    },
    'p_cocchi': {
      id: 'p_cocchi',
      name: "Cocchi Americano",
      role: "Modifier",
      gem: "garnet",
      contract: {
        anchor: "Aromatized white wine",
        why: "Bitter-sweet structural backbone",
        say: "A classic bitter-sweet aperitif wine with notes of baked apple and gentian."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Orange peel, elderflower, baked apple, and dry gentian bitterness." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Asti, Italy. Based on Moscato d'Asti wine." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "Infused with Cinchona bark (quinine) and bitter orange peels." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Created in 1891. The closest relative to the original 'Kina Lillet'." }
      ]
    },
    'p_corrido_repo': {
      id: 'p_corrido_repo',
      name: "Corrido Reposado",
      role: "Base Spirit",
      gem: "emerald",
      contract: {
        anchor: "High-elevation Highland Tequila",
        why: "Honeyed agave with soft oak tannins",
        say: "A clean Highland tequila aged 6 months for a vanilla and cooked agave profile."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Honey, vanilla bean, cooked agave, and light toasted oak." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Highland (Los Altos) Jalisco. Red volcanic soil leads to sweeter agave." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "NOM 1438 (Casa Maestri). Brick ovens and roller mills." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Named for the 'Corrido'—Mexican folk ballads telling stories of struggle." }
      ]
    },
    'p_lazzaroni_nocino': {
      id: 'p_lazzaroni_nocino',
      name: "Lazzaroni Nocino",
      role: "Modifier",
      gem: "garnet",
      contract: {
        anchor: "Italian Green Walnut Liqueur",
        why: "Earthy bitterness and dark tannins",
        say: "A dark walnut liqueur with notes of cocoa, cinnamon, and clove."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Roasted walnut, dark chocolate, and tannic finish." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Saronno, Italy. Traditional walnut liqueur harvested on St. John's Eve." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "Macerated in neutral spirit for 2 years." },
        { id: 'l_history', title: "History", depth: 'deep', content: "The Lazzaroni family is world-famous for their Amaretti cookies." }
      ]
    },
    'p_heirloom_alchermes': {
      id: 'p_heirloom_alchermes',
      name: "Heirloom Alchermes",
      role: "Modifier",
      gem: "citrine",
      contract: {
        anchor: "Renaissance Spiced Elixir",
        why: "Warm spice top-notes",
        say: "A complex spice liqueur with cinnamon and rose water."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Clove, cinnamon, rose water, and cardamom." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Based on Florentine traditions from the 15th century." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "Produced by Heirloom Liqueurs using whole botanicals." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Known as the Liqueur of the Medici, used for both health and leisure." }
      ]
    },
    'p_ketel_one': {
      id: 'p_ketel_one',
      name: "Ketel One Vodka",
      role: "Base Spirit",
      gem: "emerald",
      contract: {
        anchor: "Wheat-based Dutch vodka",
        why: "Silky texture for citrus builds",
        say: "A super-premium vodka with a silky mouthfeel and subtle notes of honey."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Crisp wheat, subtle honey, and a long citrus finish." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Wheat Vodka / Schiedam, Netherlands." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "Nolet Family distillery (1691). Distilleerketel #1." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Defined the premium vodka category in the 80s." }
      ]
    },
    'p_giffard_pamplemousse': {
      id: 'p_giffard_pamplemousse',
      name: "Giffard Pamplemousse",
      role: "Modifier",
      gem: "citrine",
      contract: {
        anchor: "Pink grapefruit crème liqueur",
        why: "Concentrated citrus aromatics",
        say: "A vibrant grapefruit liqueur made from cold-macerated pink grapefruit peels."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Intense pink grapefruit zest and floral sweetness." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Angers, France. 4th-generation family liqueurist." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "Static maceration preserves volatile citrus oils." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Founded in 1885 by Emile Giffard, a pharmacist." }
      ]
    },
    'p_new_deal_ginger': {
      id: 'p_new_deal_ginger',
      name: "New Deal Ginger",
      role: "Modifier",
      gem: "citrine",
      contract: {
        anchor: "Small-batch botanical ginger liqueur",
        why: "Authentic, clean botanical heat",
        say: "An authentic ginger liqueur with a sharp bite and light honey sweetness."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Freshly grated ginger and white pepper." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Portland, Oregon. Craft movement pioneer." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "Uses real ginger root maceration." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Founded in 2004, at the start of the Portland craft boom." }
      ]
    },
    'p_fee_foam': {
      id: 'p_fee_foam',
      name: "Fee Foam",
      role: "Modifier",
      gem: "citrine",
      contract: {
        anchor: "Botanical foaming agent",
        why: "Silky texture without egg whites",
        say: "A vegan foaming agent that provides a luxurious head."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Sensory Impact", depth: 'essential', content: "Neutral flavor, high textural impact." },
        { id: 'l_terroir', title: "Production", depth: 'useful', content: "Rochester, NY. Fee Brothers family owned since 1864." },
        { id: 'l_distillery', title: "Technique", depth: 'deep', content: "Uses quillaia bark extracts to create micro-foam." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Survived prohibition by making non-alcoholic modifiers." }
      ]
    },
    'p_cinnamon_tincture': {
      id: 'p_cinnamon_tincture',
      name: "Cinnamon Tincture",
      role: "Modifier",
      gem: "garnet",
      contract: {
        anchor: "Intense spice extract",
        why: "Aromatic heat on the finish",
        say: "A touch of cinnamon oil to warm the palate."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Toasted cinnamon and woody spice." },
        { id: 'l_terroir', title: "Technique", depth: 'useful', content: "Macerated for 2 weeks in high-proof grain spirit." },
        { id: 'l_distillery', title: "Ingredients", depth: 'deep', content: "Ceylon cinnamon sticks and neutral spirit." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Tinctures were originally medicinal bitters." }
      ]
    },
    'p_scarborough_bitters': {
      id: 'p_scarborough_bitters',
      name: "Scarborough Bitters",
      role: "Modifier",
      gem: "garnet",
      contract: {
        anchor: "Savory herbal bitters",
        why: "Adds herbal complexity to vodka",
        say: "A savory bitter profile with parsley, sage, rosemary, and thyme."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Earthy rosemary, sage, and savory thyme." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Bittermens 'Heritage' collection." },
        { id: 'l_distillery', title: "Story", depth: 'deep', content: "Inspired by the classic English folk song." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Modern bitters movement pioneer (est. 2007)." }
      ]
    },
    'p_stiggins_rum': {
      id: 'p_stiggins_rum',
      name: "Plantation Stiggins' Fancy",
      role: "Base Spirit",
      gem: "emerald",
      contract: {
        anchor: "Pineapple-infused dark rum",
        why: "Tropical depth and fruity esters",
        say: "A rich dark rum infused with Victoria pineapples for a toasted, tropical profile."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Roasted pineapple, dark sugar, and black pepper finish." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Caribbean Blend (Barbados, Jamaica, Trinidad)." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'deep', content: "Pineapple rinds macerated in 3 Stars rum, while fruit is distilled in Dark rum." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Named after the pineapple-loving character in Dickens' Pickwick Papers." }
      ]
    },
    'p_giffard_vanilla': {
      id: 'p_giffard_vanilla',
      name: "Giffard Vanille de Madagascar",
      role: "Modifier",
      gem: "citrine",
      contract: {
        anchor: "Premium Vanilla Bean Liqueur",
        why: "Creamy texture and floral sweetness",
        say: "A sophisticated vanilla liqueur featuring authentic Madagascar pods."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Natural vanilla bean, subtle spice, and floral aromatics." },
        { id: 'l_terroir', title: "Origin", depth: 'useful', content: "Madagascar (Planifolia) vanilla pods." },
        { id: 'l_distillery', title: "Production", depth: 'deep', content: "Slow maceration of whole beans in neutral spirit." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Vanilla was once rarer than gold; Giffard preserves that luxury profile." }
      ]
    },
    'p_fruitful_passion': {
      id: 'p_fruitful_passion',
      name: "Fruitful Passionfruit",
      role: "Modifier",
      gem: "citrine",
      contract: {
        anchor: "Real-fruit tropical liqueur",
        why: "High-acid intensity and tropical lift",
        say: "An intense, tart passionfruit liqueur that brings the beach to the glass."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Tart passionfruit, tropical flowers, and bright citrus." },
        { id: 'l_terroir', title: "Ingredients", depth: 'useful', content: "Real passionfruit juice and pulp." },
        { id: 'l_history', title: "Category", depth: 'deep', content: "Part of the new wave of 'Real Fruit' liqueurs focusing on transparency." }
      ]
    },
    'p_kota_pandan': {
      id: 'p_kota_pandan',
      name: "Kota Pandan",
      role: "Modifier",
      gem: "emerald",
      contract: {
        anchor: "Artisanal Pandan Modifier",
        why: "Toasted nuttiness and herbal creaminess",
        say: "A savory-sweet botanical modifier with notes of toasted basmati rice."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Toasted rice, grassy vanilla, and nutty coconut." },
        { id: 'l_terroir', title: "Origin", depth: 'useful', content: "Sourced from Southeast Asian Pandanus leaves." },
        { id: 'l_history', title: "Cultural Context", depth: 'deep', content: "Commonly used in Asian cuisine, often called the 'Vanilla of the East'." }
      ]
    },
    'p_spiced_buffalo': {
      id: 'p_spiced_buffalo',
      name: "Winter Spiced Buffalo Trace",
      role: "Base Spirit",
      gem: "emerald",
      contract: {
        anchor: "House-spiced Kentucky Bourbon",
        why: "Backbone of winter aromatics and oak",
        say: "Our signature bourbon infused with whole winter spices for a warm, holiday profile."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Buffalo Trace's vanilla and toffee meet clove, star anise, and ginger." },
        { id: 'l_distillery', title: "Distillery Story", depth: 'useful', content: "Buffalo Trace (NOM 1438) - the oldest continuously operating US distillery." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Buffalo Trace was one of the few permitted to make 'medicinal' whiskey during Prohibition." }
      ]
    },
    'p_angostura_amaro': {
      id: 'p_angostura_amaro',
      name: "Amargo d'Angostura",
      role: "Modifier",
      gem: "garnet",
      contract: {
        anchor: "Concentrated spice-forward Amaro",
        why: "Intense bitter complexity and cinnamon weight",
        say: "The world-famous bitters reimagined as a deep, drinkable liqueur."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Heavy cinnamon, clove, dark chocolate, and licorice." },
        { id: 'l_terroir', title: "Origin", depth: 'useful', content: "Trinidad and Tobago." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Released in 2014 to celebrate the 190th anniversary of the House of Angostura." }
      ]
    },
    'p_cocchi_torino': {
      id: 'p_cocchi_torino',
      name: "Cocchi Vermouth di Torino",
      role: "Modifier",
      gem: "garnet",
      contract: {
        anchor: "Classic red Italian vermouth",
        why: "Dark fruit sweetness and herbal balance",
        say: "A rich red vermouth with notes of cocoa, rhubarb, and citrus."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Moscato base, orange peel, cocoa, and bitter herbs." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Follows the original 1891 recipe. Vermouth di Torino is a protected geographical indication." }
      ]
    },
    'p_lustau_sherry': {
      id: 'p_lustau_sherry',
      name: "Lustau Sherry",
      role: "Modifier",
      gem: "citrine",
      contract: {
        anchor: "Fortified wine from Jerez",
        why: "Nuttiness and saline balance",
        say: "A dry, nutty sherry that adds a savory, complex finish to spirituous drinks."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Roasted almond, salted caramel, and dry yeast." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Jerez, Spain. Aged under 'Flor' (yeast) in a Solera system." }
      ]
    },
    'p_maple_syrup': {
      id: 'p_maple_syrup',
      name: "Maple Syrup",
      role: "Sweetener",
      gem: "citrine",
      contract: {
        anchor: "Grade A dark maple",
        why: "Textural weight and woody sweetness",
        say: "A touch of real maple for a rich, velvety mouthfeel."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Toasted caramel, forest wood, and rich mineral sweetness." }
      ]
    },
    'p_aquavit': {
      id: 'p_aquavit',
      name: "Aquavit",
      role: "Base Spirit",
      gem: "emerald",
      contract: {
        anchor: "Botanical spirit from Scandinavia",
        why: "Provides savory caraway structure",
        say: "A savory, caraway-driven spirit that bridges the gap between gin and vodka."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Powerful caraway, star anise, and earthy herbal finish." },
        { id: 'l_terroir', title: "Style / Region", depth: 'useful', content: "Scandinavian Spirit. Defined by caraway or dill focus." },
        { id: 'l_history', title: "History", depth: 'deep', content: "First mentioned in 1531 as 'Aqua Vitae' (Water of Life)." }
      ]
    },
    'p_beet_fennel_syrup': {
      id: 'p_beet_fennel_syrup',
      name: "Beet/Fennel Syrup",
      role: "Sweetener",
      gem: "citrine",
      contract: {
        anchor: "Savory root-vegetable sweetener",
        why: "Adds earthy depth and licorice notes",
        say: "A house-made syrup combining earthiness with a bright licorice snap."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Deep earthy beet and bright anise/fennel." },
        { id: 'l_technique', title: "Technique", depth: 'useful', content: "Beets juiced raw to preserve the geosmin (scent of rain) molecule." }
      ]
    },
    'p_peychaud_bitters': {
      id: 'p_peychaud_bitters',
      name: "Peychaud's Bitters",
      role: "Modifier",
      gem: "garnet",
      contract: {
        anchor: "Gentian-based Creole bitters",
        why: "Adds floral lift and anise aromatics",
        say: "A legendary New Orleans bitter with floral notes and sweet anise."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Hibiscus, anise, and bitter gentian." },
        { id: 'l_history', title: "History", depth: 'deep', content: "Created by Antoine Peychaud in 1830s New Orleans; essential to the Sazerac." }
      ]
    },
    'p_ginger_beer': {
      id: 'p_ginger_beer',
      name: "Ginger Beer",
      role: "Modifier",
      gem: "citrine",
      contract: {
        anchor: "Spiced carbonated mixer",
        why: "Adds effervescence and botanical heat",
        say: "A spicy, long-bubbled ginger beer that provides a clean botanical burn."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Sharp, spicy ginger root and citric acid." }
      ]
    },
    'p_lemon_fresh': {
      id: 'p_lemon_fresh',
      name: "Fresh Lemon",
      role: "Citrus",
      gem: "emerald",
      contract: {
        anchor: "Primary acid component",
        why: "Provides bright citric lift and balance",
        say: "Freshly squeezed lemon adds the essential brightness to the drink."
      },
      depthLayers: [
        { id: 'l_flavor', title: "Flavor Aroma", depth: 'essential', content: "Zesty lemon oil and sharp citric acid." }
      ]
    }
  },
  concepts: {
    'con_spiced_sour': {
      id: 'con_spiced_sour',
      name: "Spiced Sour",
      gem: "garnet",
      contract: {
        anchor: "A sour format with savory/herbal modifiers.",
        why: "Culinary-forward drink profile.",
        say: "A bridge between classic sours and spiced cocktails."
      },
      depthLayers: [
        { id: 'l_mechanism', title: "Mechanism", depth: 'essential', content: "Balances spirit and citrus with spiced tannins." }
      ]
    },
    'con_highball_refresh': {
      id: 'con_highball_refresh',
      name: "Highball Refreshment",
      gem: "emerald",
      contract: {
        anchor: "Carbonated cocktails in tall glassware.",
        why: "Lifts aromatics and lowers ABV perception.",
        say: "Bubbly, bright, and built for refreshment."
      },
      depthLayers: [
        { id: 'l_mechanism', title: "Physics", depth: 'useful', content: "Bubbles transport volatile aromatics to the nose." }
      ]
    },
    'con_bergamot': {
      id: 'con_bergamot',
      name: "Bergamot",
      visualId: 'bergamot', 
      gem: "citrine",
      contract: {
        anchor: "Aromatic citrus essential oils.",
        why: "Lifts aromatics without juice acidity.",
        say: "The bright, floral profile of Earl Grey tea."
      },
      depthLayers: [
        { id: 'l_history', title: "Origin", depth: 'useful', content: "Native to Calabria, Italy." }
      ]
    },
    'con_white_negroni': {
      id: 'con_white_negroni',
      name: "White Negroni",
      gem: "emerald",
      contract: {
        anchor: "A riff on a Negroni using clear spirits.",
        why: "Maintains classic ratios with floral notes.",
        say: "A cleaner, dryer version of the classic red Negroni."
      },
      depthLayers: [
        { id: 'l_history', title: "History", depth: 'useful', content: "Invented in 2001 by Wayne Collins." }
      ]
    }
  }
};
