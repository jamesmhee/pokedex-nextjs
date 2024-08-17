export interface Pokemon {
    data: Data
  }
  
  export interface Data {
    pokemon: PokemonDetail
  }
  
  export interface PokemonDetail {
    id: string
    number: string
    name: string
    weight: Weight
    height: Height
    classification: string
    types: string[]
    resistant: string[]
    weaknesses: string[]
    fleeRate: number
    maxCP: number
    maxHP: number
    image: string
    attacks: Attacks
    evolutions: Evolution[]
  }
  
  export interface Weight {
    minimum: string
    maximum: string
  }
  
  export interface Height {
    minimum: string
    maximum: string
  }
  
  export interface Attacks {
    fast: Fast[]
    special: Special[]
  }
  
  export interface Fast {
    name: string
    type: string
    damage: number
  }
  
  export interface Special {
    name: string
    type: string
    damage: number
  }
  
  export interface Evolution {
    id: string
    number: string
    name: string
    classification: string
    types: string[]
    resistant: string[]
    weaknesses: string[]
    fleeRate: number
    maxCP: number
    evolutions?: Evolution2[]
    maxHP: number
    image: string
  }
  
  export interface Evolution2 {
    id: string
  }
  