/** Public assets */
export const HERO_MODEL_PATH = '/socrates_.obj.glb'
export const HERO_IMAGE_PATH = '/herosocrates.jpeg'
export const DIALOGUES_IMAGE_PATH = '/second%20image.jpeg'

/** Site-wide placeholders — swap before launch */
export const CONTRACT_ADDRESS =
  'H6gZ7wfndt9zKEihUDppZuNgkgFGSiHGdSxSWGcbpump'

export const SOCIAL = {
  twitter: 'https://x.com/SocraticOrder',
  dex: 'https://dexscreener.com/placeholder',
  buy: 'https://placeholder-buy-link.com',
} as const

export const DIALOGUE_QUOTES = [
  {
    original: 'The unexamined life is not worth living.',
    twist: 'The unexamined chart is not worth trading.',
  },
  {
    original:
      'I know that I am intelligent, because I know that I know nothing.',
    twist: 'So I just kept buying the dip.',
  },
  {
    original: 'Wonder is the beginning of wisdom.',
    twist: 'And the beginning of every good entry.',
  },
  {
    original:
      'There is only one good — knowledge; and one evil — ignorance.',
    twist: 'And one evil: paper hands.',
  },
  {
    original: 'Be as you wish to seem.',
    twist: 'Diamond hands, inside and out.',
  },
  {
    original:
      'The secret of change is to focus all your energy not on fighting the old, but on building the new.',
    twist: "We're not fighting fiat, we're building Athens.",
  },
] as const

export const TOKENOMICS = [
  { label: 'Total Supply', value: '1,000,000,000' },
  { label: 'Tax', value: '0 / 0' },
  { label: 'LP Burned', value: '100%' },
  { label: 'Contract', value: 'Renounced' },
] as const

export const ROADMAP_PHASES = [
  {
    numeral: 'I',
    title: 'Birth of Wisdom',
    description:
      'Token launch, community formation, and the first scrolls of the Academy.',
  },
  {
    numeral: 'II',
    title: 'The Academy Grows',
    description:
      'Listings, partnerships, and expanding the dialogue across the chain.',
  },
  {
    numeral: 'III',
    title: 'Immortality',
    description:
      'Legends are carved in marble. The philosopher endures on-chain forever.',
  },
] as const

/** Greek letters for ambient hero decoration */
export const GREEK_LETTERS = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'θ', 'λ', 'π', 'σ', 'φ', 'ω']
