import React, { useState, useEffect } from 'react';
import { Switch, Table } from 'antd';
import { GetData } from '../services/GetData';
import type { TableColumnsType } from 'antd';
import { IPokemonData, IPokemons } from '../utils/PokemonInterface';
import SearchBox from './SearchBox';
import Loading from './Loading';

interface ICustomTableProps {
  data: IPokemonData
  columns: TableColumnsType
}

interface IPaginationProps{
  pageSize: number
}

const CustomTable = () => {  
  const [ data, setData ] = useState<IPokemonData>({} as IPokemonData)  
  const [ searchValue, setSearchValue ] = useState<string>('')
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  const get = async (searchValue: string) =>{    
    const result = await GetData(200)
    setIsLoading(false)
    if(result){
      setData(result?.data?.pokemons)
    }

    if(searchValue.trim() !== ''){      
      const filter = result?.data?.pokemons.filter((elm: IPokemons , index: number)=>{
        return elm.name.toLowerCase().includes(searchValue.toLowerCase())
      })            
      setData(filter)
    }else{
      const fetchNewData = await GetData(200)
      setData(fetchNewData?.data?.pokemons)
    }    
  }

  const handleSearch = (event:string) =>{
    setIsLoading(true)
    if(event.trim() !== searchValue.trim()){
      setSearchValue(event.trim())
    }else{      
      setIsLoading(false)
    }
  }

  const findTypes = (types: string) =>{
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

  const columns = [
    {
      title: '#',  
      width: 50,    
      maxWidth: 50,
      dataIndex: 'image',
      render: (elm:string,) => <img loading="lazy" width="50" src={elm}/>
    },
    {
      title: 'Name',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: 'Type',
      width: 100,
      dataIndex: 'types',
      render: ((elm:string[])=>
        elm.map((e, index)=>(
          <div key={index+e} className="flex flex-col text-center max-w-[100px] my-2 w-full justify-center">
            <span className={findTypes(e) + ' rounded-md'}>{e} {index+1}</span>
          </div>
        ))        
      )
    },
    {
      title: 'Class',
      width: 150,
      dataIndex: 'classification'
    }
  ]

  useEffect(()=>{
    get(searchValue)    
  }, [searchValue])

  return (      
    <>      
      <SearchBox onSearch={(event)=>handleSearch(event)}/>
      <Table        
        loading={{indicator: <Loading/>, spinning: isLoading}}
        bordered            
        columns={columns}
        dataSource={data.length > 0 ? data : []}
        scroll={{y: 'calc(100vh - 25em)'}}
        summary={() => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2}>                
              </Table.Summary.Cell>                                          
            </Table.Summary.Row>            
          </Table.Summary>
        )}/>            
    </>
  );
};

export default CustomTable;