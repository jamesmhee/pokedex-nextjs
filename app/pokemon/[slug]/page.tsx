'use client'
import CustomButton from "@/app/components/CustomButton";
import { GetPokemon } from "@/app/services/GetData";
import { PokemonDetail } from "@/app/utils/Interface/Pokemon";
import React, { useEffect, useState } from "react";
import { Divider } from 'antd';
import { RiArrowGoBackFill } from "react-icons/ri";
import Loading from "@/app/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { findTypes } from "@/app/components/CustomTable";
import { FaInfoCircle } from "react-icons/fa";
import { LuSword } from "react-icons/lu";
import { TbMoodCry } from "react-icons/tb";
import { LuSwords } from "react-icons/lu";
import Image from "next/image";
import Notfound from "@/app/components/Notfound";

const Page = ({ params }: { params: { slug: string } }) => {  
  const [ pokemon, setPokemon ] = useState<PokemonDetail>({} as PokemonDetail)
  const [ onEvolution, setOnEvolution ] = useState<boolean>(false)
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const Router = useRouter()
  const searchParams = useSearchParams()

  useEffect(()=>{
    
    const PokemonData = async ()=>{
      const data = await GetPokemon(params.slug)      
      if(data.data.pokemon){
        setPokemon(data.data.pokemon)
      }
      setIsLoading(false)
    }
    PokemonData()        
  },[params.slug])

  const findAvg = (min:number, max:number)=> {
    const find = (min + max) / 2
    return find.toFixed(2)
  }

  const Evolution = (name:string) =>{
    setOnEvolution(true)
    setTimeout(()=>{
      Router.push(`/pokemon/${name}?evolution=true`)
    }, 2000)
  }

  return (
    <div>
      {isLoading ? 
      (
        <div className="flex w-full h-screen items-center justify-center">
          <Loading/>
        </div>
      ) 
      : 
      (
        JSON.stringify(pokemon) !== '{}' ?
        (
          <>          
            <div className="flex sm:hidden items-center my-2 mr-[-15px] text-lg justify-end">
                <CustomButton onLoading={false} type="text" text={(<RiArrowGoBackFill className="text-2xl"/>)} onClick={()=>Router.back()}/>
            </div>  
            <div className="flex flex-col md:flex-row gap-5 overflow-hidden">
              <div className="mx-auto w-full sm:w-max justify-center items-center sm:mx-auto md:mx-0 flex flex-col">
                <Image alt="Pokemon Image" 
                  width={0}
                  height={0}                  
                  priority                  
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  className="rounded-t-xl sm:min-w-[500px]" 
                  src={pokemon.image} />
                <div className="flex justify-between w-full border bg-zinc-300 px-5 py-3 text-zinc-900 rounded-b-xl items-center">
                  <span className="text-2xl sm:text-3xl font-medium uppercase">
                    {pokemon.name}
                  </span>
                  <span className="text-right text-[12px] sm:text-base">{pokemon.classification}</span>
                </div>
              </div>
              <ul className="flex flex-col gap-5 flex-0 w-full">
                <div className="hidden sm:flex items-center gap-5 text-lg justify-end">
                  <CustomButton onLoading={false} type="text" text={(<RiArrowGoBackFill className="text-2xl"/>)} onClick={()=>Router.back()}/>
                </div>
                <Divider orientation="left" orientationMargin={0} plain>
                  <span className="text-xl flex items-center gap-2 font-medium"><FaInfoCircle/> Info</span>
                </Divider>

                <div className="flex flex-wrap">
                  <li className="flex-1 leading-[45px]">                    
                    <div className="flex gap-2">
                      <span className="font-bold">Type:</span>
                      <div className="flex flex-wrap gap-2">
                        {pokemon.types.map((elm, index) => (
                          <span className={findTypes(elm) + ' px-5 rounded-lg'} key={index}>
                            {elm}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Weight:</span>
                      <span>
                        {findAvg(parseFloat(pokemon.weight.minimum), parseFloat(pokemon.weight.maximum)) + ' kg'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Height:</span>
                      <span>
                        {findAvg(parseFloat(pokemon.height.minimum), parseFloat(pokemon.height.maximum)) + ' m'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Flee Rate:</span>
                      <span>{pokemon.fleeRate}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">MAX CP:</span>
                      <span>{pokemon.maxCP}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">MAX HP:</span>
                      <span>{pokemon.maxHP}</span>
                    </div>
                  </li>                  
                  <li className="flex-1 leading-10">
                    <div className="flex gap-2 mb-2">
                      <span className="font-bold">Resistant:</span>
                      <div className="flex gap-2 flex-wrap">
                        {pokemon.resistant.map((elm, index) => (
                          <span key={index} className={findTypes(elm) + ' px-5 rounded-lg'}>
                            {elm}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Weakness:</span>
                      <div className="flex gap-2 flex-wrap">
                        {pokemon.weaknesses.map((elm, index) => (
                          <span key={index} className={findTypes(elm) + ' px-5 rounded-lg'}>
                            {elm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>                  
                </div>
                {
                  pokemon.evolutions ? 
                  (<><CustomButton onLoading={onEvolution} type={"primary"} text={'EVOLUTION'} onClick={()=>Evolution(pokemon.evolutions[0].name)}/></>)
                  :
                  (<></>)
                }                
              </ul>              
            </div>

            <ul className="flex flex-col gap-5">
              <Divider orientation="left" orientationMargin={0} plain>
                <span className="text-xl flex items-center gap-2 font-medium"><LuSword/> Normal Attack</span>
              </Divider>
              <li className="flex gap-2">
                <div className="flex gap-2 flex-col">
                  {pokemon.attacks.fast.map((elm, index) => (
                    <div key={index} className="flex w-full gap-2 flex-wrap">
                      <span className="font-bold">Name:</span>
                      <span>{elm.name}</span>
                      <span className="font-bold">Type:</span>
                      <span>{elm.type}</span>
                      <span className="font-bold">Damage:</span>
                      <span>{elm.damage}</span>
                    </div>
                  ))}
                </div>
              </li>

              <Divider orientation="left" orientationMargin={0} plain>
                <span className="text-xl flex items-center gap-2 font-medium"><LuSwords/> Special Attack</span>
              </Divider>
              <li className="flex gap-2">
                <div className="flex gap-2 flex-col">
                  {pokemon.attacks.special.map((elm, index) => (
                    <div key={index} className="flex w-full gap-2 flex-wrap">
                      <span className="font-bold">Name:</span>
                      <span>{elm.name}</span>
                      <span className="font-bold">Type:</span>
                      <span>{elm.type}</span>
                      <span className="font-bold">Damage:</span>
                      <span>{elm.damage}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </>
        )
        :
        (
          <Notfound pokemonName={params.slug}/>
        )
      )}
    </div>
  );
};

export default Page;
