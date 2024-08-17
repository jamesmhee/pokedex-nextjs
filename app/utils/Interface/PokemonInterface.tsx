import { SetStateAction } from "react"

export type IPokemonData = IPokemons[]

export interface PokemonData {
  data: Data
}

export interface Data {
  pokemons: IPokemons[]
}

export interface IPokemons {
  id: string
  number: string
  name: string  
  classification: string
  types: string[]  
  evolutions?: Evolution[]  
  image: string
}

export interface Evolution {
  id: string
}

export interface PokemonContextProps {
  choosePokemon: string
  setChoosePokemon: React.Dispatch<SetStateAction<string>>
}

export interface PokemonTable {  
  id: string
  number: string
  name: string
  classification: string
  types: string[]
  evolutions: any
  image: string    
}