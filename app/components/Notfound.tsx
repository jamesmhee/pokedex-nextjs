import React from 'react'
import { TbMoodCry } from 'react-icons/tb'
type Props = {}

const Notfound = ({pokemonName}: {pokemonName?: string}) => {
  return (    
    <div className='flex flex-col gap-5 w-full items-center justify-center h-screen'>
        <TbMoodCry className='text-5xl'/>
        <h3 className='text-3xl'>Not Found {pokemonName}</h3>
    </div>    
  )
}

export default Notfound