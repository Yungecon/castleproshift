# Don Cenote

> Service View context export from `constants.tsx` (what the Service View tab can display).

## Identity
- **ID**: `c_don_cenote`
- **Headline**: Passionfruit & Pandan Highball
- **Menu role (badge)**: Signature Highball
- **Visual ID**: `cocktail_collins`
- **Naming convention**: "Cenote" refers to the natural sinkholes found in Mexico's Yucatán Peninsula—crystal-clear, refreshing pools that mirror this drink's bright, tropical, and refreshing character.

## The Hook (Service View)
- **Label shown**: `If they like ...` (because `ifTheyLikeX` is present)
- **Hook source precedence**: `ifTheyLikeX` → `proof` → `say`
- **ifTheyLikeX**: Piña Coladas or Gin & Tonics.
- **proof**: — (not provided in `constants.tsx`)
- **say (fallback)**: A bright, sparkling highball with tart passionfruit and creamy pandan aromatics.
- **Hook quote displayed**:

> "Piña Coladas or Gin & Tonics."

## Cocktail Contract
- **What it is (anchor)**: A carbonated tropical highball
- **Say This**:

> "A bright, sparkling highball with tart passionfruit and creamy pandan aromatics."

- **Why**: To provide a lower-ABV, high-refreshment option.
- **Why exists**: The primary tropical entry.

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
- **Glass**: Collins
- **Method**: Whip Shake, Top with Soda
- **Garnish**: Pandan Leaf

### Spec ingredients
- **1.5 oz** Stiggins Pineapple Rum
- **0.25 oz** Giffard Vanilla
- **0.5 oz** Fruitful Passionfruit
- **0.25 oz** Kota Pandan
- **0.5 oz** Fresh Lime Juice

## The Build (Service View Product Cards)
> Note: Service View only shows products present in `data.products`. Fresh Lime has no product context in `constants.tsx`.

### Product: Plantation Stiggins' Fancy
- **ID**: `p_stiggins_rum`
- **Role**: Base Spirit
- **Gem**: `emerald`

#### Contract
- **Anchor**: Pineapple-infused dark rum
- **Why**: Tropical depth and fruity esters
- **Say**:

> "A rich dark rum infused with Victoria pineapples for a toasted, tropical profile."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Roasted pineapple, dark sugar, and black pepper finish.
- **Style / Region** (useful, `l_terroir`): Caribbean Blend (Barbados, Jamaica, Trinidad).
- **Distillery Story** (deep, `l_distillery`): Pineapple rinds macerated in 3 Stars rum, while fruit is distilled in Dark rum.
- **History** (deep, `l_history`): Named after the pineapple-loving character in Dickens' Pickwick Papers.

### Product: Giffard Vanille de Madagascar
- **ID**: `p_giffard_vanilla`
- **Role**: Modifier
- **Gem**: `citrine`

#### Contract
- **Anchor**: Premium Vanilla Bean Liqueur
- **Why**: Creamy texture and floral sweetness
- **Say**:

> "A sophisticated vanilla liqueur featuring authentic Madagascar pods."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Natural vanilla bean, subtle spice, and floral aromatics.
- **Origin** (useful, `l_terroir`): Madagascar (Planifolia) vanilla pods.
- **Production** (deep, `l_distillery`): Slow maceration of whole beans in neutral spirit.
- **History** (deep, `l_history`): Vanilla was once rarer than gold; Giffard preserves that luxury profile.

### Product: Fruitful Passionfruit
- **ID**: `p_fruitful_passion`
- **Role**: Modifier
- **Gem**: `citrine`

#### Contract
- **Anchor**: Real-fruit tropical liqueur
- **Why**: High-acid intensity and tropical lift
- **Say**:

> "An intense, tart passionfruit liqueur that brings the beach to the glass."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Tart passionfruit, tropical flowers, and bright citrus.
- **Ingredients** (useful, `l_terroir`): Real passionfruit juice and pulp.
- **Category** (deep, `l_history`): Part of the new wave of 'Real Fruit' liqueurs focusing on transparency.

### Product: Kota Pandan
- **ID**: `p_kota_pandan`
- **Role**: Modifier
- **Gem**: `emerald`

#### Contract
- **Anchor**: Artisanal Pandan Modifier
- **Why**: Toasted nuttiness and herbal creaminess
- **Say**:

> "A savory-sweet botanical modifier with notes of toasted basmati rice."

#### Depth layers
- **Flavor Aroma** (essential, `l_flavor`): Toasted rice, grassy vanilla, and nutty coconut.
- **Origin** (useful, `l_terroir`): Sourced from Southeast Asian Pandanus leaves.
- **Cultural Context** (deep, `l_history`): Commonly used in Asian cuisine, often called the 'Vanilla of the East'.

### Spec ingredients with no Service View product context (missing from `data.products`)
- Fresh Lime Juice (`p_lime_fresh` referenced, but no product object found)

## Flavor Alchemy (Cocktail depth layers)
- **Flavor Mechanics** (useful, `l_flavor_mechanics`):

> "Pandan and Vanilla create a 'phantom' creaminess."