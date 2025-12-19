# Root Awakening

> Service View context export from `constants.tsx` (what the Service View tab can display).

## Identity
- **ID**: `c_root_awakening`
- **Headline**: Earthy Savory Highball
- **Menu role (badge)**: Savory Signature
- **Visual ID**: `cocktail_snifter`
- **Naming convention**: A play on "root" vegetables (beet) and "awakening" the palate—referring to how earthy, savory flavors come alive when balanced with bright citrus and aromatic botanicals.

## The Hook (Service View)
- **Label shown**: `If they like ...` (because `ifTheyLikeX` is present)
- **Hook source precedence**: `ifTheyLikeX` → `proof` → `say`
- **ifTheyLikeX**: Dirty Martinis or Bloody Marys.
- **proof**: — (not provided in `constants.tsx`)
- **say (fallback)**: A bright and savory refresher with caraway-forward Aquavit and earthy beet.
- **Hook quote displayed**:

> "Dirty Martinis or Bloody Marys."

## Cocktail Contract
- **What it is (anchor)**: A savory, earthy Aquavit highball
- **Say This**:

> "A bright and savory refresher with caraway-forward Aquavit and earthy beet."

- **Why**: To offer a culinary-forward highball option.
- **Why exists**: The primary savory/earthy entry.

## Focus Concept (Service View)
- **Default focus concept**: Highball Refreshment (`con_highball_refresh`) (only `conceptIds` entry)

### Concept: Highball Refreshment
- **ID**: `con_highball_refresh`
- **Gem**: `emerald`
- **Anchor**: Carbonated cocktails in tall glassware.
- **Why here**: Lifts aromatics and lowers ABV perception.
- **Say**: Bubbly, bright, and built for refreshment.

#### Depth layers
- **Physics** (useful, `l_mechanism`): Bubbles transport volatile aromatics to the nose.

## Specs (Cocktail)
- **Glass**: Snifter
- **Method**: Build
- **Garnish**: Fennel Frond

### Spec ingredients
- **1.5 oz** Aquavit
- **0.75 oz** Beet/Fennel Syrup
- **0.5 oz** Fresh Lemon Juice
- **2 dashes** Peychaud Bitters
- **Top** Ginger Beer

## The Build (Service View Product Cards)

### Product: Aquavit
- **ID**: `p_aquavit`
- **Role**: Base Spirit
- **Gem**: `emerald`

#### Contract
- **Anchor**: Botanical spirit from Scandinavia
- **Why**: Provides savory caraway structure
- **Say**:

> "A savory, caraway-driven spirit that bridges the gap between gin and vodka."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Powerful caraway, star anise, and earthy herbal finish.
- **Style / Region** (useful, `l_terroir`): Scandinavian Spirit. Defined by caraway or dill focus.
- **History** (deep, `l_history`): First mentioned in 1531 as 'Aqua Vitae' (Water of Life).

### Product: Beet/Fennel Syrup
- **ID**: `p_beet_fennel_syrup`
- **Role**: Sweetener
- **Gem**: `citrine`

#### Contract
- **Anchor**: Savory root-vegetable sweetener
- **Why**: Adds earthy depth and licorice notes
- **Say**:

> "A house-made syrup combining earthiness with a bright licorice snap."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Deep earthy beet and bright anise/fennel.
- **Technique** (useful, `l_technique`): Beets juiced raw to preserve the geosmin (scent of rain) molecule.

### Product: Fresh Lemon
- **ID**: `p_lemon_fresh`
- **Role**: Citrus
- **Gem**: `emerald`

#### Contract
- **Anchor**: Primary acid component
- **Why**: Provides bright citric lift and balance
- **Say**:

> "Freshly squeezed lemon adds the essential brightness to the drink."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Zesty lemon oil and sharp citric acid.

### Product: Peychaud's Bitters
- **ID**: `p_peychaud_bitters`
- **Role**: Modifier
- **Gem**: `garnet`

#### Contract
- **Anchor**: Gentian-based Creole bitters
- **Why**: Adds floral lift and anise aromatics
- **Say**:

> "A legendary New Orleans bitter with floral notes and sweet anise."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Hibiscus, anise, and bitter gentian.
- **History** (deep, `l_history`): Created by Antoine Peychaud in 1830s New Orleans; essential to the Sazerac.

### Product: Ginger Beer
- **ID**: `p_ginger_beer`
- **Role**: Modifier
- **Gem**: `citrine`

#### Contract
- **Anchor**: Spiced carbonated mixer
- **Why**: Adds effervescence and botanical heat
- **Say**:

> "A spicy, long-bubbled ginger beer that provides a clean botanical burn."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Sharp, spicy ginger root and citric acid.

## Flavor Alchemy (Cocktail depth layers)
- **Flavor Mechanics** (useful, `l_flavor_mechanics`):

> "Beet's earthy geosmin is bridged by caraway and fennel."