# Cashmere

> Service View context export from `constants.tsx` (what the Service View tab can display).

## Identity
- **ID**: `c_cashmere`
- **Headline**: Spiced Winter Bourbon Sipper
- **Menu role (badge)**: Signature Spirituous
- **Visual ID**: `cocktail_nick_nora`
- **Naming convention**: — (not provided in `constants.tsx`)

## The Hook (Service View)
- **Label shown**: `If they like ...` (because `ifTheyLikeX` is present)
- **Hook source precedence**: `ifTheyLikeX` → `proof` → `say`
- **ifTheyLikeX**: Manhattans or Old Fashioneds.
- **proof**: — (not provided in `constants.tsx`)
- **say (fallback)**: A soft, luxurious sipper with warm winter spices and honeyed wine.
- **Hook quote displayed**:

> "Manhattans or Old Fashioneds."

## Cocktail Contract
- **What it is (anchor)**: A rich, spirit-forward spiced bourbon cocktail
- **Say This**:

> "A soft, luxurious sipper with warm winter spices and honeyed wine."

- **Why**: To provide a seasonal, spirit-heavy option.
- **Why exists**: The slow-sipping winter signature.

## Focus Concept (Service View)
- **Default focus concept**: Spiced Sour (`con_spiced_sour`) (only `conceptIds` entry)

### Concept: Spiced Sour
- **ID**: `con_spiced_sour`
- **Gem**: `garnet`
- **Anchor**: A sour format with savory/herbal modifiers.
- **Why here**: Culinary-forward drink profile.
- **Say**: A bridge between classic sours and spiced cocktails.

#### Depth layers
- **Mechanism** (essential, `l_mechanism`): Balances spirit and citrus with spiced tannins.

## Specs (Cocktail)
- **Glass**: Nick and Nora
- **Method**: Stir, Strain
- **Garnish**: Lemon Twist

### Spec ingredients
- **1.5 oz** Spiced Buffalo Trace
- **0.5 oz** Angostura Amaro
- **0.5 oz** Cocchi Torino
- **0.25 oz** Lustau Sherry
- **1 barspoon** Maple Syrup

## The Build (Service View Product Cards)

### Product: Winter Spiced Buffalo Trace
- **ID**: `p_spiced_buffalo`
- **Role**: Base Spirit
- **Gem**: `emerald`

#### Contract
- **Anchor**: House-spiced Kentucky Bourbon
- **Why**: Backbone of winter aromatics and oak
- **Say**:

> "Our signature bourbon infused with whole winter spices for a warm, holiday profile."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Buffalo Trace's vanilla and toffee meet clove, star anise, and ginger.
- **Distillery Story** (useful, `l_distillery`): Buffalo Trace (NOM 1438) - the oldest continuously operating US distillery.
- **History** (deep, `l_history`): Buffalo Trace was one of the few permitted to make 'medicinal' whiskey during Prohibition.

### Product: Amargo d'Angostura
- **ID**: `p_angostura_amaro`
- **Role**: Modifier
- **Gem**: `garnet`

#### Contract
- **Anchor**: Concentrated spice-forward Amaro
- **Why**: Intense bitter complexity and cinnamon weight
- **Say**:

> "The world-famous bitters reimagined as a deep, drinkable liqueur."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Heavy cinnamon, clove, dark chocolate, and licorice.
- **Origin** (useful, `l_terroir`): Trinidad and Tobago.
- **History** (deep, `l_history`): Released in 2014 to celebrate the 190th anniversary of the House of Angostura.

### Product: Cocchi Vermouth di Torino
- **ID**: `p_cocchi_torino`
- **Role**: Modifier
- **Gem**: `garnet`

#### Contract
- **Anchor**: Classic red Italian vermouth
- **Why**: Dark fruit sweetness and herbal balance
- **Say**:

> "A rich red vermouth with notes of cocoa, rhubarb, and citrus."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Moscato base, orange peel, cocoa, and bitter herbs.
- **History** (deep, `l_history`): Follows the original 1891 recipe. Vermouth di Torino is a protected geographical indication.

### Product: Lustau Sherry
- **ID**: `p_lustau_sherry`
- **Role**: Modifier
- **Gem**: `citrine`

#### Contract
- **Anchor**: Fortified wine from Jerez
- **Why**: Nuttiness and saline balance
- **Say**:

> "A dry, nutty sherry that adds a savory, complex finish to spirituous drinks."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Roasted almond, salted caramel, and dry yeast.
- **Style / Region** (useful, `l_terroir`): Jerez, Spain. Aged under 'Flor' (yeast) in a Solera system.

### Product: Maple Syrup
- **ID**: `p_maple_syrup`
- **Role**: Sweetener
- **Gem**: `citrine`

#### Contract
- **Anchor**: Grade A dark maple
- **Why**: Textural weight and woody sweetness
- **Say**:

> "A touch of real maple for a rich, velvety mouthfeel."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Toasted caramel, forest wood, and rich mineral sweetness.

## Flavor Alchemy (Cocktail depth layers)
- **Flavor Mechanics** (useful, `l_flavor_mechanics`):

> "Maple and Amaro provide weight, while Sherry cleans the finish."