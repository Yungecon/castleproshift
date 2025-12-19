# High Desert

> Service View context export from `constants.tsx` (what the Service View tab can display).

## Identity
- **ID**: `c_high_desert`
- **Headline**: Spiced Grapefruit Vodka Sour
- **Menu role (badge)**: Signature Refreshing
- **Visual ID**: `cocktail_rocks`
- **Naming convention**: Arid landscapes where heat meets refreshing citrus.

## The Hook (Service View)
- **Label shown**: `If they like ...` (because `ifTheyLikeX` is present)
- **Hook source precedence**: `ifTheyLikeX` → `proof` → `say`
- **ifTheyLikeX**: Moscow Mules or Greyhounds but want more complexity.
- **proof**: Uses Fee Foam for a vegan, silky mouthfeel.
- **say (fallback)**: A bright and zesty vodka sour with botanical ginger and a warm cinnamon finish.
- **Hook quote displayed**:

> "Moscow Mules or Greyhounds but want more complexity."

## Cocktail Contract
- **What it is (anchor)**: A refreshing, spiced vodka-based grapefruit sour
- **Say This**:

> "A bright and zesty vodka sour with botanical ginger and a warm cinnamon finish."

- **Why**: To provide a clean, approachable vodka sour with high-impact aromatics.
- **Why exists**: The primary 'Light & Zesty' vodka entry.

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
- **Glass**: Large Rocks
- **Method**: Shake, Strain over Fresh Ice
- **Garnish**: Grapefruit Twist & Expressed Cinnamon

### Spec ingredients
- **1.5 oz** Ketel One Vodka
- **0.5 oz** Giffard Pamplemousse
- **0.25 oz** New Deal Ginger Liqueur
- **2 dashes** Fee Foam
- **1 dash** Cinnamon Tincture
- **2 dashes** Scarborough Bitters

## The Build (Service View Product Cards)

### Product: Ketel One Vodka
- **ID**: `p_ketel_one`
- **Role**: Base Spirit
- **Gem**: `emerald`

#### Contract
- **Anchor**: Wheat-based Dutch vodka
- **Why**: Silky texture for citrus builds
- **Say**:

> "A super-premium vodka with a silky mouthfeel and subtle notes of honey."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Crisp wheat, subtle honey, and a long citrus finish.
- **Style / Region** (useful, `l_terroir`): Wheat Vodka / Schiedam, Netherlands.
- **Distillery Story** (deep, `l_distillery`): Nolet Family distillery (1691). Distilleerketel #1.
- **History** (deep, `l_history`): Defined the premium vodka category in the 80s.

### Product: Giffard Pamplemousse
- **ID**: `p_giffard_pamplemousse`
- **Role**: Modifier
- **Gem**: `citrine`

#### Contract
- **Anchor**: Pink grapefruit crème liqueur
- **Why**: Concentrated citrus aromatics
- **Say**:

> "A vibrant grapefruit liqueur made from cold-macerated pink grapefruit peels."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Intense pink grapefruit zest and floral sweetness.
- **Style / Region** (useful, `l_terroir`): Angers, France. 4th-generation family liqueurist.
- **Distillery Story** (deep, `l_distillery`): Static maceration preserves volatile citrus oils.
- **History** (deep, `l_history`): Founded in 1885 by Emile Giffard, a pharmacist.

### Product: New Deal Ginger
- **ID**: `p_new_deal_ginger`
- **Role**: Modifier
- **Gem**: `citrine`

#### Contract
- **Anchor**: Small-batch botanical ginger liqueur
- **Why**: Authentic, clean botanical heat
- **Say**:

> "An authentic ginger liqueur with a sharp bite and light honey sweetness."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Freshly grated ginger and white pepper.
- **Style / Region** (useful, `l_terroir`): Portland, Oregon. Craft movement pioneer.
- **Distillery Story** (deep, `l_distillery`): Uses real ginger root maceration.
- **History** (deep, `l_history`): Founded in 2004, at the start of the Portland craft boom.

### Product: Fee Foam
- **ID**: `p_fee_foam`
- **Role**: Modifier
- **Gem**: `citrine`

#### Contract
- **Anchor**: Botanical foaming agent
- **Why**: Silky texture without egg whites
- **Say**:

> "A vegan foaming agent that provides a luxurious head."

#### Depth layers
- **Sensory Impact** (essential, `l_flavor`): Neutral flavor, high textural impact.
- **Production** (useful, `l_terroir`): Rochester, NY. Fee Brothers family owned since 1864.
- **Technique** (deep, `l_distillery`): Uses quillaia bark extracts to create micro-foam.
- **History** (deep, `l_history`): Survived prohibition by making non-alcoholic modifiers.

### Product: Cinnamon Tincture
- **ID**: `p_cinnamon_tincture`
- **Role**: Modifier
- **Gem**: `garnet`

#### Contract
- **Anchor**: Intense spice extract
- **Why**: Aromatic heat on the finish
- **Say**:

> "A touch of cinnamon oil to warm the palate."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Toasted cinnamon and woody spice.
- **Technique** (useful, `l_terroir`): Macerated for 2 weeks in high-proof grain spirit.
- **Ingredients** (deep, `l_distillery`): Ceylon cinnamon sticks and neutral spirit.
- **History** (deep, `l_history`): Tinctures were originally medicinal bitters.

### Product: Scarborough Bitters
- **ID**: `p_scarborough_bitters`
- **Role**: Modifier
- **Gem**: `garnet`

#### Contract
- **Anchor**: Savory herbal bitters
- **Why**: Adds herbal complexity to vodka
- **Say**:

> "A savory bitter profile with parsley, sage, rosemary, and thyme."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Earthy rosemary, sage, and savory thyme.
- **Style / Region** (useful, `l_terroir`): Bittermens 'Heritage' collection.
- **Story** (deep, `l_distillery`): Inspired by the classic English folk song.
- **History** (deep, `l_history`): Modern bitters movement pioneer (est. 2007).

## Flavor Alchemy (Cocktail depth layers)
- **Flavor Mechanics** (useful, `l_flavor_mechanics`):

> "Thermal counterpoint: cold citrus meets ginger/cinnamon heat."