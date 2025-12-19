# Fiore D'Inverno

> Service View context export from `constants.tsx` (what the Service View tab can display).

## Identity
- **ID**: `c_fiore_dinverno`
- **Headline**: White Negroni Variation
- **Menu role (badge)**: Modern Classic Riff
- **Visual ID**: `cocktail_rocks`
- **Naming convention**: Italian for 'Winter Flower'—symbolizing the bright, floral notes of bergamot blooming in the cold season.

## The Hook (Service View)
- **Label shown**: `If they like ...` (because `ifTheyLikeX` is present)
- **Hook source precedence**: `ifTheyLikeX` → `proof` → `say`
- **ifTheyLikeX**: Negronis but wants something lighter and more citrus-forward.
- **proof**: Uses Diega Gin from the Sonoran desert for unique terroir.
- **say (fallback)**: A bright, aromatic high-proof sipper with floral bergamot and a sharp, herbal finish.
- **Hook quote displayed**:

> "Negronis but wants something lighter and more citrus-forward."

## Cocktail Contract
- **What it is (anchor)**: A bone-dry white Negroni variation
- **Say This**:

> "A bright, aromatic high-proof sipper with floral bergamot and a sharp, herbal finish."

- **Why**: To bridge light aperitivos and spirit-forward stirred drinks.
- **Why exists**: Fills the 'Adventurous but Approachable' slot.

## Focus Concept (Service View)
- **Default focus concept**: White Negroni (`con_white_negroni`) (first `conceptIds` entry)

### Concept: White Negroni
- **ID**: `con_white_negroni`
- **Gem**: `emerald`
- **Anchor**: A riff on a Negroni using clear spirits.
- **Why here**: Maintains classic ratios with floral notes.
- **Say**: A cleaner, dryer version of the classic red Negroni.

#### Depth layers
- **History** (useful, `l_history`): Invented in 2001 by Wayne Collins.

### Concept: Bergamot
- **ID**: `con_bergamot`
- **Gem**: `citrine`
- **Visual ID**: `bergamot`
- **Anchor**: Aromatic citrus essential oils.
- **Why here**: Lifts aromatics without juice acidity.
- **Say**: The bright, floral profile of Earl Grey tea.

#### Depth layers
- **Origin** (useful, `l_history`): Native to Calabria, Italy.

## Specs (Cocktail)
- **Glass**: Rocks
- **Method**: Stir, Strain
- **Garnish**: Orange Twist

### Spec ingredients
- **1.5 oz** Diega Amarillo Gin
- **0.75 oz** Italicus
- **0.75 oz** Cocchi Americano

## The Build (Service View Product Cards)

### Product: Diega Amarillo Gin
- **ID**: `p_diega_gin`
- **Role**: Base Spirit
- **Gem**: `emerald`

#### Contract
- **Anchor**: Sonoran-style desert gin
- **Why**: Desert botanicals & savory backbone
- **Say**:

> "A bone-dry desert gin with lemon verbena, chamomile, and a resinous finish."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Juniper, chamomile, lemon verbena, and dry desert creosote.
- **Style / Region** (useful, `l_terroir`): Sonoran Style / Mexico. Defined by arid botanicals and winemaker-base spirits.
- **Distillery Story** (deep, `l_distillery`): Produced by winemaker Jorge Maciel in Valle de Guadalupe using a wine-grape base.
- **History** (deep, `l_history`): Pays homage to the 'Adelitas' (women warriors) of the Mexican Revolution.

### Product: Italicus Rosolio
- **ID**: `p_italicus`
- **Role**: Modifier
- **Gem**: `citrine`

#### Contract
- **Anchor**: Bergamot-forward Italian liqueur
- **Why**: Intense floral aromatics
- **Say**:

> "An aromatic Italian liqueur defined by zesty bergamot and rose."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Bergamot zest, lavender, rose petals, and chamomile.
- **Style / Region** (useful, `l_terroir`): Rosolio style / Italy. Based on a Renaissance recipe using bergamot from Calabria.
- **Distillery Story** (deep, `l_distillery`): Produced at a family distillery in Moncalieri, Torino.
- **History** (deep, `l_history`): Revived the 'Rosolio' (sun liqueur) category, once the drink of Italian royalty.

### Product: Cocchi Americano
- **ID**: `p_cocchi`
- **Role**: Modifier
- **Gem**: `garnet`

#### Contract
- **Anchor**: Aromatized white wine
- **Why**: Bitter-sweet structural backbone
- **Say**:

> "A classic bitter-sweet aperitif wine with notes of baked apple and gentian."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Orange peel, elderflower, baked apple, and dry gentian bitterness.
- **Style / Region** (useful, `l_terroir`): Asti, Italy. Based on Moscato d'Asti wine.
- **Distillery Story** (deep, `l_distillery`): Infused with Cinchona bark (quinine) and bitter orange peels.
- **History** (deep, `l_history`): Created in 1891. The closest relative to the original 'Kina Lillet'.

## Flavor Alchemy (Cocktail depth layers)
- **Flavor Mechanics** (useful, `l_flavor_mechanics`):

> "The dryness of the Sonoran Gin cuts through the floral sweetness of Italicus, while Cocchi provides the essential bitter backbone."