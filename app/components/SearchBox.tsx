import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import { IPokemonData } from '../utils/Interface/PokemonInterface';

interface ISearchBoxProps{
    data: IPokemonData
    onSearch: (event:string)=>void;
}

const mockVal = (str: string[], repeat = 1) => {
  const obj = [{}]
  const find = str.map((elm)=>{    
    obj.push({value: elm})
  })

  obj.shift()
  return obj
};

const SearchBox = ({data, onSearch}: ISearchBoxProps) => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const getPanelValue = (searchText: string): any => {
    console.log(data)
    onSearch(searchText)
    const filter = data.filter((elm)=>{
      return elm.name.includes(searchText)
    }).map((e)=>{
      return e.name
    })
    return !searchText ? [] : mockVal(filter)
  }

  return (
    
      <div className='flex my-2'>
          <AutoComplete
            options={options}
            style={{ width: '100%' }}
            onSelect={onSearch}
            onSearch={(text) => setOptions(getPanelValue(text))}
            placeholder="Find Pokemons"            
          />          
          {/* <Search size='large' placeholder="Find Pokemon" allowClear onSearch={onSearch}/>             */}
      </div>
  );
}

export default SearchBox;