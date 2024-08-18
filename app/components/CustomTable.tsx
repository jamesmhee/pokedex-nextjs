'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Switch, Table } from 'antd';
import { GetData } from '../services/GetData';
import type { TableColumnsType } from 'antd';
import { IPokemonData, IPokemons, PokemonTable } from '../utils/Interface/PokemonInterface';
import SearchBox from './SearchBox';
import Loading from './Loading';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const findTypes = (types: string) =>{
  switch(types.toLowerCase()){
    case 'grass':
      return 'bg-lime-500 text-white'
    case 'poison':
      return 'bg-violet-700 text-white'
    case 'fire':
      return 'bg-red-500 text-white'
    case 'water':
      return 'bg-blue-500 text-white'
    case 'flying':
      return 'bg-blue-700 text-white'
    case 'bug':
      return 'bg-green-700 text-white'
    case 'electric':
      return 'bg-yellow-300 text-black'
    case 'ground':
      return 'bg-amber-800 text-white'
    case 'fairy':
      return 'bg-indigo-300 text-black'
    case 'fighting':
      return 'bg-red-800 text-white'
    case 'psychic':
      return 'bg-violet-400 text-white'
    case 'rock':
      return 'bg-zinc-600 text-white'
    case 'steel':
      return 'bg-zinc-900 text-white'
    case 'ice':
      return 'bg-blue-200 text-black'
    case 'ghost':
      return 'bg-zinc-500 text-white'
    case 'dragon':
      return 'bg-red-700 text-white'
    default:
      return 'bg-slate-100 text-black border'

  }
}

const CustomTable = () => {  
  const router = useRouter()
  const [ data, setData ] = useState<IPokemonData>({} as IPokemonData)    
  const [ searchValue, setSearchValue ] = useState<string>('')
  const [ isLoading, setIsLoading ] = useState<boolean>(true)  

  const get = async (searchValue: string) =>{    
    const result = await GetData(200)
    setIsLoading(false)
    if(JSON.stringify(result) !== '{}'){
      setData(result?.data?.pokemons)
    }
    const filter = result?.data?.pokemons.filter((elm: IPokemons , index: number)=>{
      return elm.name.toLowerCase().includes(searchValue.toLowerCase())
    })            
    setData(filter)
  }

  const handleSearch = (event:string) =>{
    setIsLoading(true)
    setSearchValue(event.trim())    
  }

  const setParamsPokemon = async (elm:PokemonTable) => {    
    router.push(`/pokemon/${elm}`)    
  }

  const columns = [
    {
      title: '#',  
      width: 60,    
      maxWidth: 60,
      dataIndex: 'image',
      render: (elm:string,) => (
        <Image alt="Pokemon Image" 
        width={0}
        height={0}                  
        priority                  
        sizes="100vw"
        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        className="rounded-md sm:min-w-[50px]" 
        src={elm} />)
    },
    {
      title: 'Name',
      width: 150,
      dataIndex: 'name',      
    },
    {
      title: 'Type',
      width: 100,
      dataIndex: 'types',
      render: ((elm:string[])=>
        elm.map((e, index)=>(
          <div key={index+e} className="flex flex-col text-center max-w-[100px] my-2 w-full justify-center">
            <span className={findTypes(e) + ' rounded-md'}>{e}</span>
          </div>
        ))        
      )
    },
    {
      title: 'Class',
      width: 150,
      dataIndex: 'classification'
    },
    {
      title: 'Action',
      width: 100,
      render: ((value:any)=>(        
        <button type="button" onClick={()=>{setParamsPokemon(value.name)}} className='text-orange-500 font-bold uppercase hover:text-black'>
          Views
        </button>
      ))
    }
  ]  

  useEffect(()=>{
    get(searchValue)
  }, [searchValue])

  return (      
    <>      
      <SearchBox data={data} onSearch={(event:string)=>handleSearch(event)}/>        
      <Table      
        
        rowKey="id"
        loading={{indicator: <Loading/>, spinning: isLoading}}
        bordered            
        columns={columns}
        dataSource={data.length > 0 ? data : []}
        scroll={{y: 'calc(100vh - 25em)'}}
        sticky
        rowHoverable
        summary={() => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={5}>                
              </Table.Summary.Cell>                                          
            </Table.Summary.Row>            
          </Table.Summary>
        )}/>            
    </>
  );
};

export default CustomTable;