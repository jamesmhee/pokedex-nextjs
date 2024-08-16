export type IPokemonData = IPokemons[]

export interface IPokemons {
  id: string
  number: string
  name: string
  weight: Weight
  height: Height
  classification: string
  types: string[]
  resistant: string[]
  weaknesses: string[]
  evolutions?: Evolution[]
  fleeRate: number
  maxCP: number
  maxHP: number
  image: string
}

export interface Weight {
  minimum: string
  maximum: string
}

export interface Height {
  minimum: string
  maximum: string
}

export interface Evolution {
  id: string
}
