# The Muralist

> Service View context export from `constants.tsx` (what the Service View tab can display).

## Identity
- **ID**: `c_muralist`
- **Headline**: Spiced Reposado & Walnut Sour
- **Menu role (badge)**: Signature Spiced
- **Visual ID**: `cocktail_coup`
- **Naming convention**: A tribute to the bold Mexican Muralism movement.

## The Hook (Service View)
- **Label shown**: `If they like ...` (because `ifTheyLikeX` is present)
- **Hook source precedence**: `ifTheyLikeX` → `proof` → `say`
- **ifTheyLikeX**: Paper Planes or complex, tannin-forward citrus drinks.
- **proof**: Uses Alchermes, a liqueur with a 500-year history.
- **say (fallback)**: An earthy, spice-driven tequila sour featuring toasted walnut and dark Renaissance botanicals.
- **Hook quote displayed**:

> "Paper Planes or complex, tannin-forward citrus drinks."

## Cocktail Contract
- **What it is (anchor)**: A savory, spiced Reposado Sour
- **Say This**:

> "An earthy, spice-driven tequila sour featuring toasted walnut and dark Renaissance botanicals."

- **Why**: To showcase the savory side of Reposado tequila through nutty tannins.
- **Why exists**: The sophisticated choice for tequila enthusiasts.

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
- **Glass**: Coup
- **Method**: Shake, Fine Strain
- **Garnish**: Grapefruit Twist (expressed)

### Spec ingredients
- **1.5 oz** Corrido Reposado
- **0.25 oz** Lazzaroni Nocino
- **0.25 oz** Heirloom Alchermes
- **0.5 oz** Pink Grapefruit Juice
- **0.5 oz** Fresh Lime Juice
- **0.25 oz** Agave Nectar (2:1)

## The Build (Service View Product Cards)
> Note: Service View only shows products present in `data.products`. Some spec ingredients below have no product context in `constants.tsx`.

### Product: Corrido Reposado
- **ID**: `p_corrido_repo`
- **Role**: Base Spirit
- **Gem**: `emerald`

#### Contract
- **Anchor**: High-elevation Highland Tequila
- **Why**: Honeyed agave with soft oak tannins
- **Say**:

> "A clean Highland tequila aged 6 months for a vanilla and cooked agave profile."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Honey, vanilla bean, cooked agave, and light toasted oak.
- **Style / Region** (useful, `l_terroir`): Highland (Los Altos) Jalisco. Red volcanic soil leads to sweeter agave.
- **Distillery Story** (deep, `l_distillery`): NOM 1438 (Casa Maestri). Brick ovens and roller mills.
- **History** (deep, `l_history`): Named for the 'Corrido'—Mexican folk ballads telling stories of struggle.

### Product: Lazzaroni Nocino
- **ID**: `p_lazzaroni_nocino`
- **Role**: Modifier
- **Gem**: `garnet`

#### Contract
- **Anchor**: Italian Green Walnut Liqueur
- **Why**: Earthy bitterness and dark tannins
- **Say**:

> "A dark walnut liqueur with notes of cocoa, cinnamon, and clove."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Roasted walnut, dark chocolate, and tannic finish.
- **Style / Region** (useful, `l_terroir`): Saronno, Italy. Traditional walnut liqueur harvested on St. John's Eve.
- **Distillery Story** (deep, `l_distillery`): Macerated in neutral spirit for 2 years.
- **History** (deep, `l_history`): The Lazzaroni family is world-famous for their Amaretti cookies.

### Product: Heirloom Alchermes
- **ID**: `p_heirloom_alchermes`
- **Role**: Modifier
- **Gem**: `citrine`

#### Contract
- **Anchor**: Renaissance Spiced Elixir
- **Why**: Warm spice top-notes
- **Say**:

> "A complex spice liqueur with cinnamon and rose water."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Clove, cinnamon, rose water, and cardamom.
- **Style / Region** (useful, `l_terroir`): Based on Florentine traditions from the 15th century.
- **Distillery Story** (deep, `l_distillery`): Produced by Heirloom Liqueurs using whole botanicals.
- **History** (deep, `l_history`): Known as the Liqueur of the Medici, used for both health and leisure.

### Spec ingredients with no Service View product context (missing from `data.products`)
- Pink Grapefruit Juice (`p_pink_grapefruit` referenced, but no product object found)
- Fresh Lime Juice (`p_lime_fresh` referenced, but no product object found)
- Agave Nectar (2:1) (`p_agave_nectar` referenced, but no product object found)

## Flavor Alchemy (Cocktail depth layers)
- **Flavor Mechanics** (useful, `l_flavor_mechanics`):

> "Nocino (walnut) and Alchermes (clove/rose) create a 'third flavor' mimicking dry red wine."