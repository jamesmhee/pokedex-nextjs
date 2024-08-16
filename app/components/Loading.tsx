import React from 'react'
import { MdCatchingPokemon } from "react-icons/md";

const Loading = () => {
  return (
    <div className='flex flex-col  h-full items-center text-red-500 justify-center'>        
        <MdCatchingPokemon className='text-5xl'/>
        <p className='text-black'>Loading..</p>
    </div>
  )
}

export default Loading