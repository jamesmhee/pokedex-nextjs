import { Pokemon } from '../utils/Interface/Pokemon'
import {PokemonData} from '../utils/Interface/PokemonInterface'

const endpoint = process.env.NEXT_PUBLIC_API_URL || 'https://graphql-pokemon2.vercel.app'

export const GetData = async (limit: number):Promise<PokemonData> =>{
    const query = `
    query pokemons($first: Int!){
        pokemons(first: $first){
            id
            number
            name    
            classification
            types    
            evolutions {
                id
            }    
            image
        }
    }

    `
    const variables = {
        first: limit
    }
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    }

    try{
        const result = await fetch(endpoint, config)
        
        if(!result.ok){
            throw new Error("Error Get Data")
        }

        const data = await result.json()    
        return data
    }catch(error){
        throw error
    }
}

export const GetPokemon = async (pokemonName: string):Promise<Pokemon> =>{
    const query = `
    query pokemon($name: String){
        pokemon(name: $name){
            id
            number
            name
            weight{
            minimum
            maximum
            }
            height{
            minimum
            maximum
            }
            classification
            types
            resistant
            weaknesses
            fleeRate    
            maxCP
            maxHP
            image
            attacks{
            fast{
                name
                type
                damage
            }
            special{
                name
                type
                damage
            }
            }
            evolutions{
            id
            number
            name
            classification
            types
            resistant
            weaknesses
            fleeRate
            maxCP
            evolutions {
                id
            }
            maxHP
            image
            }  
        }
    }    
    `
    const variables = {
        name: pokemonName
    }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    }

    try{
        const result = await fetch(endpoint, config)
        if(!result.ok){
            throw new Error("Cann't get pokemon data")            
        }

        const data = await result.json()
        return data
    }catch(error){
        throw error
    }
}