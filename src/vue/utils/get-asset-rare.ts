import { BoxDataWeb2, BoxItemType } from "~/blockchainTotal/getters/boxesWeb2"

// none, common, rare, mithic, legendary, vorpal
let raresByType: { [key in BoxItemType]: string } = {
  'vrp': 'none',
  'biomass': 'common',
  'carbon': 'common',
  'metal': 'common',
  'spice': 'common',
  'spore': 'common',
  'laser': 'common',
  'trends': 'none'
}

let raresByLaserLevel: { [key: number]: string } = {
  1: 'rare',
  2: 'mithic',
  3: 'legendary'
}

// biomass
// carbon
// laser1
// laser2
// laser3
// metal
// spice
// spore
// token
// trends
export const getAssetRareByKey = (key: string) => {
  if (key.startsWith('laser')) {
    const [type, level] = key.split('laser')
    return `${raresByLaserLevel[level]}`
  }

  return raresByType[key] || 'unknown'
}
