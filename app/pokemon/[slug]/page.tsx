'use client'
import CustomButton from "@/app/components/CustomButton";
import { GetPokemon } from "@/app/services/GetData";
import { PokemonDetail } from "@/app/utils/Interface/Pokemon";
import React, { useEffect, useState } from "react";
import { Divider } from 'antd';
import { RiArrowGoBackFill } from "react-icons/ri";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";
import { findTypes } from "@/app/components/CustomTable";

const page = ({ params }: { params: { slug: string } }) => {  
  const [ pokemon, setPokemon ] = useState<PokemonDetail>({} as PokemonDetail)
  const router = useRouter()
  
  useEffect(()=>{
    const PokemonData = async ()=>{
      const data = await GetPokemon(params.slug)
      if(data){
        setPokemon(data.data.pokemon)
      }        
    }
    PokemonData()    
  },[params.slug])

  const findAvg = (min:number, max:number)=> {
    const find = (min + max) / 2
    return find
  }

  return (
    <div>
      {
        Object.keys(pokemon).length > 0 ?         
        (
          <>
            <div className="flex items-center gap-5 text-lg justify-end">
              <CustomButton type="text" text={(<RiArrowGoBackFill className="text-2xl"/>)} onClick={()=>router.back()}/>
            </div>
            <Divider orientation="left">
              <span className="text-3xl font-medium">
                {pokemon.name}
              </span>
            </Divider>            
            <div className="flex flex-col sm:flex-row gap-5 flex-wrap overflow-x-scroll overflow-y-hidden">
              <img alt="Pokemon Image" className="rounded-md w-full sm:max-w-[300px] md:max-w-[350px]" src={pokemon.image}/>              
              <ul className="flex flex-col gap-5 flex-1">
                <Divider orientation="left" plain>
                  <span className="text-xl font-medium">
                    Info
                  </span>
                </Divider>                
                <div className="flex gap-2 flex-wrap">
                  <li className="flex-1 leading-10">
                    <li className="flex gap-2">
                      <span className="font-bold">
                      Class:
                      </span>
                      <span>
                        {pokemon.classification}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">
                      Type:
                      </span>
                      {
                        pokemon.types.map((elm,index)=>(
                          <span className={findTypes(elm) + ' px-5 rounded-lg'} key={index}>
                            {elm}
                          </span>
                        ))
                      }
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">
                      Weight:
                      </span>
                      <span>
                        {
                          findAvg(parseFloat(pokemon.weight.minimum), parseFloat(pokemon.weight.maximum)) + ' kg'
                        }
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">
                      Height:
                      </span>
                      <span>
                        {
                          findAvg(parseFloat(pokemon.height.minimum), parseFloat(pokemon.height.maximum)) + ' m'
                        }
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">
                      Flee Rate:
                      </span>
                      <span>
                        {pokemon.fleeRate}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">
                      MAX CP:
                      </span>
                      <span>
                        {pokemon.maxCP}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">
                      MAX HP:
                      </span>
                      <span>
                        {pokemon.maxHP}
                      </span>
                    </li>                
                  </li>
                  <li className="flex-1 leading-10">
                    <li className="flex gap-2">
                        <span className="font-bold">
                        Resistant:
                        </span>
                        <span>
                          {pokemon.resistant.map((elm,index)=>(
                            <div key={index} className="flex gap-2">
                              <span className={findTypes(elm) + ' px-5'}>{elm}</span>
                            </div>
                          ))}
                        </span>
                      </li>                
                  </li>
                </div>
              </ul>            
            </div>
            <ul className="flex flex-col gap-5">
                <Divider orientation="left" plain>
                  <span className="text-xl font-medium">
                    Normal Attack
                  </span>
                </Divider>     
                <li className="flex gap-2">
                  <span className="flex gap-2 flex-col">
                    {pokemon.attacks.fast.map((elm, index)=>(
                      <div key={index} className="flex w-full gap-2 flex-wrap">
                        <span className="font-bold">
                          Name:
                        </span>
                        <span>
                          {elm.name}
                        </span>
                        <span className="font-bold">
                          Type:
                        </span>
                        <span>
                          {elm.type}
                        </span>                        
                        <span className="font-bold">
                          Damage:
                        </span>
                        <span>
                          {elm.damage}
                        </span>
                      </div>
                    ))}
                  </span>
                </li>                
                <Divider orientation="left" plain>
                  <span className="text-xl font-medium">
                    Special Attack
                  </span>
                </Divider>
                <li className="flex gap-2">                  
                  <span className="flex gap-2 flex-col">
                    {pokemon.attacks.special.map((elm, index)=>(
                      <div key={index} className="flex w-full gap-2 flex-wrap">
                        <span className="font-bold">
                          Name:
                        </span>
                        <span>
                          {elm.name}
                        </span>
                        <span className="font-bold">
                          Type:
                        </span>
                        <span>
                          {elm.type}
                        </span>                        
                        <span className="font-bold">
                          Damage:
                        </span>
                        <span>
                          {elm.damage}
                        </span>
                      </div>
                    ))}
                  </span>
                </li>                
              </ul>
            
          </>
        )
        :
        (
          <Loading/>
        )
      }
    </div>
  );
};

export default page;
