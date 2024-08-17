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
    const result = await fetch(endpoint, config)
    
    if(!result.ok){
        throw new Error("Error Get Data")
    }
    const data = await result.json()    
    return data
}