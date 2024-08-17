import React, { createContext, useMemo, useState } from 'react'
import {PokemonContextProps} from "../Interface/PokemonInterface"

interface IPokemonContextProps {
    children: React.JSX.Element | React.JSX.Element[]
}

export const PokemonContext = createContext<PokemonContextProps>({} as PokemonContextProps)

const PokemonStore = ({children}: IPokemonContextProps) => {
    const [ choosePokemon, setChoosePokemon ] = useState<string>('')
    const store = useMemo(()=> ({
        choosePokemon,
        setChoosePokemon
    }), 
    [
        choosePokemon,
        setChoosePokemon
    ])

  return (
    <PokemonContext.Provider value={store}>
        {children}
    </PokemonContext.Provider>
  )
}

export default PokemonStore